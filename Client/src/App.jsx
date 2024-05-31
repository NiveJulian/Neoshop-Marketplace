import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import ProductDetail from "./views/ProductDetail";
import SingUp from "./views/SingUp";
import StoreDetail from "./views/StoreDetail";
import { Store } from "./views/Store";
import { Products } from "./views/Products";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "./Redux/Actions/Actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/store/:id" element={<StoreDetail />} />
      </Routes>
    </div>
  );
}

export default App;
