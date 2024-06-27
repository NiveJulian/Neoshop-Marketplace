import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18next.js"; // Importa la configuración de i18next

const initialOptions = {
  clientId:
    "AUjnioWNVCz5iO9k_PMV_W_mE2kcKfCqj6DyWf1HfQE_rOx-vNEVAT-K9XXpJH1XEiRvCrwhk17Ahs82", // client ID
  currency: "USD", // Configuración de la moneda
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <PayPalScriptProvider options={initialOptions}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PayPalScriptProvider>
    </I18nextProvider>
  </React.StrictMode>
);
