import { useDispatch } from "react-redux";
import "./SearchBar.css";
import { useState } from "react";
import { getProductByName, renderCondition } from "../../Redux/Actions/Actions";

export default function SearchBar() {

  const dispatch= useDispatch();
  const [name,setName]= useState ("");

  const handleChange = (event)=>{
      setName (event.target.value);
   }

  const handleSearch = () => {
     if (!name.trim()) {
        alert("No se ingresó ningún nombre");
        return; // Detener la ejecución si el campo de búsqueda está vacío
      }
     dispatch(getProductByName(name)); //realiza la accion que busca por nombre
     console.log (name);
     dispatch(renderCondition("namedProducts"))
   }

  // const handleClear = () => {
  //    dispatch(renderCondition("allProducts")); 
  //    dispatch(clearNamedGames()); 
  // }

  return (
    <div className="search-box">
        <input placeholder="Search" type="search" value={name} onChange={handleChange} />
        <button className="search-button" type="submit" onClick={handleSearch}>
          🔎
        </button>
    </div>
  );
}



