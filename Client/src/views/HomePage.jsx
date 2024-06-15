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
      <div className="mx-2 flex justify-center items-center flex-col mt-8">
        <div className="flex">
          <div className="w-1/4 text-center bg-gray-100 p-4 rounded-l-2xl">
            <h1 className="mb-4 text-xl font-bold pb-2 text-gray-600">
              Recent products
            </h1>
          </div>
          <div className="w-3/4">
            <CardCarousel allProducts={newProducts} />
          </div>
        </div>
        <div className="mt-8">
          <CardHomeList allProducts={newProducts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
