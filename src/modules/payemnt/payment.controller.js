const paymentService = require("./payment.service");

// ১. পেমেন্ট ইনটেন্ট কন্ট্রোলার
const createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    if (!price) {
      return res.status(400).send({ message: "Price is required" });
    }

    const paymentIntent =
      await paymentService.createPaymentIntentInStripe(price);
      console.log(paymentIntent)
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ২. গেট অল পেমেন্টস (অ্যাডমিন)
const getAllPayments = async (req, res) => {
  try {
    const result = await paymentService.getAllPaymentsFromDB();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ৩. গেট পেমেন্টস বাই ইমেইল
const getPaymentsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await paymentService.getPaymentsByEmailFromDB(email);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ৪. পোস্ট পেমেন্ট এবং ক্লিয়ার কার্ট
const savePayment = async (req, res) => {
  try {
    const payment = req.body;
    if (!payment.cartIds || !Array.isArray(payment.cartIds)) {
      return res
        .status(400)
        .send({ message: "Invalid payment data or missing cartIds" });
    }

    const result = await paymentService.savePaymentAndClearCartInDB(payment);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const paymentController = {
  createPaymentIntent,
  getAllPayments,
  getPaymentsByEmail,
  savePayment,
};

module.exports = paymentController;
