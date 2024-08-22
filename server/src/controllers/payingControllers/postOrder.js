const { user, payment, product, cart } = require("../../db.js");

async function postOrder(data) {
  const { id_payment, arrayProducts, id_user, amount, date } = data;
  const userExist = await user.findByPk(id_user);

  if (!userExist) {
    throw new Error("The user does not exist");
  };

  for(let i=0; i<arrayProducts.length; i++){
    const {id_product} = arrayProducts[i];
    const theProduct = await product.findByPk(id_product);
    if(!theProduct) throw new Error("The product does not exist");
    if(theProduct.quantity < arrayProducts[i].cartQuantity) throw new Error("No stock available");

    const newQuantity = theProduct.quantity - arrayProducts[i].cartQuantity;
    if(newQuantity===0){
      await product.update(
        { quantity: newQuantity, available: false },
        { where: { id_product } }
      );
    }else{
      await product.update(
        { quantity: newQuantity },
        { where: { id_product } }
      );
    };
  };

  const createNewPayment = await payment.create({
    id_payment,
    id_user,
    paymentProducts: arrayProducts,
    amount,
    date,
  });

  await userExist.addPayment(createNewPayment);
  await cart.destroy({where: {id_user}});

  return { message: "Payment saved successfully", payment: createNewPayment };
}

module.exports = postOrder;
