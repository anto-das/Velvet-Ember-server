const { client } = require("./db");


const reviewCollection = client.db("VelvetEmberDB").collection("reviews");

module.exports = reviewCollection;
