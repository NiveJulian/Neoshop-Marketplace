import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/Actions/Actions";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";

const HomePage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <CardHomeList allProducts={allProducts} />
    </div>
  );
};

export default HomePage;
