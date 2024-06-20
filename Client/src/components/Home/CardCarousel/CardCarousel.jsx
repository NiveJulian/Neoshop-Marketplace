import { useState, useEffect } from "react";
import { CardWide } from "./CardWide";
import { useSelector } from "react-redux";

const CardCarousel = ({ allProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
  const textColorH1 = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allProducts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [allProducts.length]);

  return (
    <div className="relative overflow-hidden w-full" >
      {allProducts?.map((product, index) => (
        <div
          key={product.id_product}
          className={`transition-transform duration-1000 ease-in-out transform ${
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
    </div>
  );
};

export default CardCarousel;