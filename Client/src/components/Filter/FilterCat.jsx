import { useDispatch } from "react-redux";
import {  clearFilteredProducts, renderCondition } from "../../Redux/Actions/Actions";
import style from "./FilterCat.module.css"

export default function Filter() {
  const dispatch = useDispatch();
  

  const handleCategoryChange = (event) => {
    const categories = event.target.value; 

    if (categories !== "All") {
      dispatch(categoryFilter(categories));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(renderCondition("allProducts"));
      dispatch(clearFilteredProducts());
    }
  };

  return (
    <div className={style.font}>
      <select onChange={handleCategoryChange}>
        <option value="All">All</option>
        <option value="Tecnholgy">Tecnholgy</option>
        <option value="Clothes">Clothes</option>
        <option value="Smartphones">Smartphones</option>
        <option value="Home">Home</option> 
        <option value="Herramienta">Herramienta</option> 
        <option value="Carpintería">Carpintería</option>
        <option value="Electricidad">Electricidad</option>
        <option value="Construcción">Construcción</option>
        <option value="Jardinería">Jardinería</option>
        <option value="Mecánica">Mecánica</option>
      </select>
    </div>
  );
}
