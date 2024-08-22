const { category } = require("../../db");

const getAllCategory = async () => {
  const categories = await category.findAll();
  if (!categories || categories.length === 0) throw new Error("No categories found");
  return categories;
};

module.exports = getAllCategory;
