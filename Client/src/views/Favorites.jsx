import React, { useState, useEffect } from "react"; // Asegúrate de importar useState y useEffect
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import { getFavoritesByUserId } from "../Redux/Actions/favoritesActions";
import { FavoritesList } from "../components/Favorites/FavoritesList";
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const user = useSelector((state) => state.auth.user);
  const id = user.id_user;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para la búsqueda
  const theme = useSelector((state) => state.themes.theme);
  const { t } = useTranslation();

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const cartBackGround = theme === "dark" ? "#1c1c1c" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";

  useEffect(() => {
    if (user) {
      dispatch(getFavoritesByUserId(id))
    }
  }, [dispatch, id]);

  const favorites = useSelector((state) => state.favorites.favItems);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const total = favorites.length
  // const filteredFavs = favorites.filter((favorite) =>
  //   favorite.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="bg-gray-100 pb-10 min-h-screen" style={{ background: backgroundColor }}>
        <Nav />
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
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="mr-6 text-2xl font-bold text-gray-400">
          {t("favorites.title")}
          </div>
        </div>
        <div className="flex items-center ml-8">
          <input
            type="text"
            placeholder={t("favorites.search")}
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-400 rounded-lg"
          />
          <div className="ml-4" style={{ color: textColor }}>
          {t("favorites.youHave")} {total} {t("favorites.youHave2")}
          </div>       
        </div>
        <div className="mt-2">
          <FavoritesList favorites={favorites}/>
        </div>
      </div>
    </div>
  );
};

export default Favorites;