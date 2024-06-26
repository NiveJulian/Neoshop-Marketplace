import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";
import CardCarousel from "../components/Home/CardCarousel/CardCarousel";
import { getNewProducts } from "../Redux/Actions/productActions";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.product.newProducts);
  const theme = useSelector((state) => state.themes.theme);//todo
  const { t, i18n } = useTranslation();

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";//todo
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  return (
    <div style={{background: backgroundColor}}>
      <Nav color={"primary"} />
      <div className="mx-2 flex justify-center items-center flex-col mt-8" style={{background: backgroundColor}}>
        <div className="flex"  style={{background: backgroundColor}}>
          <div className="w-1/4 text-center bg-gray-100 p-4 rounded-l-2xl" style={{background: backgroundColor}}>
            <h1 className="mb-4 text-xl font-bold pb-2 text-gray-600" style={{background: backgroundColor}}> 
            {t('homePage.recent')}
            </h1>
          </div>
          <div className="w-3/4" style={{background: backgroundColor}}>
            <CardCarousel allProducts={newProducts} />
          </div>
        </div>
        <div className="mt-8" style={{background: backgroundColor}}>
          <CardHomeList allProducts={newProducts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;