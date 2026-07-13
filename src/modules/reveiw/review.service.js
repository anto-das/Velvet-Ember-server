const reviewCollection = require("../../config/db/review.db");

const getAllReviews = async () => {
  const result = await reviewCollection.find().toArray();
  return result;
};

const createReview = async (review) => {
  const result = await reviewCollection.insertOne(review);
  return result;
};

const reviewService = {
  getAllReviews,
  createReview,
};

module.exports = reviewService;
