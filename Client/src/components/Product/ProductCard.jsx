import { Link } from "react-router-dom";
import style from "./ProductCard.module.css"; // Asegúrate de que este archivo CSS exista y esté correcto

export const ProductCard = ({
  id_product,
  name,
  img_product,
  date_creation,
  price,
  quantity,
  available,
  average_mark,
  status,
  id_review,
  id_discounts,
  id_store,
}) => {
  return (
    <article className="bg-white p-2 mb-4 shadow transition duration-300 group transform hover:-translate-y-1 hover:shadow-lg rounded-xl cursor-pointer border relative max-w-xs">
    <a
      target="_self"
      href={`/product/${id_product}`}
      className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
    ></a>

    <div className="relative mb-3 rounded-xl">
      <img
        className="max-h-32 rounded-xl w-full  object-contain transition-transform duration-300 transform group-hover:scale-105"
        src={img_product}
        alt=""
      />

      {/* Esquinero con listón "Nuevo" */}
      <div className="absolute top-0 right-0">
        <div className="relative">
          <div className="transform rotate-45 rounded-t-3xl rounded-b-sm translate-x-1/2 -translate-y-1/2 w-15 bg-red-500 text-white text-center text-xs font-bold px-4 py-1 shadow-lg">
            NEW
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 inline-flex items-center rounded-lg bg-white p-1 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4 text-red-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="ml-1 text-xs text-slate-400">{quantity}</span>
      </div>

      <a
        className="flex justify-center items-center bg-secondary bg-opacity-30 z-10 absolute top-0 left-0 w-full h-full text-white rounded-xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-lg group-hover:opacity-100"
        href={`/product/${id_product}`}
        target="_self"
        rel="noopener noreferrer"
      >
        Ver articulo
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
      </a>
    </div>
    <div className="flex justify-between items-center w-full pb-2 mb-auto">
      <div className="flex items-center">
        <div className="pr-2">
          <Link to={`/store/${id_store}`}>
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={img_product}
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-1">
          <div className="">
            <p className="text-xs font-semibold ">{name}</p>
            <p className="text-xs text-gray-500">
              Published on {date_creation}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="text-xs flex items-center text-gray-500 ">
          2 Days ago
          <svg
            className="ml-1 w-3 h-3"
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
        </div>
      </div>
    </div>
    <h3 className="font-medium text-lg leading-7">
      <a
        href="/blog/slug"
        className="block relative group-hover:text-red-700 transition-colors duration-200 "
      >
        Instant Help at Your Fingertips
      </a>
    </h3>
    <div></div>
  </article>
  );
};
