import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const FavoriteCard = ({
    brand,
    name,
    price,
    img_product,
    id_product,
    description,
    onAddToFav,
}) => {
    const theme = useSelector((state) => state.themes.theme);

    const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
    const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
    const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

    const favorites = useSelector((state) => state.favorites.favItems);
    const favoriteIds = favorites.map(fav => fav.id_product);
    const isFavorite = favoriteIds.includes(id_product);
  
    return (
        <div className="space-y-4 mb-4">
        <div className="relative flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary" style={{ background: backgroundColor, borderColor: bordesPlomos }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex">
              <Link to={`/product/${id_product}`}>
                <img
                  src={img_product}
                  className="rounded-full border border-gray-400 p-2 w-28 h-28 mr-5"
                />
              </Link>
              <div>
                <div className="flex mb-2">
                  <p className="text-2xl font-bold text-lg" style={{ color: textColor }}>{brand}</p>
                  <p className="text-2xl font-bold text-lg" style={{ color: textColor }}>{name}</p>
                </div>
                <div>
                  <p className="text-2xl text-lg mb-2" style={{ color: textColor }}>{description}</p>
                </div>
                <p className="text-2xl text-lg" style={{ color: textColor }}>Price: ${price}</p>
              </div>
            </div>
          </div>
          <button 
            className="absolute top-2 right-2 inline-flex items-center rounded-lg bg-white p-2 shadow-lg hover:shadow-lg transition-transform duration-300 transform hover:scale-110"
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
      </div>
    )
}