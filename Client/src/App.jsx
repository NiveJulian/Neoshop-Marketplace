import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LandingPage from "./views/LandingPage";
import ProductDetail from "./views/ProductDetail";
import StoreDetail from "./views/StoreDetail";
import { Store } from "./views/Store";
import { Products } from "./views/Products";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllBrands, getAllCategories, getAllProducts, getAllSellers, isAuthenticated } from "./Redux/Actions/Actions";
import SingUp from "./views/SingUp";
import { Toaster } from "react-hot-toast";
import jwtToken from "./components/getCookie";
import axios from "axios";
import { PayDetail } from "./views/PayDetail";

function App() {
 


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllSellers());
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(isAuthenticated(jwtToken));
   
    
    
  }, [dispatch]);

 
 
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SingUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/store/:id" element={<StoreDetail />} />
        <Route path="/pay" element={<PayDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
