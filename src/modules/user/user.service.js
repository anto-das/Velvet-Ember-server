const { ObjectId } = require("mongodb");
const { client } = require("../../config/db/db");
const userCollection = require("../../config/db/user.db");

const getUser = async () => {
  const result = await userCollection.find().toArray();
  return result;
};

const getIsAdmin = async (email) => {
  const query = { email: email };
  const user = await userCollection.findOne(query);
  let admin = false;
  if (user) {
    admin = user.role === "admin";
  }
  return { admin };
};

const createUser = async (user) => {
  const query = { email: user.email };
  const existingEmail = await userCollection.findOne(query);
  if (existingEmail) {
    return { isExist: true, message: "this email is already exist" };
  }
  const result = await userCollection.insertOne(user);
  return { isExist: false, user: result };
};

const updateUserRole = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      role: "admin",
    },
  };
  const result = await userCollection.updateOne(filter, updatedDoc);
  return result;
};

const deleteUser = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await userCollection.deleteOne(query);
  return result;
};

const userService = {
  getUser,
  createUser,
  getIsAdmin,
  updateUserRole,
  deleteUser,
};

module.exports = userService;
