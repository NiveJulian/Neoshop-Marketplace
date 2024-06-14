import { CardHome } from "../CardHome/CardHome";

export const CardHomeList = ({ allProducts }) => {

  return (
    <div className="mt-20 max-w-screen-lg grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      {allProducts?.map(product => (
        <CardHome 
          key={product.id_product} 
          id_product={product.id_product}
          name={product.name}
          store={product.store}
          img_product={product.img_product[0]}
          price={product.price}
        />
      ))}
    </div>
  );
};
