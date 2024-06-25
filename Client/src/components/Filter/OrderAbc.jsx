import { useDispatch } from "react-redux";
import { useState } from "react";
import { orderProductsAbc, renderCondition } from "../../Redux/Actions/productActions";

export const OrderAbc = () => {
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState("AZ");
  const [dropdown, setDropdown] = useState(false);

  const handleOrder = (order) => {
    setSelectedOrder(order);
    setDropdown(false);

    dispatch(orderProductsAbc(order));
    dispatch(renderCondition("filteredProducts"));
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="flex w-full text-center">
      <button
        type="button"
        className="w-full text-sm min-h-[3rem] text-center rounded-md bg-stone-100 px-2 py-2 text-stone-800 mt-1 mb-1"
        onClick={toggleDropdown}
      >
        {selectedOrder === "AZ" ? "A-Z" : "Z-A"}
        <i className="fas fa-angle-down text-stone-700"></i>
      </button>
      {dropdown && (
        <div className="absolute z-10 mt-1 w-full left-full text-center rounded-md bg-white shadow-lg">
          <ul className="text-gray-700">
            <li>
              <button
                type="button"
                className={`w-full text-center px-4 py-2 hover:bg-stone-500 hover:text-stone-300 ${selectedOrder === "AZ" ? "text-white bg-secondary" : ""}`}
                onClick={() => handleOrder("AZ")}
              >
                A-Z
                {selectedOrder === "AZ" && (
                  <i className="fas fa-check pl-4 text-green-400"></i>
                )}
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`w-full text-center px-4 py-2 hover:bg-stone-500 hover:text-stone-300 ${selectedOrder === "ZA" ? "text-white bg-secondary" : ""}`}
                onClick={() => handleOrder("ZA")}
              >
                Z-A
                {selectedOrder === "ZA" && (
                  <i className="fas fa-check pl-4 text-green-400"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
