const reviewService = require("./review.service");

const getAllReviews = async (req, res) => {
  try {
    const result = await reviewService.getAllReviews();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const review = req.body;
    const result = await reviewService.createReview(review);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
      details: err,
    });
  }
};

const reviewController = { getAllReviews, createReview };
module.exports = reviewController;
