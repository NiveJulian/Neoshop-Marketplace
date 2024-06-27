import { FavoriteCard } from "./FavoriteCard";

export const FavoritesList = ({ favorites }) => {

  return (
    <div className="items-center text-left p-4 rounded-lg justify-between w-full flex-grow">
      {favorites?.map(product => (
        <FavoriteCard 
          key={product.id_product} 
          id_product={product.id_product}
          name={product.name}
          img_product={product.img_product}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};