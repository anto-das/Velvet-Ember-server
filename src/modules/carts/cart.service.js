const { ObjectId } = require("mongodb");
const cartCollection = require("../../config/db/cart.db");

// ১. ডেটাবেজ থেকে ইমেইল অনুযায়ী কার্ট খোঁজা
const getCartsFromDB = async (email) => {
  const query = { email: email };
  return await cartCollection.find(query).toArray();
};

// ৩. ডেটাবেজে নতুন কার্ট আইটেম ইনসার্ট করা
const addToCartInDB = async (cartDoc) => {
  return await cartCollection.insertOne(cartDoc);
};

// ৪. ডেটাবেজ থেকে কার্ট আইটেম ডিলিট করা
const deleteCartFromDB = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await cartCollection.deleteOne(query);
};

const cartService = {
  getCartsFromDB,

  addToCartInDB,
  deleteCartFromDB,
};

module.exports = cartService;
