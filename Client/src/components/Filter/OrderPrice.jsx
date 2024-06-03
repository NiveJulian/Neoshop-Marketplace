import { useDispatch } from "react-redux";
import {orderProductsPrice, renderCondition,} from "../../Redux/Actions/Actions";
import style from "./FilterCat.module.css"
import { useState } from "react";

export const OrderPrice = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("menor");

  const handlerPrice = (event) => {
    const price = event.target.value;
    setSelectedOption(price);

    if (price === "menor") {
      dispatch(orderProductsPrice(price));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(orderProductsPrice(price));
      dispatch(renderCondition("filteredProducts"));
    }
  };

  return (
    <div className={style.font}>
    <select className={style.select} value={selectedOption} onChange={handlerPrice}>
      <option value="menor">Menor precio</option>
      <option value="mayor">Mayor precio</option>
    </select>
    </div>
  );
};
