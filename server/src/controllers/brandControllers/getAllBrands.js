const { brand } = require("../../db.js");

const getAllBrands = async (req, res) => {
  const brands = await brand.findAll();
  if (brands.length === 0) throw new Error("No brands found");
  return brands;
};

module.exports = getAllBrands;