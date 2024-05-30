import { useSelector } from "react-redux";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList";
import Nav from "../components/Nav/Nav";

const HomePage = () => {
  const allProducts = useSelector((state) => state.allProducts);

  

  return (
    <div>
      <Nav />
      <div className="mt-8">
        <CardHomeList allProducts={allProducts} />
      </div>
    </div>
  );
};

export default HomePage;
