const userCollection = require("../config/db/user.db");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (!user) {
    return res.status(403).send({ message: "user not found" });
  }
  const isAdmin = user.role === "admin";
  if (!isAdmin) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  next();
};

module.exports = verifyAdmin;
