const { client } = require("./db");

const cartCollection = client.db("VelvetEmberDB").collection("cart");
module.exports = cartCollection;
