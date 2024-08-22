const { product, category, store, brand, review, user } = require("../../db.js");
const averageProductRating = require("../reviewControllers/averageProductRating.js");

const getProductById = async (idProduct) => {
  const productSearch = await product.findByPk(idProduct, {
    include: [
      {
        model: category,
        through: { attributes: [] },
        attributes: ["name"],
      },
      {
        model: store,
        attributes: ["name"],
      },
      {
        model: brand,
        attributes: ["name"],
      },
      {
        model: review,
        attributes: ["comment", "rating", "date"], // Incluir la fecha de la review
        include: [
          {
            model: user,
            attributes: ["name"], // Incluir el nombre del usuario que generó la review
          },
        ],
      },
    ],
  });

  if (productSearch === null) {
    throw new Error("the product was not found on the database");
  }

  // Calculate average rating
  const averageRating = await averageProductRating(idProduct);

  // Attach average rating to the product object
  productSearch.average_mark = averageRating;

  // Formatear los datos
  const formattedProduct = {
    ...productSearch.toJSON(),
    categories: productSearch.categories.map(cat => cat.name),
    brand: productSearch.brand.name,
    store: productSearch.store.name,
  };

  return formattedProduct;
};

module.exports = getProductById;