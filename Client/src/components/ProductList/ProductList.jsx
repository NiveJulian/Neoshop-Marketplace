import {ProductCard} from "../Product/ProductCard";
export default function ProductList({ allProducts }) {
  return (
    <div className="flex flex-wrap justify-between flex-row gap-4">
      {allProducts?.map(product => (
        <ProductCard 
        key={product.id_product} 
        id={product.id_product}
        name={product.name}
        img_product= {product.img_product}
        price={product.price} />
      ))}
    </div>
  );
}