const { store } = require("../../db.js");

//Esta funcion busca productos por id
const getStoreById = async (idStore) => {
  const storeSearch = await store.findByPk(idStore);

  if (storeSearch === null) {//comprobamos que exista la tienda
    throw new Error("The store was not found on the database");
  }

  return storeSearch;
};

module.exports = getStoreById;
