import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";

export const CardWide = ({
  id_product,
  name,
  img_product,
  description,
  date_creation,
  price,
}) => {
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
  const descriptionColor = theme === "dark" ? "#b3b3b3" : "#2B2B2B";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  const timePublished = date_creation
  ? formatDistanceToNow(new Date(date_creation))
  : "";

  return (
    <div className="bg-white p-6 shadow-lg transition duration-300 group transform hover:shadow-2xl rounded-2xl cursor-pointer border flex h-80" 
    style={{background: backgroundColor, borderColor: bordesPlomos}}>
      <div className="w-1/3" >
        <Link to={`/product/${id_product}`}>
          <img
            className="w-50 h-50 object-cover rounded-2xl"
            src={img_product}
            alt={name}
          />
        </Link>
      </div>
      <Link to={`/product/${id_product}`}>
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: textColor }}
              >
                {name}
              </h3>
              <p className="text-sm text-gray-500" style={{ color: textColor }}>  
              Published {timePublished} ago.
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-700" style={{color: descriptionColor}} >{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-gray-900" style={{color: textColor}}>${price}</div>
        </div>
      </div>
      </Link>
    </div>
  );
};