const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken"); // আপনার পাথ অনুযায়ী চেক করবেন
const verifyAdmin = require("../../middleware/verifyAdmin"); // আপনার পাথ অনুযায়ী চেক করবেন
const paymentController = require("./payment.controller");

// রাউট ডিফাইন করা
router.post("/create-payment-intent", paymentController.createPaymentIntent);
router.get("/", verifyToken, verifyAdmin, paymentController.getAllPayments);
router.get("/:email", verifyToken, paymentController.getPaymentsByEmail);
router.post("/", verifyToken, paymentController.savePayment);

const paymentRoute = router;

module.exports = paymentRoute
