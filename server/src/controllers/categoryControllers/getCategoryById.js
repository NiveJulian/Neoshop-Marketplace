const { category } = require("../../db.js");

// Esta función trae una categoruia por id
async function getCategoryById(data) {
  let { idCategory } = data;

  const existCategory = await category.findByPk(idCategory);

  if (existCategory === null) {
    throw new Error("The Category does not exist");
  }

  return existCategory;
}

module.exports = getCategoryById;
