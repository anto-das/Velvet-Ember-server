const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");
const menuController = require("./menu.controller");

const router = require("express").Router();

router.get("/", menuController.getMenu);
router.get("/:id", menuController.getMenuById);
router.post("/menu", verifyToken, verifyAdmin, menuController.createMenuItem);
router.patch("/:id", verifyToken, verifyAdmin, menuController.updateMenuItem);
router.delete("/:id", verifyToken, verifyAdmin, menuController.deleteMenuItem);
const menuRoute = router;
module.exports = menuRoute;
