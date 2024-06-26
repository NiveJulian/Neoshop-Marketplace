import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  getProductByName,
  renderCondition,
} from "../../Redux/Actions/productActions";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();

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
      toast.error(t("toast.emptySearchBar")); // Mensaje de error para campo de búsqueda vacío
      return; // Detener la ejecución si el campo de búsqueda está vacío
    }
    dispatch(getProductByName(name)).then((results) => {
      console.log(results)

      if (!results) {
        toast.error(t("toast.noProducts")); // Mensaje de error cuando no se encuentran productos
      } else {
        dispatch(renderCondition("namedProducts"));
      }
    });
  };
  const backgroundColorInput = theme === "dark" ? "#ececec" : "#ececec";
  const textColor2 = theme === "dark" ? "#000000" : "#000000";

  const backgroundColor = theme === "dark" ? "#949494" : "#ececec";
  const textColor = theme === "dark" ? "#f0f0f0" : "#f0f0f0";
  const orangeColor = theme === "dark" ? "rgb(214, 124, 50)" : "#FF8200";

  return (
    <div className="relative flex flex-col">
      <div className="flex gap-4">
        <input
          className="px-2 py-2 hover:bg-gray-200 border-none rounded-md"
          placeholder={t("Search")}
          type="search"
          value={name}
          onChange={handleChange}
          style={{background: backgroundColorInput, color: textColor2}}
        />

        <button
          className="rounded-full"
          type="button"
          onClick={handleSearch}
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: orangeColor,
          }}
        >
          <FontAwesomeIcon icon={faSearch} style={{ fontSize: "18px", color: textColor}} />
        </button>
      </div>

      {/* Cuadro emergente de resultados de búsqueda */}
      {searchResults?.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-400 border border-gray-200 rounded-md shadow-lg z-10">
          {searchResults?.map((result) => (
            <div
              key={result.id}
              className="px-4 py-2 text-white hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                // Manejar la selección de un resultado de búsqueda (opcional)
                setName(result.name);
                setSearchResults([]);
                dispatch(getProductByName(result.name));
                dispatch(renderCondition("namedProducts"));
                navigate("/products");
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
