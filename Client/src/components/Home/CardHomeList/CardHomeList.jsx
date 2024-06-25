import { CardHome } from "../CardHome/CardHome";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToFavorites, sendFavorites } from "../../../Redux/Actions/favoritesActions";

export const CardHomeList = ({ allProducts }) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user.id_user

  const dispatch = useDispatch();

const handleAddToFav = (product) => {
  const idProduct = product.id_product
  toast.success("Add to favorites")
  dispatch(addToFavorites(product));
  dispatch(sendFavorites(userId, idProduct))
  console.log("usuario enviado:", userId, "producto enviado:", idProduct);
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
