import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import { myShopping, setHistory } from "../Redux/Actions/productActions";
import { MyShoppingList } from "../components/MySopping/MyShoppingList";
import Sidebar from "../components/SideBar/SideBar";
import { useTranslation } from "react-i18next";

const MyShopping = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const id = user.id_user;
  const dispatch = useDispatch();
  const filteredShopping = useSelector((state) => state.product.filteredShopping);
  const condition = useSelector((state) => state.product.condition);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const cartBackGround = theme === "dark" ? "#1c1c1c" : "#FFFFFF";
  const letrasPlomas = theme === "dark" ? "#bcbcbc" : "#434343";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

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

  const total = history.length;

  useEffect(() => {
    if (history.length > 0) {
      dispatch(setHistory(history));
    }
  }, [history, dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterProducts = (products) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderProducts = () => {
    let productsToRender = history;

    switch (condition) {
      case "filteredProducts":
        productsToRender = filteredShopping;
        break;
      default:
        productsToRender = history;
    }

    const filtered = filterProducts(productsToRender);
    return <MyShoppingList history={filtered} />;
  };

  return (
    <div className="bg-gray-100 pb-10 min-h-screen" style={{ background: backgroundColor }}>
      <Nav />
      <div className="mt-10">
        <Sidebar />
      </div>

      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg"
      style={{ background: cartBackGround }}>
        <div className="flex items-center justify-between mb-10"
        style={{ background: cartBackGround }}>
          <div className="flex items-center">
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full border border-gray-400 p-2 w-28 h-28 mr-5"
            />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: textColor }}>{`${user.name} ${user.lastname || ''}`}</h1>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>{user.email}</p>
            </div>
          </div>
          <div className="mr-6 text-2xl font-bold text-gray-400">
            {t('shoppingHistory.yourShoppingHistory')}
          </div>
        </div>
        <div className="flex items-center ml-8">
          <input
            type="text"
            placeholder={t('shoppingHistory.searchForProducts')}
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-400 rounded-lg"
          />
          <div className="ml-6 text-gray-400" style={{ color: textColor }}>
            {t('shoppingHistory.youHaveProductsInHistory')}{total}{t('shoppingHistory.youHaveProductsInHistory2')}
          </div>
        </div>
        <div className="mt-2">{renderProducts()}</div>
      </div>
    </div>
  );
};

export default MyShopping;
