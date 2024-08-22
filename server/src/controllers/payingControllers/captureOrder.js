// src/controllers/paypalController.js
const { client } = require("../../paypalClient");
const paypal = require("@paypal/checkout-server-sdk");

// Capturar una orden
const captureOrder = async ({ orderID }) => {
  let request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    let response = await client.execute(request);
    if (!response) {
      throw new Error("Error while capturing order");
    }
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  captureOrder,
};
