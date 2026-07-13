const verifyToken = require("../../middleware/verifyToken");
const reviewController = require("./review.controller");

const router = require("express").Router();

router.get("/", reviewController.getAllReviews);
//  review operation
router.post("/", verifyToken, reviewController.createReview);

const reviewRoute = router;
module.exports = reviewRoute;
