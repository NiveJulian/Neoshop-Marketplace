import { useDispatch } from "react-redux";
import { useState } from "react";
import { getProductByName, renderCondition, getAllProducts } from "../../Redux/Actions/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const searchValue = event.target.value;
    setName(searchValue);
    if (searchValue.trim()) {
      // Realizar búsqueda en tiempo real
      dispatch(getProductByName(searchValue)).then((results) => {
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
      dispatch(getAllProducts()); 
      dispatch(renderCondition("allProducts"));
    }
  };

  const handleSearch = () => {
    if (!name.trim()) {
      alert("No se ingresó ningún nombre");
      return; // Detener la ejecución si el campo de búsqueda está vacío
    }
    dispatch(getProductByName(name)); // Realiza la acción que busca por nombre
    console.log(name);
    dispatch(renderCondition("namedProducts"));
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex gap-4">
        <input
          className="px-2 py-2 hover:bg-gray-200 text-gray-700 border-none rounded-md"
          placeholder="Search"
          type="search"
          value={name}
          onChange={handleChange}
        />
        <button className="rounded-full bg-secondary p-3" type="submit" onClick={handleSearch}>
          🔎
        </button>
      </div>

      {/* Cuadro emergente de resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-400 border border-gray-200 rounded-md shadow-lg z-10">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="px-4 py-2 text-white hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                // Manejar la selección de un resultado de búsqueda (opcional)
                setName(result.name);
                setSearchResults([]);
                dispatch(getProductByName(result.name));
                dispatch(renderCondition("namedProducts"));
              }}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
