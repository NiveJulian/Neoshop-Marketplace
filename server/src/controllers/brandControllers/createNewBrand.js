const { brand } = require("../../db.js");

async function createNewBrand(data) {
  const { name } = data;
  // Verificar si ya existe una marca con el mismo nombre y dirección
  const existingBrand = await brand.findOne({
    where: {
      name,
    },
  });

  if (existingBrand) {
    throw new Error("The brand name is already in use");
  }

  const newBrand = await brand.create({ name:name,});

  return { message: "Brand saved successfully", brand: newBrand };
}

module.exports = createNewBrand;
