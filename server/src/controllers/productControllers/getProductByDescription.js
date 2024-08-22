const { product, store, brand, category } = require("../../db.js");
const { Sequelize } = require("sequelize");

// Función para eliminar acentos de una cadena
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función para buscar productos por descripción utilizando coincidencia difusa
const getProductByDescription = async (description) => {
  const leven = (await import("leven")).default; //Dependencia necesaria para la busqueda difusa(sin extensiones en la DB)

  // Normalizamos la descripción buscada para eliminar tildes y convertirla a minúsculas
  const loweredDescription = removeAccents(description.toLowerCase());

  // Primero buscamos productos con la descripción dada utilizando iLike
  const arrayOfProductsOnDB = await product.findAll({
    where: {
      description: {
        [Sequelize.Op.iLike]: `%${loweredDescription}%`,
      },
    },
    include: [
      { model: store, as: "store" },
      { model: brand, as: "brand" },
      { model: category, as: "categories" },
    ],
  });

  if (arrayOfProductsOnDB.length > 0) {
    return arrayOfProductsOnDB.map((prod) => formatProduct(prod));
  }

  // Si no se encuentra por iLike, obtenemos todos los productos de la base de datos
  const allProducts = await product.findAll({
    include: [
      { model: store, as: "store" },
      { model: brand, as: "brand" },
      { model: category, as: "categories" },
    ],
  });

  // Normalizamos las descripciones de los productos para eliminar tildes
  const allProductsNormalized = allProducts.map((prod) => ({
    ...prod.dataValues,
    normalizedDescription: removeAccents(prod.description.toLowerCase()),
  }));

  const searchWords = loweredDescription.split(" "); // Separamos la descripción buscada en palabras individuales

  let allFilteredProducts = [];

  allProductsNormalized.forEach((prod) => {
    const prodDescriptionWords = prod.normalizedDescription.split(" "); // Separamos la descripción del producto en palabras
    const matched = searchWords.every((searchWord) =>
      prodDescriptionWords.some((prodWord) => {
        const distance = leven(searchWord, prodWord);
        return distance <= Math.ceil(searchWord.length * 0.2); // Umbral del 20%
      })
    );

    if (matched) {
      allFilteredProducts.push(prod);
    }
  });

  // Eliminamos duplicados
  const uniqueFilteredProducts = [
    ...new Set(allFilteredProducts.map((prod) => prod.id_product)),
  ].map((id) => allFilteredProducts.find((prod) => prod.id_product === id));

  return uniqueFilteredProducts.map((prod) => formatProduct(prod));
};

// Función para formatear el producto según el formato requerido
const formatProduct = (prod) => {
  return {
    id_product: prod.id_product,
    img_product: prod.img_product,
    name: prod.name,
    description: prod.description,
    date_creation: prod.date_creation,
    price: prod.price,
    quantity: prod.quantity,
    available: prod.available,
    average_mark: prod.average_mark,
    storeIdStore: prod.storeIdStore,
    brandIdBrand: prod.brandIdBrand,
    discountIdDiscounts: prod.discountIdDiscounts,
    categories: prod.categories.map((cat) => ({ name: cat.name })),
    store: { name: prod.store.name },
    brand: { name: prod.brand.name },
  };
};

module.exports = getProductByDescription;
