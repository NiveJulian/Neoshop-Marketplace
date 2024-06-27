import { HistoryCard } from "./HistoryCard";

export const MyShoppingList = ({ history }) => {

  return (
    <div className="items-center text-left p-4 rounded-lg justify-between w-full flex-grow">
      {history?.map(product => (
        <HistoryCard 
          key={product.id_product} 
          id_product={product.id_product}
          name={product.name}
          quantity={product.quantity}
          img_product={product.img_product}
          price={product.price}
        />
      ))}
    </div>
  );
};