const paypal = require('@paypal/checkout-server-sdk');


// Configuración del entorno de PayPal
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

//Dice SandboxEnvironment ya que es un entorno de prueba, sino seria LiveEnviroment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

module.exports = { client };