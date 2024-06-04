import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../Redux/Actions/Actions";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";

const HomePage = () => {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.newProducts);

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);
  console.log(newProducts);

  return (
    <div>
      <Nav color={"primary"} />

      <h1 className="mb-7 mt-2 ml-3 text-xl font-bold pb-2 text-gray-400 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
        Recent products
      </h1>
      <div className="ml-20 mr-20">
        <CardHomeList allProducts={newProducts} />
      </div>
    </div>
  );
};

export default HomePage;
