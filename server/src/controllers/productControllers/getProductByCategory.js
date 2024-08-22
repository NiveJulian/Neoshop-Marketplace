const { product, store, brand, category } = require("../../db.js");
const { Sequelize } = require("sequelize");

// Función para eliminar acentos de una cadena
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función para buscar productos por categoría utilizando coincidencia difusa
const getProductsByCategory = async (categoryName) => {
  const leven = (await import("leven")).default; //Dependencia necesaria para la busqueda difusa(sin extensiones en la DB)

  // Normalizamos el nombre de la categoría para eliminar tildes y convertirlo a minúsculas
  const loweredCategoryName = removeAccents(categoryName.toLowerCase());

  // Primero buscamos categorías con el nombre dado utilizando iLike
  const categories = await category.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${loweredCategoryName}%`,
      },
    },
  });

  if (categories.length > 0) {
    const categoryIds = categories.map((cat) => cat.id_category);

    // Buscar productos que pertenezcan a las categorías encontradas
    const arrayOfProductsOnDB = await product.findAll({
      include: [
        { model: store, as: "store" },
        { model: brand, as: "brand" },
        {
          model: category,
          as: "categories",
          where: { id_category: categoryIds },
        },
      ],
    });

    if (arrayOfProductsOnDB.length > 0) {
      return arrayOfProductsOnDB.map((prod) => formatProduct(prod));
    }
  }

  // Si no se encuentra por iLike, obtenemos todas las categorías de la base de datos
  const allCategories = await category.findAll();

  // Normalizamos los nombres de las categorías para eliminar tildes
  const allCategoriesNormalized = allCategories.map((cat) => ({
    ...cat.dataValues,
    normalizedName: removeAccents(cat.name.toLowerCase()),
  }));

  const searchWords = loweredCategoryName.split(" "); // Separamos el nombre buscado en palabras individuales

  let allFilteredCategories = [];

  allCategoriesNormalized.forEach((cat) => {
    const catNameWords = cat.normalizedName.split(" "); // Separamos el nombre de la categoría en palabras
    const matched = searchWords.every((searchWord) =>
      catNameWords.some((catWord) => {
        const distance = leven(searchWord, catWord);
        return distance <= Math.ceil(searchWord.length * 0.2); // Umbral del 20%
      })
    );

    if (matched) {
      allFilteredCategories.push(cat);
    }
  });

  // Eliminamos duplicados
  const uniqueFilteredCategories = [
    ...new Set(allFilteredCategories.map((cat) => cat.id_category)),
  ].map((id) => allFilteredCategories.find((cat) => cat.id_category === id));

  const categoryIds = uniqueFilteredCategories.map((cat) => cat.id_category);

  // Buscar productos que pertenezcan a las categorías filtradas
  const allFilteredProducts = await product.findAll({
    include: [
      { model: store, as: "store" },
      { model: brand, as: "brand" },
      {
        model: category,
        as: "categories",
        where: { id_category: categoryIds },
      },
    ],
  });

  return allFilteredProducts.map((prod) => formatProduct(prod));
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

module.exports = getProductsByCategory;
