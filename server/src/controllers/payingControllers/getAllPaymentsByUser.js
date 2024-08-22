const { payment } = require("../../db.js");

//Esta funcion trae un pago por id
async function getAllPaymentsByUser(id_user) {
  const paymentFromDb = await payment.findAll({
    where: {
        id_user
    }
  });

  if (!paymentFromDb) {
    //comprobamos que no este vacia
    throw new Error("No payments found in the database.");
  }

  return paymentFromDb;
}

module.exports = getAllPaymentsByUser;
