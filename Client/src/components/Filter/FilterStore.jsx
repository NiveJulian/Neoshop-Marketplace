import { useDispatch, useSelector } from "react-redux";
import { storeFilter, clearFilteredProducts, renderCondition } from "../../Redux/Actions/Actions";
import style from "./FilterCat.module.css"

export default function FilterStore() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store)

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
        {stores.map((store) => (
          <option key={store.name} value={store.name}>{store.name}</option>
        ))}
      </select>
    </div>
  );
}
