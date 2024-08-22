const { product, store, brand, category } = require("../../db.js");

// Función para buscar todos los productos de una tienda 
const getAllProductsByStoreId = async (id) => {
  try {
    const arrayOfProductsOnDB = await product.findAll({
      where: {
        available: true // Condición para que solo devuelva productos disponibles
      },
      include: [
        {
          model: store,
          as: "store",
          where: {
            id_store: id,
          },
        },
        { model: brand, as: "brand" },
        { model: category, as: "categories" },
      ],
    });

    if (arrayOfProductsOnDB.length === 0) {
      throw new Error("The store was not found in the database.");
    }

    // Mapeamos los productos al formato deseado
    const formattedProducts = arrayOfProductsOnDB.map(product => ({
      id_product: product.id_product,
      img_product: product.img_product,
      name: product.name,
      description: product.description,
      date_creation: product.date_creation,
      price: product.price,
      quantity: product.quantity,
      available: product.available,
      average_mark: product.average_mark,
      storeIdStore: product.storeIdStore,
      brandIdBrand: product.brandIdBrand,
      discountIdDiscounts: product.discountIdDiscounts,
      categories: product.categories ? product.categories.map(category => ({
        name: category.name
      })) : [],
      store: {
        name: product.store ? product.store.name : null
      },
      brand: {
        name: product.brand ? product.brand.name : null
      }
    }));

    return formattedProducts;
  } catch (error) {
    console.error('Error fetching products by store ID:', error);
    throw error;
  }
};

module.exports = getAllProductsByStoreId;