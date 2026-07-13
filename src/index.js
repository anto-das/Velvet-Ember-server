const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { uri, client } = require("./config/db/db");
const verifyToken = require("./middleware/verifyToken");
const verifyAdmin = require("./middleware/verifyAdmin");
const userRoute = require("./modules/user/user.route");
const userCollection = require("./config/db/user.db");
const menuRoute = require("./modules/menu/menu.route");
const reviewRoute = require("./modules/reveiw/review.route");
const menuCollection = require("./config/db/menu.db");
const cartRoute = require("./modules/carts/cart.route");
const paymentRoute = require("./modules/payemnt/payment.route");

// middleware
app.use(
  cors(),
  // cors({
  //   origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
  //   credentials: true,
  // }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("velvet ember open in soon");
});

// mongodb+srv://<db_username>:<db_password>@cluster0.hojma.mongodb.net/?appName=Cluster0

async function run() {
  try {
    const cartCollection = client.db("VelvetEmberDB").collection("cart");
    const paymentCollection = client.db("VelvetEmberDB").collection("payments");

    // jwt related operation
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
      res.send({ token });
    });

    // users operation
    app.use("/user", userRoute);
    app.use("/menu", menuRoute);
    app.use("/review", reviewRoute);
    app.use("/carts", cartRoute);
    app.use("/payments", paymentRoute);
   

    // orders-stats api
    app.get("/orders-stats", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const result = await paymentCollection
          .aggregate([
            { $unwind: "$menuIds" },
            {
              $lookup: {
                from: "menu",
                localField: "menuIds",
                foreignField: "_id",
                as: "menuItems",
              },
            },
            { $unwind: "$menuItems" },
            {
              $group: {
                _id: "$menuItems.category",
                quantity: { $sum: 1 },
                revenue: { $sum: "$menuItems.price" }, // রেভিনিউ ক্যালকুলেশন সম্পূর্ণ করা হলো
              },
            },
          ])
          .toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error calculating stats", error: error.message });
      }
    });

    // admin-stats api
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();
      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$price",
              },
            },
          },
        ])
        .toArray();
      const revenue = result.length > 0 ? result[0].totalRevenue : 0;
      res.send({
        users,
        menuItems,
        orders,
        revenue,
      });
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`velvet ember running on:${port}`);
});

module.exports = app;
