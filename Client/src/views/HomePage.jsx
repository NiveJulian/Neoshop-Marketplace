import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProductList from '../components/ProductList/ProductList'
import { getAllProducts } from '../Redux/Actions/Actions';

const HomePage = () => {

  const dispatch = useDispatch();
  const allProducts = useSelector((state)=>state.allProducts);

  useEffect (()=>{
    dispatch (getAllProducts());
  },[dispatch])




  return (
    <div>
      HomePage
      <div>
        <ProductList allProducts={allProducts} />
      </div>
    </div>
  );
}

export default HomePage;