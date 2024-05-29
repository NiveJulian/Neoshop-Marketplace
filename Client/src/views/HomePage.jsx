import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProductList from '../components/ProductList/ProductList'
import { getAllProducts, renderCondition } from '../Redux/Actions/Actions';
import Sidebar from '../components/SideBar/SideBar';
import style from "./HomePage.module.css";

const HomePage = () => {

  const dispatch = useDispatch();
  const allProducts = useSelector ((state)=>state.allProducts);
  const filteredProducts= useSelector ((state)=>state.filteredProducts);
  const condition = useSelector((state) => state.condition);

  useEffect (()=>{
    dispatch (getAllProducts());
  },[dispatch])


  const renderProducts = () => {
    switch (condition) {
      case "allProducts":
        return <ProductList allProducts={allProducts} />;
      case "filteredProducts":
        return <ProductList allProducts={filteredProducts} />;

      default:
        return <ProductList allProducts={allProducts}  />; 
    }
  };



  return (
    <div>
                
      <div><Sidebar/></div>
      <div className={style.mainContent}>{renderProducts()}</div>
    </div>
  );
}

export default HomePage;