// Este controller trae el carrito con el id del usuario que le mandes
const { cart, product } = require("../../db.js");

const cartByUserId = async (idUser) => {
  // Obtener el carrito del usuario especificado
  const cartDetails = await cart.findOne({ where: { id_user: idUser } });

  if (!cartDetails) {
    throw new Error("No cart found for the specified user");
  }

  // Obtener los detalles de los productos en el carrito
  const productIds = cartDetails.cartProducts.map(item => item.id_product);
  const productsDetails = await product.findAll({
    where: { id_product: productIds },
  });

  // Estructurar el array de productos con la información requerida
  const products = cartDetails.cartProducts.map(item => {
    const productDetail = productsDetails.find(prod => prod.id_product === item.id_product);
    return {
      id_product: productDetail.id_product,
      name: productDetail.name,
      img_product: productDetail.img_product,
      price: productDetail.price,
      cartQuantity: item.cartQuantity
    };
  });

  // Calcular la cantidad total de productos
  const totalQuantity = products.reduce((acc, prod) => acc + prod.cartQuantity, 0);

  // Calcular el precio total de todos los productos del carrito
  const totalPrice = products.reduce((acc, prod) => acc + (prod.price * prod.cartQuantity), 0);

  // Estructurar la respuesta
  return {
    id_user: idUser,
    totalQuantity,
    totalPrice,
    products
  };
};

module.exports = cartByUserId;
