import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./StoreDetail.css";
import Nav from "../components/Nav/Nav";
import { useParams } from "react-router-dom";
import ListCardProductByStore from "../components/ProductByStore/ListCardProductByStore.jsx";
import { getSellerById } from "../Redux/Actions/storeActions.js";
import { getProductByStore } from "../Redux/Actions/productActions.js";
import { useTranslation } from "react-i18next";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const newProducts = useSelector((state) => state.newProducts);
  const productsByStore = useSelector((state) => state.product.productsByStore);
  const seller = useSelector((state) => state.store.seller);
  const theme = useSelector((state) => state.themes.theme);//todo
  const { t, i18n } = useTranslation();

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  // const cartBackGround = theme === "dark" ? "#212121" : "#FFFFFF";
  // const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const orangeIntense = theme === "dark" ? "#D67C32" : "#FF8200";

  useEffect(() => {
    dispatch(getSellerById(id));

    dispatch(getProductByStore(id));
  }, [dispatch, id]);

  return (
    <div style={{ background: backgroundColor }}>
      <Nav />
      <div
        className="detail-container"
        style={{ background: backgroundColor, borderColor: bordesPlomos }}
      >
        <div className="detail-content">
          <div
            className="seller-container"
            style={{ borderColor: bordesPlomos }}
          >
            <img
              className="seller-image w-32 h-32 rounded-full object-fill border border-gray-300 shadow-lg"
              style={{ borderColor: bordesPlomos }}
              src={seller?.logo ? seller?.logo : "neoshoplogo.jpeg"}
              alt={`Imagen del vendedor ${seller.name}`}
            />
            <div className="seller-stats">
              <p className="seller-name" style={{ color: textColor }}>
                {seller.name}
              </p>
              <p className="seller-stats-text"></p>
              <p className="seller-stats-text">
              {t('storeDetail.reputation')}
               {seller.average_mark} / 5
              </p>
            </div>
            <div className="seller-info">
              <p>{t('storeDetail.since')} {seller.date_creation}</p>
              <p>
                {seller.adress_city}, {seller.adress_country}
              </p>
              <p>{seller.quantity_review} {t('storeDetail.totalReviews')}</p>
            </div>
          </div>
          {/* <Categories/> */}
          <div className="banner" style={{ background: orangeIntense}}>{t('storeDetail.products')}</div>
          <div className="mt-8">
            <ListCardProductByStore productByStore={productsByStore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
