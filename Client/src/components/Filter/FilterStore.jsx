import { useDispatch } from "react-redux";
import { storeFilter, clearFilteredProducts, renderCondition } from "../../Redux/Actions/Actions";
import style from "./FilterCat.module.css"

export default function FilterStore() {
  const dispatch = useDispatch();

  const handleShopChange = (event) => {
    const store = event.target.value; 

    if (store !== "All") {
      dispatch(storeFilter(store));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(renderCondition("allProducts"));
      dispatch(clearFilteredProducts());
    }
  };

  return (
    <div className={style.font}>
      <select onChange={handleShopChange}>
        <option value="All">All</option>
        <option value="Ferreteria Lopez">Ferr Lopez</option>
        <option value="Ferreteria Martinez">Ferr Martinez</option>
        <option value="Falavella">Falavella</option>
        <option value="Musimundo">Musimundo</option> 
        <option value="Fravega">Fravega</option> 
        <option value="CompraGamer">CompraGamer</option>
      </select>
    </div>
  );
}
