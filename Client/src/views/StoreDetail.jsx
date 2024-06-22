import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useEffect } from "react";
import "./StoreDetail.css";

import Nav from "../components/Nav/Nav";
import { useParams } from "react-router-dom";
import ListCardProductByStore from "../components/ProductByStore/ListCardProductByStore.jsx";
import { getSellerById } from "../Redux/Actions/storeActions.js";
import { getProductByStore } from "../Redux/Actions/productActions.js";
import { getSellerById } from "../Redux/Actions/storeActions.js";
import { getProductByStore } from "../Redux/Actions/productActions.js";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const newProducts = useSelector((state) => state.newProducts);
  const productsByStore = useSelector((state) => state.product.productsByStore);
  const seller = useSelector((state) => state.store.seller);
  const theme = useSelector((state) => state.themes.theme);//todo

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";//todo
  const cartBackGround = theme === "dark" ? "#212121" : "#FFFFFF";
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const orangeIntense = theme === "dark" ? "#D67C32" : "#FF8200";

  useEffect(() => {
    dispatch(getSellerById(id));

    dispatch(getProductByStore(id));

    dispatch(getProductByStore(id));
  }, [dispatch, id]);

  // const formatVentasText = (ventas) => {
  //   return ventas >= 10000 ? "más de 10 mil ventas" : `${ventas} ventas`;
  // };

  return (
    <div style={{ background: backgroundColor}}>
      <Nav />
      <div className="detail-container"style={{ background: backgroundColor, borderColor: bordesPlomos }}>
        <div className="detail-content" >
          <div className="seller-container" style={{borderColor: bordesPlomos }}>
            <img
              className="seller-image w-32 h-32 rounded-full object-fill border border-gray-300 shadow-lg"
              style={{borderColor: bordesPlomos }}
              src={seller?.logo ? seller?.logo : "neoshoplogo.jpeg"}
              alt={`Imagen del vendedor ${seller.name}`}
            />
            <div className="seller-stats">
              <p className="seller-name" style={{ color: textColor }}>{seller.name}</p>
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
          <div className="banner" style={{ background: orangeIntense}}>Products</div>
          <div className="mt-8">
            <ListCardProductByStore productByStore={productsByStore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
