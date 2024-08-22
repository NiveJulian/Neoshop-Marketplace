const { Op } = require("sequelize");
const { cart, user } = require("../../db");
const prueba = require("../mailsControllers/prueba");
const cartByUserId = require("./cartByUserId");

const sendReminderCart = async () => {
  try {
    // Obtener todos los carritos que tengan productos
    const cartsWithProducts = await cart.findAll({
      where: {
        cartProducts: { [Op.not]: [] }, // Cart tenga productos
      },
      include: {
        model: user,
        attributes: ["id_user", "email"],
      },
    });

    for (const cartInstance of cartsWithProducts) {
      const emailUser = cartInstance.user.email;
      const cartFind = await cartByUserId(cartInstance.user.id_user);
      const productSend = cartFind.products;
      const messageSend = `
          <div style="border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 0 auto;">
            <img src="https://i.ibb.co/PFrSPtf/neoshoplogo.jpg" alt="Logo" style="width: 70%; max-width: 200px; display: block; margin: 0 auto 20px;">
            <h1>NeoShop</h1>
            <h2 style="color: #5f9ea0;">Hello, you have products in your NeoShop cart</h2>
            <p>These are the products you have pending purchase:</p>
            <ul style="list-style: none; padding: 0;">
              ${productSend
                .map(
                  (item) => `
                <li style="margin-bottom: 10px; display: flex; align-items: center;">
                  <img src="${item.img_product[0]}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                  <span>${item.name} - Cantidad: ${item.cartQuantity} - Precio: $${item.price}</span>
                </li>
              `
                )
                .join("")}
            </ul>
            <p>Don't forget to finalize your purchase!</p>
            <p>To continue with the purchase, please <a href="http://localhost:5173/payPreview" style="color: #5f9ea0; text-decoration: none;">da click aquí</a>.</p>
            <p>Thank you for trusting NeoShop.</p>
            </div>
        `;
      await prueba(emailUser, messageSend);
    }
  } catch (error) {
    console.error(`Error fetching carts: ${error.message}`);
  }
};

module.exports = sendReminderCart;
