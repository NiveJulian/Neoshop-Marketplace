import React, { useState, useEffect } from "react"; // Asegúrate de importar useState y useEffect
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import { myShopping, setHistory } from "../Redux/Actions/productActions";
import { MyShoppingList } from "../components/MySopping/MyShoppingList";
import Sidebar from "../components/SideBar/SideBar";

const Favorites = () => {
  const user = useSelector((state) => state.auth.user);
  const id = user.id_user;
  const dispatch = useDispatch();
  const filteredShopping = useSelector((state) => state.product.filteredShopping);
  const condition = useSelector((state) => state.product.condition);

  const [searchTerm, setSearchTerm] = useState(""); // Estado local para la búsqueda

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

  const total = history.length

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
      // case "namedProducts":
      //   productsToRender = namedProducts;
      //   break;
      default:
        productsToRender = history;
    }

    const filtered = filterProducts(productsToRender); // Filtrar productos en función del término de búsqueda
    return <MyShoppingList history={filtered} />;
  };

  return (
    <div className="bg-gray-100 pb-10 min-h-screen">
        <Nav />
      <div className="mt-10">
        <Sidebar />
      </div>

      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="flex items-center justify-between mb-10">
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
            Your favorite products
          </div>
        </div>
        <div className="flex items-center ml-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-400 rounded-lg"
          />
          <div className="ml-6 text-gray-400">
            You have {total} products in your favorite list
          </div>
        </div>
        <div className="mt-2">{renderProducts()}</div>
      </div>
    </div>
  );
};

export default Favorites;