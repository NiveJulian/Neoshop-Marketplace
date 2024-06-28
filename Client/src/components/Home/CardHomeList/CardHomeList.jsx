import { CardHome } from "../CardHome/CardHome";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToFavorites, sendFavorites, removeFromFavorites, deleteFavoriteItem } from "../../../Redux/Actions/favoritesActions";

export const CardHomeList = ({ allProducts }) => {
  const transparent = "#ffffff00";

  const favorites = useSelector((state) => state.favorites.favItems);
  const favoriteIds = favorites.map(fav => fav.id_product);
  const user = useSelector((state) => state.auth.user);
  const id_user = user.id_user

  const dispatch = useDispatch();

  const handleAddToFav = (product) => {
    const id_product = product.id_product;
    const isFavorite = favoriteIds.includes(id_product);
    if (!id_user) {
      toast.error("User not logged in")
    }
    else if (id_user, isFavorite) {
      toast.success("Removed from favorites");
      dispatch(removeFromFavorites(product));
      dispatch(deleteFavoriteItem(id_product, id_user));
    } else {
      toast.success("Added to favorites");
      dispatch(addToFavorites(product));
      dispatch(sendFavorites(id_product, id_user));
    }
  };

  return (
    <div className="max-w-screen mx-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" style={{border:transparent}}>
      {allProducts?.map(product => (
        <CardHome 
          key={product.id_product} 
          id_product={product.id_product}
          name={product.name}
          store={product.store}
          img_product={product.img_product[0]}
          price={product.price}
          date_creation={product.date_creation}
          onAddToFav={() => handleAddToFav(product)}
        />
      ))}
    </div>
  );
};
