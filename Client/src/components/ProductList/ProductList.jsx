import ProductCard from "../Product/ProductCard";
import style from './ProductList.module.css'; // Asegúrate de que este archivo CSS exista y esté correcto

export default function ProductList({ allProducts }) {
  return (
    <div className={style.contenedor}>
      {allProducts.map(product => (
        <ProductCard 
        key={product.id_product} 
        id={product.id_product}
        name={product.name}
        img_product= {product.img_product[0]}
        price={product.price} />
      ))}
    </div>
  );
}