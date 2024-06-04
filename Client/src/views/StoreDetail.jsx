import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNewProducts, getSellerById } from "../Redux/Actions/Actions.js";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList.jsx";
import "./StoreDetail.css";

import Nav from "../components/Nav/Nav";
import { useParams } from "react-router-dom";
// import Categories from "../components/Categories/Categories.jsx";


const StoreDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const newProducts = useSelector((state) => state.newProducts);
  const seller = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getSellerById(id));
    dispatch(getNewProducts());
  }, [dispatch, id]);

  return (
    <div>
      <Nav />
      <div className="detail-container">
        <div className="detail-content">
          <div className="seller-container">
            <img
              className="seller-image"
              src={seller?.logo ? seller?.logo : 'neoshoplogo.jpeg' }
              alt={`Imagen del vendedor ${seller.name}`}
            />
            <div className="seller-stats">
              <p className="seller-name">{seller.name}</p>
              <p className="seller-stats-text">
              </p>
              <p className="seller-stats-text">
                reputación: {seller.average_mark} / 5
              </p>
            </div>
            <div className="seller-info">
              <p>Vendiendo desde: {seller.date_creation}</p>
              <p>
                {seller.adress_city}, {seller.adress_country}
              </p>
              <p>{seller.quantity_review} reviews totales</p>
            </div>
          </div>
          {/* <Categories/> */}
          <div className="banner">Products</div>
          <div className="mt-8">
            <CardHomeList allProducts={newProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
