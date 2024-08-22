const { cart } = require("../../db.js");

//Esta funcion trae todos los cards
const getAllCarts = async () => {
  const allCarts = await cart.findAll();
  return allCarts;
};

module.exports = getAllCarts;
