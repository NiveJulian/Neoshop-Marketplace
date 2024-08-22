const { product, brand, store, category } = require("../../db.js");
const { Sequelize } = require("sequelize");

// Función para eliminar acentos de una cadena
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función para buscar productos por marca utilizando coincidencia difusa
const getProductByBrand = async (name) => {
  const leven = (await import("leven")).default; //Dependencia necesaria para la busqueda difusa(sin extensiones en la DB)

  // Normalizamos el nombre buscado para eliminar tildes y convertirlo a minúsculas
  const loweredName = removeAccents(name.toLowerCase());

  // Primero buscamos productos con el nombre de la marca dado utilizando iLike
  const arrayOfProductsOnDB = await product.findAll({
    include: [
      {
        model: brand, // Asegúrate de que `brand` está correctamente importado y definido en la relación
        as: "brand",
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${loweredName}%`,
          },
        },
      },
      { model: store, as: "store" },
      { model: category, as: "categories" },
    ],
  });

  if (arrayOfProductsOnDB.length > 0) {
    return arrayOfProductsOnDB.map((prod) => formatProduct(prod));
  }

  // Si no se encuentra por iLike, obtenemos todos los productos de la base de datos
  const allProducts = await product.findAll({
    include: [
      { model: brand, as: "brand" },
      { model: store, as: "store" },
      { model: category, as: "categories" },
    ],
  });

  // Normalizamos los nombres de las marcas para eliminar tildes
  const allProductsNormalized = allProducts.map((prod) => ({
    ...prod.dataValues,
    normalizedBrandName: removeAccents(prod.brand.name.toLowerCase()),
  }));

  const searchWords = loweredName.split(" "); // Separamos el nombre buscado en palabras individuales

  let allFilteredProducts = [];

  allProductsNormalized.forEach((prod) => {
    const prodBrandWords = prod.normalizedBrandName.split(" "); // Separamos el nombre de la marca en palabras
    const matched = searchWords.every((searchWord) =>
      prodBrandWords.some((prodWord) => {
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

module.exports = getProductByBrand;
