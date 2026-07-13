const { client } = require("./db");

const menuCollection = client.db("VelvetEmberDB").collection("menu");
module.exports = menuCollection;
