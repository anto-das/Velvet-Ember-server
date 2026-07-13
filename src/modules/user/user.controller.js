const userService = require("./user.service");

const getUser = async (req, res) => {
  try {
    const users = await userService.getUser();
    res.status(200).send(users);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

const getIsAdmin = async (req, res) => {
  try {
    const email = req.params.email;

    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "forbidden access" });
    }
    const result = await userService.getIsAdmin(email);
    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    const result = await userService.createUser(user);
    if (result.isExist) {
      res.status(400).send(result);
    } else {
      res.status(201).send({
        message: "User created successfully",
        user: result.user,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.updateUserRole(id);
    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await userCollection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

const userController = {
  getUser,
  getIsAdmin,
  createUser,
  updateUserRole,
  deleteUser,
};
module.exports = userController;
