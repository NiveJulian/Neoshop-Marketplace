import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { logout } from "../../Redux/Actions/authActions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cleanFavorites } from "../../Redux/Actions/favoritesActions";

export default function User({ user, onClose }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    try {
      dispatch(cleanFavorites())
      await doSignOut();
      dispatch(logout(t)); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const theme = useSelector((state) => state.themes.theme); //todo

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6"; //todo
  const cartBackGround = theme === "dark" ? "#212121" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const textColorLetrasBlancas = theme === "dark" ? "#9c9c9c" : "#DDDDDD";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const backgroundPerfil = theme === "dark" ? "#1a1a1a" : "#1F2937";
  const hoverColor = theme === "dark" ? "#535353" : "#d4d4d4";

  const [bgColorProfile, setBgColorProfile] = useState("");
  const [bgColorContact, setBgColorContact] = useState("");
  const [bgColorLogout, setBgColorLogout] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white w-72 h-auto rounded overflow-hidden shadow-lg"
        style={{ background: backgroundColor }}
      >
        <div
          className="text-center p-6 bg-gray-800 border-b"
          style={{ background: backgroundPerfil }}
        >
          <button
            type="button"
            className="flex top-0 right-0 text-3xl text-white hover:text-gray-600"
            onClick={onClose}
            style={{
              background: backgroundPerfil,
              color: textColorLetrasBlancas,
            }}
          >
            &times;
          </button>
          <div
            className="flex justify-center"
            style={{ background: backgroundPerfil }}
          >
            {!user?.picture ? (
              <Link to={"/adress"}>
                <svg
                  aria-hidden="true"
                  role="img"
                  className="h-32 w-32 text-white rounded-full mx-auto border border-gray-200 p-2 hover:border-secondary"
                  width="32"
                  height="32"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                  ></path>
                </svg>
              </Link>
            ) : (
              <Link to={"/adress"}>
                <img
                  className="rounded-full border border-gray-200 p-2 hover:border-secondary w-32 h-32"
                  src={user?.picture}
                ></img>
              </Link>
            )}
          </div>

          <p
            className="pt-2 text-lg font-semibold text-gray-50"
            style={{
              background: backgroundPerfil,
              color: textColorLetrasBlancas,
            }}
          >
            {user.name}
          </p>
          <p
            className="text-sm text-gray-100"
            style={{
              background: backgroundPerfil,
              color: textColorLetrasBlancas,
            }}
          >
            {user.email}
          </p>
        </div>
        <div className="border-b">
          <Link
            to="/Profile"
            className="px-4 py-2 flex"
            style={{ backgroundColor: bgColorProfile }}
            onMouseEnter={() => setBgColorProfile(hoverColor)} // Cambia el color al pasar el cursor
            onMouseLeave={() => setBgColorProfile("")} // Restaura el color original al quitar el cursor
          >
            <p
              className="text-sm font-medium text-gray-600"
              style={{ color: textColor }}
            >
              {t("user.profile")}
            </p>
          </Link>

          <Link
            to="/Contact"
            className="px-4 py-2 flex"
            style={{ backgroundColor: bgColorContact }}
            onMouseEnter={() => setBgColorContact(hoverColor)} // Cambia el color al pasar el cursor
            onMouseLeave={() => setBgColorContact("")} // Restaura el color original al quitar el cursor
          >
            <p
              className="text-sm font-medium text-gray-600"
              style={{ color: textColor }}
            >
              {t("user.contact")}
            </p>
          </Link>
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-4 text-sm text-left text-red-600"
            style={{ backgroundColor: bgColorLogout }}
            onMouseEnter={() => setBgColorLogout(hoverColor)} // Cambia el color al pasar el cursor
            onMouseLeave={() => setBgColorLogout("")} // Restaura el color original al quitar el cursor
          >
            {t("user.logOut")}
          </button>
        </div>
      </div>
    </div>
  );
}
