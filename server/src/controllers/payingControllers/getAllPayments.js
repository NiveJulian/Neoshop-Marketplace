const { payment } = require("../../db.js");

//Esta funcion trae todos los pagos de la db
async function getAllPayments(req, res) {
  const paymentsFromDb = await payment.findAll();

  if (paymentsFromDb.length === 0) {
    //comprobamos que no este vacia
    throw new Error("No payments found in the database.");
  }

  return paymentsFromDb;
}

module.exports = getAllPayments;
