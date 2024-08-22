const { user, cart, product } = require("../../db.js");

async function saveProductsOnCart(data, io) {
  const { idUser, arrayProducts } = data;

  const userExist = await user.findByPk(idUser);
  if (!userExist) {
    throw new Error("The user does not exist");
  }

  let existCart = await cart.findOne({ where: { id_user: idUser } });

  // Si el array de productos está vacío, vaciamos el carrito
  if (arrayProducts.length === 0) {
    if (existCart) {
      existCart.cartProducts = [];
      existCart.total = 0;
      await existCart.save();
    }
    return "Shopping cart cleared successfully";
  }

  const groupedProducts = arrayProducts.reduce((acc, item) => {
    const found = acc.find((product) => product.id_product === item.id_product);
    if (found) {
      found.cartQuantity += item.cartQuantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const productIds = groupedProducts.map((item) => item.id_product);
  const productsDetails = await product.findAll({
    where: { id_product: productIds },
  });

  if (!productsDetails.length) {
    throw new Error("No valid products found");
  }

  const total = groupedProducts.reduce((acc, item) => {
    const productDetail = productsDetails.find(
      (prod) => prod.id_product === item.id_product
    );
    if (productDetail) {
      return acc + Number(productDetail.price) * item.cartQuantity;
    }
    return acc;
  }, 0);

  if (!existCart) {
    existCart = await cart.create({
      id_user: idUser,
      cartProducts: groupedProducts,
      total: total,
    });
  } else {
    existCart.cartProducts = groupedProducts;
    existCart.total = total;
    await existCart.save();
  }
}

module.exports = saveProductsOnCart;
