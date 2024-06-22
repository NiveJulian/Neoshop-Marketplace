import Nav from "../components/Nav/Nav";
import React from "react";
import Sidebar from "../components/SideBar/SideBar";
import ProductList from "../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../Redux/Actions/productActions";
// import Categories from "../components/Categories/Categories";

export const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.allProducts);
  const filteredProducts = useSelector((state) => state.product.filteredProducts);
  const filters = useSelector((state) => state.product.filters);
  const namedProducts = useSelector((state) => state.product.namedProducts);
  const condition = useSelector((state) => state.product.condition);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const renderProducts = () => {
    switch (condition) {
      case "allProducts":
        return <ProductList allProducts={allProducts} />;
      case "filteredProducts":
        return <ProductList allProducts={filteredProducts} />;
      case "namedProducts":
        return <ProductList allProducts={namedProducts} />;

      default:
        return <ProductList allProducts={allProducts} />;
    }
  };

  return (
    <div className="max-w-screen text-center bg-gray-100 gap-4">
      <div className="shadow-sm">
        <Nav color={"primary"} />
      </div>
      <div className="flex justify-center text-center mt-4 mb-8">
        <h1 className="mb-7 text-4xl font-bold pb-2 text-gray-300 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
          Products
        </h1>
        {/* <Categories/>  */}
      </div>      
      <div className="relative -mt-24">
        <Sidebar />
      </div>
      <div>
      <div className="flex mt-24 justify-center">
          {filters.store && (
            <p className="flex mr-2 text-center items-center rounded-md bg-white px-4 py-2 text-stone-600 shadow-sm">
              {filters.store}
            </p>
          )}
          {filters.brand && (
            <p className="flex mr-2 text-center items-center rounded-md bg-white px-4 py-2 text-stone-600 shadow-sm">
              {filters.brand}
            </p>
          )}
          {filters.category && (
            <p className="flex mr-2 text-center items-center rounded-md bg-white px-4 py-2 text-stone-600 shadow-sm">
              {filters.category}
            </p>
          )}
        </div>
        <div className="flex justify-center items-center">          
          <div className="mt-16">{renderProducts()}</div>
        </div>
      </div>      
    </div>
  );
};
