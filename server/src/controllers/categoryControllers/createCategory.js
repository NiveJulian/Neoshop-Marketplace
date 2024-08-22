const { category } = require("../../db.js");

async function createCategory(data) {
  const { name, userId } = data;

  if (!name || !userId) {
    throw new Error("Missing data");
  }

  // Verificar si ya existe una marca con el mismo nombre y dirección
  const existingCategory = await category.findOne({
    where: {
      name,
    },
  });

  if (existingCategory) {
    throw new Error("The store name is already in use");
  }

  const newCategory = await category.create({
    name,
    u
  });

  return { message: "Category saved successfully", Category: newCategory };
}

module.exports = createCategory;
