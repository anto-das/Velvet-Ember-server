const menuService = require("./menu.service");

const getMenu = async (req, res) => {
  try {
    // চেক করার জন্য কনসোলে লগ দিন
    const result = await menuService.getMenu();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await menuService.getMenuById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const menuItem = req.body;
    const result = await menuService.createMenuItem(menuItem);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    const result = await menuService.updateMenuItem(id, updatedItem);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  const id = req.params.id;
  const result = await menuService.deleteMenuItem(id);
  res.status(200).send(result);
};

const menuController = {
  getMenu,
  getMenuById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
module.exports = menuController;
