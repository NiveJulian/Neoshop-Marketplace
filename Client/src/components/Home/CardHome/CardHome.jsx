import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";

export const CardHome = ({
  id_product,
  name,
  img_product,
  onAddToFav,
  date_creation
}) => {
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();

  const favorites = useSelector((state) => state.favorites.favItems);
  const favoriteIds = favorites.map(fav => fav.id_product);
  const isFavorite = favoriteIds.includes(id_product);

  const backgroundColor = theme === "dark" ? "#171717" : "#ffffff";
  const textColor = theme === "dark" ? "#d1d1d1" : "#292929";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  const timePublished = date_creation
  ? formatDistanceToNow(new Date(date_creation))
  : "";

  return (
    <article className="bg-white p-2 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer relative w-64 h-full" style={{ background: backgroundColor, borderColor: bordesPlomos}}>
      <div className="relative flex mb-4 rounded-2xl">
        <Link
          to={`/product/${id_product}`}
          className="justify-center items-center"
        >
          <img
            className="w-64 h-64 object-cover"
            src={img_product}
            alt=""
          />
        </Link>
        {/* Esquinero con listón "Nuevo" */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <div className="transform rotate-45 rounded-t-3xl rounded-b-sm translate-x-1/2 -translate-y-1/2 w-30 bg-red-500 text-white text-center text-xs font-bold px-8 py-1 shadow-lg">
            {t('homePage.new')}
            </div>
          </div>
        </div>
        {/* Boton de favoritos */}
        <button 
          className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-lg hover:shadow-lg transition-transform duration-300 transform hover:scale-110"
          onClick={onAddToFav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${isFavorite ? 'text-red-600' : 'bg-white text-gray-400'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
      
      <h3 className="flex leading-8">
        <div className="flex flex-1" style={{ color: textColor}}>
        <div className="flex flex-col items-center justify-between h-20">
          <h2 className="p-2 text-slate-700 text-center w-full" style={{ color: textColor}}>{name}</h2>
          <p className="flex items-center text-sm text-gray-500 absolute bottom-0 left-3 mb-3 w-full">
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="ml-2 text-center">
              Published {timePublished} ago.
            </div>
          </p>
        </div>
        </div>
        <div className="text-sm flex items-center text-gray-500 "></div>
      </h3>
    </article>
  );
};
