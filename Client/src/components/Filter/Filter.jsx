import { useDispatch } from "react-redux";
import { categoryFilter, clearFilteredProducts, renderCondition } from "../../Redux/Actions/Actions";
import style from "./Filter.module.css"

export default function Filter() {
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    const category = event.target.value; //

    if (category !== "All") {
      dispatch(categoryFilter(category));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(renderCondition("allProducts"));
      dispatch(clearFilteredProducts());
    }
  };

  return (
    <div className={style.font}>
      <h4>FILTER BY GENRES</h4>
      <select onChange={handleCategoryChange}>
        <option value="All">All</option>
        <option value="Tecnholgy">Tecnholgy</option>
        <option value="Clothes">Clothes</option>
        <option value="Smartphones">Smartphones</option>
        <option value="Home">Home</option>  
      </select>
    </div>
  );
}
