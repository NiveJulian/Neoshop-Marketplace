import { Routes, Route } from "react-router-dom";
import HomePage from './views/HomePage'
import LandingPage from './views/LandingPage'
import Login from './views/Login'
import ProductDetail from './views/ProductDetail'
import SingUp from './views/SingUp';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
  )
}

export default App
