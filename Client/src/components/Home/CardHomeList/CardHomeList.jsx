import { CardHome } from "../CardHome/CardHome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToFavorites } from "../../../Redux/Actions/favoritesActions";

export const CardHomeList = ({ allProducts }) => {
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
  const textColorH1 = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
  const transparent = "#ffffff00";


  const dispatch = useDispatch();

const handleAddToFav = (product) => {
  toast.success("Add to favorites")
  dispatch(addToFavorites(product));
};

  return (
    <div className="max-w-screen mx-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {allProducts?.map(product => (
        <CardHome 
          key={product.id_product} 
          id_product={product.id_product}
          name={product.name}
          store={product.store}
          img_product={product.img_product[0]}
          price={product.price}
          onAddToFav={() => handleAddToFav(product)}
        />
      ))}
    </div>
  );
};
