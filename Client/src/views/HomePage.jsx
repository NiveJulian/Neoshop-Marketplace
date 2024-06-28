import { useEffect } from "react";
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
  // const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);
  return (
    <div style={{background: backgroundColor}} className="bg-gray-100">
      <Nav color={"primary"} />
      <div className="flex">
          <div className="w-full">
            <CardCarousel allProducts={newProducts} />
          </div>
        </div>
      <div className="mx-2 flex justify-center items-center flex-col mt-8">        
        <div className="mt-8 mb-16">
          <div className="font-bold text-2xl" style={{color: textColor}}>
            {t("homePage.allRecent")}
          </div>
          <CardHomeList allProducts={newProducts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;