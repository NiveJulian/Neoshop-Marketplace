const { category } = require("../../db.js");

// Esta función elimina alguna categoria que esté en la base de datos
async function updateCategoryById(data) {
  let { idCategory, newName } = data;

  //Verificamos que la categoria exista
  const existCategory = await category.findByPk(idCategory);

  if (existCategory === null) {
    throw new Error("The Category does not exist");
  }

  existCategory.name = newName; //cambiamos el nombre
  await existCategory.save(); //la guardamos

  return {
    message: "Category updated successfully",
    newCategory: existCategory,
  };
}

module.exports = updateCategoryById;
