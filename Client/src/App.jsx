import { Routes, Route } from "react-router-dom";
import HomePage from './views/HomePage'
import LandingPage from './views/LandingPage'
import Login from './views/Login'
import ProductDetail from './views/ProductDetail'
import SingUp from './views/SingUp';
import { Store } from "./views/Store";
import { Products } from "./views/Products";
import axios from "axios";

function App() {


  // Llamar a la función para "postear" los productos falsos
 

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
          <Route path="/store/:id" element={<ProductDetail />} />
        </Routes>
      </div>
  )
}

export default App
