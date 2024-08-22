const { category } = require("../../db.js");

// Esta función elimina alguna categoria que esté en la base de datos
async function deleteCategoryById(data) {
  let { idCategory } = data;

  //Verificamos que la categoria exista
  const existcategory = await category.findByPk(idCategory);

  if (existcategory === null) {
    throw new Error("The category does not exist");
  }

  //Eliminamos la categoria
  await category.destroy({
    where: {
      id_category: idCategory,
    },
  });

  return { message: "category deleted successfully" };
}

module.exports = deleteCategoryById;
