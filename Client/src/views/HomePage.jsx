import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getNewProducts } from "../Redux/Actions/Actions";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";
import Categories from "../components/Categories/Categories";

const HomePage = () => {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.newProducts);

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <div className="mx-2 md:mx-80">
      
      <Categories/>
      <h1 className="mb-7 mt-2 ml-3 text-xl font-bold pb-2 text-gray-400 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
        Recent products
      </h1>
      <CardHomeList allProducts={newProducts} />
    </div>
    </div>
    
  );
};

export default HomePage;
