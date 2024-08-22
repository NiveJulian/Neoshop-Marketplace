// src/controllers/paypalController.js
const { client } = require("../../paypalClient");
const paypal = require("@paypal/checkout-server-sdk");

// Crear una orden
const createOrder = async ({ intent, purchase_units }) => {
  // Aquí puedes acceder a la propiedad amount del primer elemento del arreglo purchase_units
  const amount = purchase_units[0].amount;

  // Aquí puedes acceder al arreglo items del primer elemento del arreglo purchase_units
  const items = purchase_units[0].items;

  // Asegúrate de que intent, amount y items estén presentes y tengan la estructura esperada antes de continuar

  let request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
      intent: intent,
      purchase_units: [
          {
              amount: amount,
              items: items,
          },
      ],
  });

  try {
      let response = await client.execute(request);
      return { id: response.result.id };
  } catch (error) {
      throw new Error(error.message);
  }
};

module.exports = {
  createOrder,
};

