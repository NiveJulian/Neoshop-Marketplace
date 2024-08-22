const { product, category, store, brand, review } = require("../../db.js");

//This function get all the products from our DB
async function getProducts(req, res) {
  const productsFromDB = await product.findAll({
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
        attributes: ["comment", "rating"],
      },
    ],
  });

  if (productsFromDB.length === 0) {
    //comprobamos que no este vacia
    throw new Error("No products found in the database.");
  }
  return productsFromDB;
}

module.exports = getProducts;
