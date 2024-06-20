import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./StoreDetail.css";

import Nav from "../components/Nav/Nav";
import { useParams } from "react-router-dom";
import ListCardProductByStore from "../components/ProductByStore/ListCardProductByStore.jsx";
import { getSellerById } from "../Redux/Actions/storeActions.js";
import { getProductByStore } from "../Redux/Actions/productActions.js";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const newProducts = useSelector((state) => state.newProducts);
  const productsByStore = useSelector((state) => state.product.productsByStore);
  const seller = useSelector((state) => state.store.seller);

  useEffect(() => {
    dispatch(getSellerById(id));

    dispatch(getProductByStore(id));
  }, [dispatch, id]);

  // const formatVentasText = (ventas) => {
  //   return ventas >= 10000 ? "más de 10 mil ventas" : `${ventas} ventas`;
  // };

  return (
    <div>
      <Nav />
      <div className="detail-container">
        <div className="detail-content">
          <div className="seller-container">
            <img
              className="seller-image w-32 h-32 rounded-full object-fill border border-gray-300 shadow-lg"
              src={seller?.logo ? seller?.logo : "neoshoplogo.jpeg"}
              alt={`Imagen del vendedor ${seller.name}`}
            />
            <div className="seller-stats">
              <p className="seller-name">{seller.name}</p>
              <p className="seller-stats-text"></p>
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
            <ListCardProductByStore productByStore={productsByStore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
