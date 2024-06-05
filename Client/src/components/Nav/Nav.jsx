import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import UserFormLogin from "../UserForm/UserFormLogin";
import { useSelector } from "react-redux";
import User from "../Users/User";
import { useDispatch } from "react-redux";
import { renderCondition } from "../../Redux/Actions/Actions";

export default function Nav({ color }) {
  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.isAuth);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();

  function handleShowLogin() {
    setShowLogin(true);
  }

  function handleOnClose() {
    setShowLogin(false);
  }

  function handleProducts() {
    dispatch(renderCondition("allProducts"));
  }

  return (
    <div className="w-full z-50 shadow-xl">
      <div className={`flex items-center justify-between px-2 py-2 shadow-md bg-${color}`}>
        <div>
          <SearchBar className="flex items-center justify-center" />
        </div>
        <div className="flex items-center gap-4">
          <div className="tooltip">
            <Link
              to={"/products"}
              className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center ${
                color === "primary"
                  ? "text-gray-200 border-gray-200"
                  : "text-gray-600 border-gray-600"
              }`}
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
              className={`border  hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2  flex items-center ${
                color === "primary"
                  ? "text-gray-200 border-gray-200"
                  : "text-gray-600 border-gray-600"
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
            <button
              className={`hover:shadow-lg mr-2 border-gray-600 hover:border-secondary hover:text-secondary ${
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
        </div>
      </div>
    </div>
  );
}
