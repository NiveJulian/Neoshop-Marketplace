import React from 'react';
import { CardHome } from '../CardHome/CardHome';

export const CardHomeList = ({ allProducts }) => {
  return (
    <div className="max-w-screen mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {allProducts?.map(product => (
        <CardHome 
          key={product.id_product} 
          id_product={product.id_product}
          name={product.name}
          img_product={product.img_product[0]}
          price={product.price} 
        />
      ))}
    </div>
  );
};
