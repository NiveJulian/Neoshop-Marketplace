const { brand } = require("../../db.js");

// Esta función elimina alguna marca que esté en la base de datos
async function deleteBrandById(data) {
  let { idBrand } = data;

  //Verificamos que la marca exista
  const existBrand = await brand.findByPk(idBrand);

  if (existBrand === null) {
    throw new Error("The brand does not exist");
  }

  //Eliminamos la marca
  await brand.destroy({
    where: {
      id_brand: idBrand,
    },
  });

  return { message: "Brand deleted successfully" };
}

module.exports = deleteBrandById;
