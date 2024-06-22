import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";
import CardCarousel from "../components/Home/CardCarousel/CardCarousel";
import { getNewProducts } from "../Redux/Actions/productActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.product.newProducts);

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);
  return (
    <div>
      <Nav color={"primary"} />
      <div className="flex">
          <div className="w-full">
            <CardCarousel allProducts={newProducts} />
          </div>
        </div>
      <div className="mx-2 flex justify-center items-center flex-col mt-8">        
        <div className="mt-8 mb-16">
          <div className="font-bold text-2xl">
            All recent products
          </div>
          <CardHomeList allProducts={newProducts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
