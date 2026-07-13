const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const cartController = require("./cart.controller");

router.get("/", cartController.getCarts);
router.post("/", cartController.addToCart);
router.delete("/:id", verifyToken, cartController.deleteCart);

const cartRoute = router;
module.exports = cartRoute;
