import { useEffect, useState } from "react";
import { ProductCard } from "../Product/ProductCard";
import Paginate from "../Paginate/Paginate";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../Redux/Actions/cartActions";
import { useTranslation } from "react-i18next";

export default function ProductList({ allProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  
  // Calcular los índices de inicio y fin de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar de página
  const page = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    toast.success(t("toast.cartTrue"))
    dispatch(addToCart(product));
  };

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
      <div className="max-w-screen grid grid-cols-1 ml-12 mb-8 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {currentProducts?.map((product) => (
          <ProductCard
            key={product.id_product}
            id={product.id_product}
            name={product.name}
            img_product={product.img_product}
            price={product.price}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
      <Paginate 
        productsPerPage={productsPerPage}
        totalProducts={allProducts.length}
        page={page}
        currentPage={currentPage}
      />
    </div>
  );
}
