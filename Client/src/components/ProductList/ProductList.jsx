import { useEffect, useState } from "react";
import { ProductCard } from "../Product/ProductCard";
import Paginate from "../Paginate/Paginate";

export default function ProductList({ allProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calcular los índices de inicio y fin de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const page = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  return (
    <div>
      <div className="mb-16">
      <Paginate 
        productsPerPage={productsPerPage}
        totalProducts={allProducts.length}
        page={page}
        currentPage={currentPage}
      />
      </div>
      <div className="flex flex-wrap justify-between flex-row gap-4">
        {currentProducts?.map((product) => (
          <ProductCard 
            key={product.id_product} 
            id={product.id_product}
            name={product.name}
            img_product={product.img_product[0]}
            price={product.price} 
          />
        ))}
      </div>
    </div>
  );
}