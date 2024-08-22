const { product, category, store, brand } = require("../../db.js");

// Esta función obtiene los últimos 8 productos de nuestra base de datos
async function getLastestProducts(req, res) {
    // Obtener los últimos 8 productos, ordenados por fecha de creación descendente
    const productsFromDB = await product.findAll({
      include: [
        {
          model: category,
          through: { attributes: [] },
          attributes: ["name"],
        },
        {
          model: store,
          attributes: ["name","logo", "id_store"],
        },
        {
          model: brand,
          attributes: ["name"],
        },
      ],
      order: [['date_creation', 'DESC']],
      limit: 8
    });

    if (productsFromDB.length === 0) {
      // Comprobamos que la lista no esté vacía
      throw new Error("No products found in the database.");
    }

    return productsFromDB;
}

module.exports = getLastestProducts;