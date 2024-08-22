const { payment } = require("../../db.js");

const getAllPaymentsByStore = async (storeId) => {
  try {
    // Encuentra todos los pagos
    const payments = await payment.findAll();

    // Filtra los pagos que contienen productos de la tienda específica
    const paymentsForStore = payments.filter(payment =>
      payment.paymentProducts.some(product => product.storeIdStore === storeId)
    );

    if (paymentsForStore.length === 0) {
      throw new Error("No payments found for the specified store.");
    }

    const formattedPayments = paymentsForStore.map(payment => {
      const storeProducts = payment.paymentProducts.filter(product => product.storeIdStore === storeId);

      return {
        id_payment: payment.id_payment,
        id_user: payment.id_user,
        date: payment.date,
        amount: payment.amount,
        products: storeProducts.map(product => ({
          id_product: product.id_product,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          img_product: product.img_product,
        }))
      };
    });

    return formattedPayments;
  } catch (error) {
    console.error('Error fetching payments by store ID:', error);
    throw error;
  }
};

module.exports = getAllPaymentsByStore;
