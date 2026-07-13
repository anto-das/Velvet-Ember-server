const router = require("express").Router();
const userController = require("./user.controller");
const verifyToken = require("../../middleware/verifyToken");
const verifyAdmin = require("../../middleware/verifyAdmin");
router.get("/", verifyToken, verifyAdmin, userController.getUser);
router.get("/admin/:email", verifyToken, userController.getIsAdmin);
router.post("/", userController.createUser);
router.patch(
  "/admin/:id",
  verifyToken,
  verifyAdmin,
  userController.updateUserRole,
);
router.delete("/:id", verifyToken, verifyAdmin, userController.deleteUser);

const userRoute = router;
module.exports = userRoute;
