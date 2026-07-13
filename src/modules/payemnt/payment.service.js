const { ObjectId } = require("mongodb");
// আপনার সঠিক পাথ অনুযায়ী চেক করে নিবেন
const cartCollection = require("../../config/db/cart.db");
const paymentCollection = require("../../config/db/payment.db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ১. স্ট্রাইপ পেমেন্ট ইনটেন্ট তৈরি
const createPaymentIntentInStripe = async (price) => {
  const amount = parseInt(price * 100);
  return await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
};

// ২. সব পেমেন্ট হিস্ট্রি গেট করা (অ্যাডমিনদের জন্য)
const getAllPaymentsFromDB = async () => {
  return await paymentCollection.find().toArray();
};

// ৩. নির্দিষ্ট ইউজারের পেমেন্ট হিস্ট্রি ইমেইল দিয়ে গেট করা
const getPaymentsByEmailFromDB = async (email) => {
  const query = { email: email };
  return await paymentCollection.find(query).toArray();
};

// ৪. পেমেন্ট সেভ করা এবং কার্ট থেকে আইটেমগুলো ডিলিট করা
const savePaymentAndClearCartInDB = async (payment) => {
  const paidPayment = { ...payment, status: "paid" };

  // ক) পেমেন্ট কালেকশনে ইনসার্ট করা
  const paymentResult = await paymentCollection.insertOne(paidPayment);

  // খ) কার্ট থেকে আইটেমগুলো ডিলিট করার কুয়েরি
  const query = {
    _id: { $in: payment.cartIds.map((id) => new ObjectId(id)) },
  };
  const deleteResult = await cartCollection.deleteMany(query);

  return { paymentResult, deleteResult };
};

const paymentService = {
  createPaymentIntentInStripe,
  getAllPaymentsFromDB,
  getPaymentsByEmailFromDB,
  savePaymentAndClearCartInDB,
};

module.exports = paymentService;
