const menuCollection = require("../../config/db/menu.db");

const getMenu = async () => {
  const result = await menuCollection.find().toArray();
  return result;
};
const getMenuById = async (id) => {
  const query = { _id: id };
  const result = await menuCollection.findOne(query);
  return result;
};

const createMenuItem = async (menuItem) => {
  const result = await menuCollection.insertOne(menuItem);
  return result;
};

const updateMenuItem = async (id, updatedItem) => {
  const filter = { _id: id };
  const updatedDoc = {
    $set: {
      name: updatedItem.name,
      category: updatedItem.category,
      price: updatedItem.price,

      image: updatedItem.image,
      recipe: updatedItem.recipe,
    },
  };
  const result = await menuCollection.updateOne(filter, updatedDoc);
  return result;
};

const deleteMenuItem = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await menuCollection.deleteOne(query);
  return result;
};

const menuService = {
  getMenu,
  getMenuById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
module.exports = menuService;
