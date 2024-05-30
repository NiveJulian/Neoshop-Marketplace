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
      <h1 className="mb-7 text-4xl font-bold pb-2 text-details hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
        Recent products
      </h1>
      <CardHomeList allProducts={allProducts} />
    </div>
  );
};

export default HomePage;
