const { user, cart } = require("../../db.js");

// Esta función elimina un producto del carrito por id
async function deleteProductCart(data, io) {
  let { idProduct, idUser } = data;

  const userExist = await user.findByPk(idUser);

  // Verificamos que exista el usuario
  if (!userExist) {
    throw new Error("The user does not exist");
  }

  let existCart = await cart.findOne({ where: { id_user: idUser } }); // Buscamos el carrito del usuario

  if (!existCart) {
    throw new Error("The cart does not exist");
  }

  // Eliminamos el producto del carrito
  const updatedCartProducts = existCart.cartProducts.filter(
    (item) => item.id_product !== idProduct
  );

  // Si el carrito no cambia, significa que el producto no estaba en el carrito
  if (updatedCartProducts.length === existCart.cartProducts.length) {
    throw new Error("The product is not in the cart");
  }

  // Actualizamos el carrito con los productos restantes
  existCart.cartProducts = updatedCartProducts;
  await existCart.save();

  // Emitir evento de actualización del carrito a través de Socket.IO
  return { message: "Product deleted successfully from cart" };
}

module.exports = deleteProductCart;
