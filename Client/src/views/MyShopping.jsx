import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav/Nav";
import { myShopping } from "../Redux/Actions/productActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MyShoppingList } from "../components/MySopping/MyShoppingList";

const MyShopping = () => {
  const user = useSelector((state) => state.auth.user);
  const id = user.id_user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(myShopping(id));
    }
  }, [dispatch, id]);

  const shopping = useSelector((state) => state.product.myShopping);

  const extractPaymentProducts = (shopping) => {
    return shopping.reduce((acc, payment) => {
      payment.paymentProducts.forEach((product) => {
        acc.push({
          brand: product.brand,
          name: product.name,
          price: product.price,
          img_product: product.img_product[0],
          id_product: product.id_product,
          quantity: product.quantity,
        });
      });
      return acc;
    }, []);
  };

  const history = extractPaymentProducts(shopping);

  console.log("los productos:", history);

  return (
    <div className="bg-gray-100 pb-10 min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-full border border-gray-400 p-2 w-28 h-28 mr-5"
          />
          <div>
            <h1 className="text-2xl font-bold">{`${user.name} ${user.lastname || ''}`}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          </div>
          <div className="mr-6 text-2xl font-bold text-gray-400">
          Your shopping history
        </div>
        </div>
          <MyShoppingList history={history} />              
      </div>
    </div>
  );
};

export default MyShopping;