const { client } = require("./db");

const userCollection = client.db("VelvetEmberDB").collection("users");
module.exports = userCollection;
