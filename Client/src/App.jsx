import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LandingPage from "./views/LandingPage";
import ProductDetail from "./views/ProductDetail";
import StoreDetail from "./views/StoreDetail";
import { Store } from "./views/Store";
import { Products } from "./views/Products";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SingUp from "./views/SingUp";
import { Toaster } from "react-hot-toast";
import jwtToken from "./components/getCookie";
import ProfileDetail from "./views/ProfileDetail";
import PersonalDetail from "./views/PersonalDetail";
import ConfirmationUser from "./views/ConfirmationUser";
import CreateStore from "./views/CreateStore";
import { PayDetail } from "./views/PayDetail";
import { AdressUser } from "./views/AdressUser";
import { PayPreview } from "./views/PayPreview";
import { getAllBrands, getAllCategories, getAllProducts } from "./Redux/Actions/productActions";
import { getAllSellers } from "./Redux/Actions/storeActions";
import { isAuthenticated } from "./Redux/Actions/authActions";
import { io } from "socket.io-client";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllSellers());
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(isAuthenticated(jwtToken));
  }, [dispatch]);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("response_event", (data) => {
      console.log("Response event data:", data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Toaster containerClassName="mt-16" position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/store/:id" element={<StoreDetail />} /> 
        <Route path="/payPreview" element={<PayPreview/>} />
        <Route path="/adress" element={<AdressUser/>} />
        <Route path="/pay" element={<PayDetail/>} />
        <Route path="/profile" element={<ProfileDetail/>} />
        <Route path="/personal" element={<PersonalDetail/>} />
        <Route path="/confirmation" element={<ConfirmationUser/>} />
        <Route path="/createstore" element={<CreateStore/>} />
      </Routes>
    </div>
  );
}

export default App;
