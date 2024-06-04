import { useDispatch } from "react-redux";
import { orderProductsPrice, renderCondition } from "../../Redux/Actions/Actions";
import { useState } from "react";

export const OrderPrice = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("menor");
  const [dropdown, setDropdown] = useState(false);

  const handlePrice = (price) => {
    setSelectedOption(price);
    setDropdown(false);

    dispatch(orderProductsPrice(price));
    dispatch(renderCondition("filteredProducts"));
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="relative mb-3">
      <button
        type="button"
        className="flex min-h-[3rem] items-center justify-between rounded-md bg-gray-200 px-4 py-2 text-stone-800"
        onClick={toggleDropdown}
      >
        {selectedOption === "menor" ? "Menor precio" : "Mayor precio"}
        <i className="fas fa-angle-down pl-3 text-stone-700"></i>
      </button>
      {dropdown && (
        <div className="relative z-50 mt-1 w-full rounded-md bg-gray-300 shadow-lg">
          <ul className="text-gray-700">
            <li>
              <button
                type="button"
                className={`flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300 ${selectedOption === "menor" ? "text-green-500 bg-green-50" : ""}`}
                onClick={() => handlePrice("menor")}
              >
                Menor precio
                {selectedOption === "menor" && (
                  <i className="fas fa-check pl-4 text-green-400"></i>
                )}
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300 ${selectedOption === "mayor" ? "text-green-500 bg-green-50" : ""}`}
                onClick={() => handlePrice("mayor")}
              >
                Mayor precio
                {selectedOption === "mayor" && (
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
