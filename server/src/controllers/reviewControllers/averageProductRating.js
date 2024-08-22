const { Sequelize } = require("sequelize");
const { review } = require("../../db.js");

const averageProductRating = async (idProduct) => {
  try {
    const result = await review.findOne({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"]],
      where: {
        productIdProduct: idProduct,
      },
    });

    if (!result || !result.dataValues.avgRating) {
      return 0; // Si no hay reviews o el promedio es nulo, devolver 0
    }

    return parseFloat(result.dataValues.avgRating);
  } catch (error) {
    console.error("Error al calcular el promedio de ratings:", error);
    throw error;
  }
};
Sequelize
module.exports = averageProductRating;
