import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getNewProducts } from "../Redux/Actions/Actions";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";

const HomePage = () => {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.newProducts);

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  return (
    <div className="text-center gap-4">
      <div className="flex m-3 shadow-sm">
        <Nav />
      </div>
      <h1 className="mb-7 text-4xl font-bold pb-2 text-details hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
        Recent products
      </h1>
      <CardHomeList allProducts={newProducts} />
    </div>
  );
};

export default HomePage;
