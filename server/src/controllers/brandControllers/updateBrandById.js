const { brand } = require("../../db.js");

// Esta función elimina alguna marca que esté en la base de datos
async function updateBrandById(data) {
  let { idBrand, newName } = data;

  //Verificamos que la marca exista
  const existBrand = await brand.findByPk(idBrand);

  if (existBrand === null) {
    throw new Error("The brand does not exist");
  }

  existBrand.name = newName;
  await existBrand.save();

  return { message: "Brand updated successfully", newBrand: existBrand };
}

module.exports = updateBrandById;
