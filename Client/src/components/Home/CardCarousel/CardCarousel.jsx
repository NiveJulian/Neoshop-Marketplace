import { useState, useEffect } from "react";
import { CardWide } from "./CardWide";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CardCarousel = ({ allProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#3f3f3f" : "#b3b3b3";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const { t, i18n } = useTranslation();

  const totalProducts = allProducts.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProducts);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalProducts]);
  return (
    <div className="flex flex-col items-center bg-gray-300 relative overflow-hidden w-full p-8 pb-16 pl-40 pr-40 shadow-2xl"
    style={{background: backgroundColor, borderColor: bordesPlomos}}>      
      <div className="text-center text-2xl text-white font-bold mb-4">
        {t("homePage.recent")}      
      </div>
      <div className="flex justify-center w-full">
      {allProducts?.map((product, index) => (
        <div
        key={product.id_product}
        className={`w-1/2 flex-shrink-0 transform transition-transform duration-1000 ease-in-out ${
          index === (currentIndex - 1 < 0 ? totalProducts - 1 : currentIndex - 1) ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ display: index === (currentIndex - 1 < 0 ? totalProducts - 1 : currentIndex - 1) ? "block" : "none" }}
      >
          <CardWide
            id_product={product.id_product}
            name={product.name}
            id_store={product.storeIdStore}
            img_product={product.img_product[0]}
            description={product.description}
            date_creation={product.date_creation}
            quantity={product.quantity}
            price={product.price}
          />
        </div>
      ))}      
      {allProducts?.map((product, index) => (
        <div
          key={product.id_product}
          className={`w-1/2 flex-shrink-0 ml-16 mr-16 transform transition-transform duration-1000 ease-in-out ${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ display: index === currentIndex ? "block" : "none", }}
        >
          <CardWide
            id_product={product.id_product}
            name={product.name}
            id_store={product.storeIdStore}
            img_product={product.img_product[0]}
            description={product.description}
            date_creation={product.date_creation}
            quantity={product.quantity}
            price={product.price}
          />
        </div>
      ))}
      {allProducts?.map((product, index) => (
        <div
        key={product.id_product}
        className={`w-1/2 flex-shrink-0 transform transition-transform duration-1000 ease-in-out ${
          index === (currentIndex + 1 >= totalProducts ? 0 : currentIndex + 1) ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ display: index === (currentIndex + 1 >= totalProducts ? 0 : currentIndex + 1) ? "block" : "none" }}
      >
          <CardWide
            id_product={product.id_product}
            name={product.name}
            id_store={product.storeIdStore}
            img_product={product.img_product[0]}
            description={product.description}
            date_creation={product.date_creation}
            quantity={product.quantity}
            price={product.price}
          />
        </div>
      ))}
      </div>
      
    </div>
  );
};

export default CardCarousel;