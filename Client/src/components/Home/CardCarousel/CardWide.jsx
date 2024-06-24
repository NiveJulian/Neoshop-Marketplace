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
            className="w-50 h-50 object-cover"
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
          </div>
          <p className="mt-4 text-gray-700">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-gray-900">${price}</div>
        </div>
      </div>
    </div>
  );
};