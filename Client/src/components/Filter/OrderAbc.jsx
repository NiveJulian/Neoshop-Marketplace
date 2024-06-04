import { useDispatch } from "react-redux";
import { orderProductsAbc, renderCondition } from "../../Redux/Actions/Actions";
import { useState } from "react";

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
    <div className="relative mb-3">
      <button
        type="button"
        className="flex min-h-[3rem] items-center justify-between rounded-md bg-stone-100 px-2 py-4 text-stone-800"
        onClick={toggleDropdown}
      >
        {selectedOrder === "AZ" ? "A-Z" : "Z-A"}
        <i className="fas fa-angle-down pl-3 text-stone-700"></i>
      </button>
      {dropdown && (
        <div className="absolute z-10 mt-1 w-20 text-center rounded-md bg-white shadow-lg">
          <ul className="text-gray-700">
            <li>
              <button
                type="button"
                className={`flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300 ${selectedOrder === "AZ" ? "text-secondary bg-green-50" : ""}`}
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
                className={`flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300 ${selectedOrder === "ZA" ? "text-secondary bg-green-50" : ""}`}
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
