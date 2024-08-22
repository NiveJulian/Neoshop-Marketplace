const { store } = require("../../db.js");
const { Sequelize } = require("sequelize");

// Función para eliminar acentos de una cadena
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función para buscar storeos por nombre utilizando coincidencia difusa
const getStoreByName = async (name) => {
  const leven = (await import("leven")).default;

  // Normalizamos el nombre buscado para eliminar tildes y convertirlo a minúsculas
  const loweredName = removeAccents(name.toLowerCase());

  // Primero buscamos tiendas con el nombre dado utilizando iLike
  const arrayOfstoresOnDB = await store.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${loweredName}%`,
      },
    },
  });

  if (arrayOfstoresOnDB.length > 0) {
    return arrayOfstoresOnDB;
  }

  // Si no se encuentra por iLike, obtenemos todos los storeos de la base de datos
  const allstores = await store.findAll();

  // Normalizamos los nombres de los storeos para eliminar tildes
  const allstoresNormalized = allstores.map((prod) => ({
    ...prod.dataValues,
    normalizedName: removeAccents(prod.name.toLowerCase()),
  }));

  const searchWords = loweredName.split(" "); // Separamos el nombre buscado en palabras individuales

  let allFilteredstores = [];

  allstoresNormalized.forEach((prod) => {
    const prodNameWords = prod.normalizedName.split(" "); // Separamos el nombre del storeo en palabras
    const matched = searchWords.every((searchWord) =>
      prodNameWords.some((prodWord) => {
        const distance = leven(searchWord, prodWord);
        return distance <= Math.ceil(searchWord.length * 0.3); // Umbral del 30%
      })
    );

    if (matched) {
      allFilteredstores.push(prod);
    }
  });

  // Eliminamos duplicados
  const uniqueFilteredstores = [
    ...new Set(allFilteredstores.map((prod) => prod.id)),
  ].map((id) => allFilteredstores.find((prod) => prod.id === id));

  //Si no hay resultados, mandamos el mensaje correspondiente
  if (uniqueFilteredstores.length < 1) {
    throw new Error("No results found");
  }

  return uniqueFilteredstores;
};

module.exports = getStoreByName;
