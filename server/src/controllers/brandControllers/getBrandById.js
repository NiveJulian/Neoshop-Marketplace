const { brand } = require("../../db.js");

// Esta función trae marcas por id
async function getBrandById(data) {
  let { idBrand } = data;

  const existBrand = await brand.findByPk(idBrand);

  if (existBrand === null) {
    throw new Error("The brand does not exist");
  }

  return existBrand;
}

module.exports = getBrandById;
