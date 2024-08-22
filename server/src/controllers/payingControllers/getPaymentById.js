const { payment } = require("../../db.js");

//Esta funcion trae un pago por id
async function getPaymentById(data) {
  const { idPayment } = data;
  const paymentFromDb = await payment.findByPk(idPayment);

  if (!paymentFromDb) {
    //comprobamos que no este vacia
    throw new Error("No payments found in the database.");
  }

  return paymentFromDb;
}

module.exports = getPaymentById;
