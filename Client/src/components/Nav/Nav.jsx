import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import UserFormLogin from "../UserForm/UserFormLogin";
import { useSelector, useDispatch } from "react-redux";
import User from "../Users/User";
import CartList from "../ProductCart/CartList/CartList";
import { getCartByUserId, sendCart, updateCart } from "../../Redux/Actions/cartActions";
import { renderCondition } from "../../Redux/Actions/productActions";
import { changeTheme } from "../../Redux/Actions/themeActions";
import { io } from "socket.io-client";

export default function Nav({ color }) {
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth && user) {
      dispatch(getCartByUserId(user.id_user));
    }
  }, [isAuth, user, dispatch]);

  useEffect(() => {
    dispatch(changeTheme(localStorage.getItem("theme") || "light"));
  }, [dispatch]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleOnClose = () => {
    setShowLogin(false);
  };

  const handleProducts = () => {
    dispatch(renderCondition("allProducts"));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => {
      const price = parseFloat(product.price);
      const quantity = product.cartQuantity || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);

    return total.toFixed(2);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(changeTheme(newTheme));
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  useEffect(() => {
    if (cartItems.length >= 1 && isAuth && user) {
      dispatch(sendCart(user.id_user, cartItems));
    }
  }, [cartItems, isAuth, user, dispatch]);

  // Socket.io configuration
  // useEffect(() => {
  //   const socket = io("http://localhost:3001", {
  //     withCredentials: true,
  //   });

  //   socket.on("connect", () => {
  //     console.log("Connected to the server");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from the server");
  //   });

  //   if (isAuth && user) {
  //     socket.on("cartUpdated", (updatedCart) => {
  //       console.log("Cart updated:", updatedCart);
  //       // Ensure that the updatedCart has the expected format
  //       if (updatedCart && updatedCart.cartProducts) {
  //         // Dispatch an action to update the cart in Redux
  //         dispatch(updateCart(updatedCart));
  //       } else {
  //         console.error("Received invalid cart data:", updatedCart);
  //       }
  //     });
  //   }

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [isAuth, user, dispatch]);
  return (
    <div className="w-full z-50 shadow-xl">
      <div
        className={`flex items-center justify-between px-2 py-2 shadow-md bg-${
          theme === "dark" ? "#1f1f1f" : color
        }`}
      >
        <div className="flex gap-2 justify-center items-center">
          <Link to={"/"}>
            <img
              src="../../../../neoshoplogo.jpeg"
              className="rounded-lg w-10 h-10"
              alt="neoshologo"
            />
          </Link>
          <SearchBar className="flex items-center justify-center" />
        </div>
        <div className="flex items-center gap-4" >
          <div className="tooltip">
            <Link
              to={"/products"}
              className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                color === "primary" ? "text-gray-200" : "text-gray-600"
              }`}
              style={{ borderColor: bordesPlomos}}
              onClick={handleProducts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
            <div className="tooltiptext">Products</div>
          </div>

          <div className="tooltip">
            <Link
              to={"/store"}
              className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                color === "primary" ? "text-gray-200" : "text-gray-600"
              }`}
              style={{ borderColor: bordesPlomos}}

            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
            </Link>
            <div className="tooltiptext">Store</div>
          </div>

          <div className="tooltip">
            <Link
              to={"/home"}
              className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                color === "primary" ? "text-gray-200" : "text-gray-600"
              }`}
              style={{ borderColor: bordesPlomos}}

            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            <div className="tooltiptext">Home</div>
          </div>

          <div className="tooltip">
            <button
              type="button"
              onClick={() => handleShowLogin()}
              className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                color === "primary"
                  ? "text-gray-200 border-gray-200"
                  : "text-gray-600 border-gray-200"
              }`}
              style={{ borderColor: bordesPlomos}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div className="tooltiptext">Login</div>
          </div>

          {showLogin && (
            <>
              {isAuth ? (
                <User user={user} onClose={handleOnClose} />
              ) : (
                <UserFormLogin title={"Login"} onClose={handleOnClose} />
              )}
            </>
          )}
          {user?.user_type === "admin" || user?.user_type === "trader" ? (
            <div className="tooltip">
              <a
                href={`http://localhost:3000/dashboard/${user.id_user}`}
                rel="noopener noreferrer"
                className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                  color === "primary" ? "text-gray-200" : "text-gray-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>
              </a>
              <div className="tooltiptext">Dashboard</div>
            </div>
          ) : (
            <></>
          )}
          {/* Toggle Theme Button */}
          <div className="tooltip">
            <button
              onClick={handleThemeChange}
              className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                color === "primary" ? "text-gray-200" : "text-gray-600"
              }`}
              style={{ borderColor: bordesPlomos}}
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2.25v1.5m0 16.5v1.5m8.25-9h-1.5m-16.5 0h-1.5M18.364 5.636l-1.061-1.061M6.697 17.303l-1.061-1.061m12.728 0l1.061 1.061m-12.728-12.728L5.636 5.636M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75a9.75 9.75 0 0 1-9.75-9.75c0-1.058.17-2.075.502-3.002a9.75 9.75 0 1 0 12.75 12.752z"
                  />
                </svg>
              )}
            </button>
            <div className="tooltiptext">Theme</div>
          </div>
          <div className="tooltip">
            <button
              onClick={() => toggleCart()}
              className={`px-2 py-2 rounded-lg hover:border-secondary hover:text-secondary ${
                color === "primary" ? "text-gray-200" : "text-gray-600"
              }`}
              style={{ borderColor: bordesPlomos}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
            {cartItems?.length > 0 && (
              <span className="bg-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0">
                {cartItems?.length}
              </span>
            )}
            <div className="tooltiptext">Cart</div>
          </div>
          <div className="relative">
            {showCart && (
              <CartList cartItems={cartItems} calculateTotal={calculateTotal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
