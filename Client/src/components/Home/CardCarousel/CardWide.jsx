import React from "react";
import { Link } from "react-router-dom";

export const CardWide = ({
  id_product,
  name,
  img_product,
  description,
  date_creation,
  quantity,
  price,
  id_store,
  store,
}) => {
  return (
    <div className="bg-white p-6 shadow-lg transition duration-300 group transform hover:shadow-2xl rounded-2xl cursor-pointer border flex h-80">
      <div className="w-1/3">
        <Link to={`/product/${id_product}`}>
          <img
            className="w-40 h-40 object-cover"
            src={img_product}
            alt={name}
          />
        </Link>
      </div>
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{name}</h3>
              <p className="text-sm text-gray-500">Published on {date_creation}</p>
            </div>
            <Link to={`/store/${id_store}`} className="text-gray-500 hover:underline">
              Store Info
            </Link>
          </div>
          <p className="mt-4 text-gray-700">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 text-red-700 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span>{quantity}</span>
          </div>
          <div className="text-lg font-bold text-gray-900">${price}</div>
        </div>
      </div>
    </div>
  );
};