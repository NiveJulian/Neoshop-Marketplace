import ProductCard from "../Product/ProductCard";
import style from './ProductList.module.css'; // Asegúrate de que este archivo CSS exista y esté correcto

export default function ProductList({ allProducts }) {
  return (
    <div className={style.contenedor}>
      {allProducts.map(product => (
        <ProductCard 
        key={product.id} 
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price} />
      ))}
    </div>
  );
}