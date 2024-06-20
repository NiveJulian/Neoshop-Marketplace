import React, { useState } from "react";
import Nav from "../components/Nav/Nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const PayPreview = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const theme = useSelector((state) => state.themes.theme);//todo

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";//todo
  const cartBackGround = theme === "dark" ? "#171717" : "#FFFFFF";
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const orangeIntense = theme === "dark" ? "#D67C32" : "#FF8200";

  const total = cart.reduce(
    (acc, product) => acc + parseFloat(product.price) * product.cartQuantity,
    0
  );

  // Estado para el método de envío
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const navigate = useNavigate();

  // Función para manejar el cambio en los checkboxes
  const handleCheckboxChange = (method) => {
    setDeliveryMethod(method);
  };

  return (
    <div className="min-h-screen text-center bg-gray-100 gap-4" style={{ background: backgroundColor, borderColor: bordesPlomos }}>
      <div className="shadow-sm">
        <Nav color={"primary"} />
      </div>
      <div className="flex justify-between mt-8">
        <div className="w-1/3 mr-2 ml-10 mt-4">
          <div className="bg-white rounded-lg p-4 shadow-md" style={{ background: cartBackGround, color: textColor }}>
            <p className="font-bold text-lg">Choose delivery method</p>
            <label className="flex items-center mt-2" >
              <input
                type="checkbox"
                className="mr-2"
                checked={deliveryMethod === "Standard"}
                onChange={() => handleCheckboxChange("Standard")}
              />
              Standard shipping
            </label>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
              onClick={() => (location.href = "/adress")}
            >
              Edit users data
            </button>
          </div>
          <div className="mt-4 bg-white rounded-lg p-4 shadow-md"style={{ background: cartBackGround, color: textColor }}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={deliveryMethod === "Seller"}
                onChange={() => handleCheckboxChange("Seller")}
              />
              Arrange shipping with seller
            </label>
          </div>
        </div>
        <div className="w-1/3 ml-2" >
          <div className="bg-white rounded-lg p-4 shadow-md mr-10 mt-4 text-lg" style={{ background: cartBackGround, color: textColor }}>
            <strong>Summary</strong>
            <div className="line h-px w-1/2 my-2 bg-gray-300 mx-auto"></div>
            {cart.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{product.name}</span>
                <span>({product.cartQuantity})</span>
              </div>
            ))}
            <div className="line h-px w-1/2 my-2 bg-gray-300 mx-auto"></div>
            <div className="text-center">Total ${total.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <button
        className="mt-16 ml-100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg"
        onClick={() => (navigate("/pay"))}
      >
        Continue
      </button>
    </div>
  );
};