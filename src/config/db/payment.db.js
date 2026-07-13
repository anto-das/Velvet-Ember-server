const { client } = require("./db");

const paymentCollection = client.db("VelvetEmberDB").collection("payments");
module.exports = paymentCollection