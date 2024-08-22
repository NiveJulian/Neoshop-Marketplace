const { review, product, user } = require("../../db.js");

const createReview = async (comment, rating, id_user, id_product) => {
  try {
    // Verificar si existe el producto y el usuario
    const productInstance = await product.findByPk(id_product);
    const userInstance = await user.findByPk(id_user);

    if (!productInstance) {
      throw new Error("El producto no fue encontrado en la base de datos");
    }

    if (!userInstance) {
      throw new Error("El usuario no fue encontrado en la base de datos");
    }

    // Crear la nueva review
    const newReview = await review.create({
      comment,
      rating,
      productIdProduct: id_product, // Asociar la review con el producto
      userIdUser: id_user, // Asociar la review con el usuario
    });

    return newReview; // Devolvemos la nueva review creada
  } catch (error) {
    console.error("Error al crear la review:", error);
    throw new Error("Hubo un error al crear la review");
  }
};

module.exports = createReview;
