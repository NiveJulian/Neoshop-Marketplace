import { useNavigate } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";//todo
import { useTranslation } from "react-i18next";

export default function CartList({ cartItems, calculateTotal }) {
  const navigate = useNavigate()
  const theme = useSelector((state) => state.themes.theme);//todo
  const { t, i18n } = useTranslation();

  const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";//todo
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  const handleContinuePurchase = () => {
    if (cartItems.length === 0) {
      toast.error("Error: cart empty"); // Mostrar mensaje de error con react-hot-toast
    } else {
      navigate('/payPreview');
    }
  };

  return (
    <div className="absolute w-max z-10 top-8 right-0 bg-white rounded-lg p-4 shadow-lg" style={{background: backgroundColor}}>
      {cartItems?.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
      {/* Total del carrito */}
      <div className="mt-4 float-right">
        <h3 className="text-lg font-semibold" style={{color: textColor}}>Total:</h3>
        <p className="text-gray-500">${calculateTotal()}</p>
      </div>
      <div className="mt-4 float-left" style={{ borderColor: bordesPlomos}}>
        <button onClick={ handleContinuePurchase} className="border p-2 hover:text-secondary hover:border-secondary hover:shadow-lg active:translate-y-[5%] rounded-md active:shadow-xl"
          style={{ background: backgroundColor, color: textColor, borderColor: bordesPlomos}}>
          {t('continuePurchase')}
        </button>
      </div>
    </div>
  );
}
