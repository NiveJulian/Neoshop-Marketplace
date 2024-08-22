const { Router } = require("express");
const createReview = require("../controllers/reviewControllers/createReview");
const reviewRoutes = Router();

reviewRoutes.post("/", async (req, res) => {
  const { comment, rating, id_user, id_product} = req.body;
  try {
    const review = await createReview(comment, rating, id_user, id_product );
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewRoutes;
