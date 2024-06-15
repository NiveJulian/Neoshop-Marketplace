import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSellerByName } from "../../../Redux/Actions/storeActions";
export const CardHome = ({
  id_product,
  name,
  img_product,
  date_creation,
  quantity,
  store,
}) => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.store);
  
  useEffect(() => {
    dispatch(getSellerByName(store.name));
  }, [dispatch, store]);

  return (
    <article className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border relative w-64">
      <div className="relative flex mb-4 rounded-2xl">
        <Link
          to={`/product/${id_product}`}
          className="justify-center items-center"
        >
          <img
            className="max-h-80 rounded-2xl w-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
            src={img_product}
            alt=""
          />
        </Link>
        {/* Esquinero con listón "Nuevo" */}
        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="transform rotate-45 rounded-t-3xl rounded-b-sm translate-x-1/2 -translate-y-1/2 w-30 bg-red-500 text-white text-center text-xs font-bold px-8 py-1 shadow-lg">
              NEW
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="ml-1 text-sm text-slate-400">{quantity}</span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full pb-4 mb-auto">
        <div className="flex items-center">
          <div className="pr-3">
            <Link to={`/store/${seller[0]?.id_store}`}>
              <img
                className="h-12 w-12 rounded-full object-cover hover:shadow-lg"
                src={seller[0]?.logo}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-end"></div>
      </div>
      <h3 className="flex font-medium text-xl leading-8">
        <div className="flex flex-1">
          <div className="">
            <p className="text-sm font-semibold ">{name}</p>
            <p className="text-sm text-gray-500">
              Published on {date_creation}2 Days ago
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
            </p>
          </div>
        </div>
        <div className="text-sm flex items-center text-gray-500 "></div>
        {/* <Link
          to={`/product/${id_product}`}
          className="block relative group-hover:text-red-700 transition-colors duration-200 "
        >
        </Link> */}
      </h3>
    </article>
  );
};
