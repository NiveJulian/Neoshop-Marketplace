// src/controllers/paypalController.js
const { client } = require('../paypalClient');
const paypal = require('@paypal/checkout-server-sdk');

// Crear una orden
const createOrder = async (req, res) => {
    const { intent, purchase_units } = req.body;
    console.log (purchase_units[0].items);
    console.log (purchase_units[0].amount)
    console.log (intent);

    // Aquí puedes acceder a la propiedad amount del primer elemento del arreglo purchase_units
    const amount = purchase_units[0].amount;

    // Aquí puedes acceder al arreglo items del primer elemento del arreglo purchase_units
    const items = purchase_units[0].items;

    // Asegúrate de que intent, amount y items estén presentes y tengan la estructura esperada antes de continuar

    // Luego puedes proceder con la creación de la orden utilizando estos datos

    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        "intent": intent,
        "purchase_units": [
            {
                amount: amount,
                items: items,
            },
        ],
    });

    try {
        let response = await client.execute(request);
        res.status(200).json({ id: response.result.id });
    } catch (error) {
        res.status(500).json({ error: error.message, details: error.message });
    }



    
};
// Capturar una orden
const captureOrder = async (req, res) => {
    const { orderID } = req.body;

    let request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        let response = await client.execute(request);
        console.log(response);
        res.status(200).json(response.result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    captureOrder
};