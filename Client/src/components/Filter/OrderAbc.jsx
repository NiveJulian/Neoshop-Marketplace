import { useDispatch } from "react-redux";
import { orderProductsAbc, renderCondition } from "../../Redux/Actions/Actions";
import style from "./FilterCat.module.css"
import { useState } from "react";

export const OrderAbc = () => {
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedORder] = useState("AZ");

  const handleOrder = (event) => {
    const order = event.target.value;
    setSelectedORder(order);

    if (order === "AZ") {
      dispatch(orderProductsAbc("AZ"));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(orderProductsAbc("ZA"));
      dispatch(renderCondition("filteredProducts"));
    }
  };

  return (
    <div className={style.font}>
    <select className={style.select} value={selectedOrder} onChange={handleOrder}>
      <option value="AZ">AZ</option>
      <option value="ZA">ZA</option>
    </select>
    </div>
  );
};
