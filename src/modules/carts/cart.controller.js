const cartService = require("./cart.service");

// ১. গেট অল কার্টস
const getCarts = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await cartService.getCartsFromDB(email);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ৩. কার্ট আইটেম অ্যাড করা
const addToCart = async (req, res) => {
  try {
    const cartDoc = req.body;
    const result = await cartService.addToCartInDB(cartDoc);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ৪. কার্ট আইটেম ডিলিট করা
const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await cartService.deleteCartFromDB(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const cartController = {
  getCarts,

  addToCart,
  deleteCart,
};

module.exports = cartController;
