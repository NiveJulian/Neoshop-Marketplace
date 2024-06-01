import { useDispatch, useSelector } from "react-redux";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList.jsx";
import "./StoreDetail.css";

import Nav from "../components/Nav/Nav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSellerById } from "../Redux/Actions/Actions.js";
// import Filter from "../components/Filter/Filter";

const StoreDetail = () => {
    const allProducts = useSelector((state) => state.allProducts);
    const {id} = useParams()
    const dispatch = useDispatch()
    const seller = useSelector(state => state.seller)

    useEffect(() => {
      dispatch(getSellerById(Number(id)))
    }, [dispatch, id])
    

    const formatVentasText = (ventas) => {
        return ventas >= 10000 ? 'más de 10 mil ventas' : `${ventas} ventas`;
      };

    return ( 
        <div>
        <Nav/>
        <div className='detail-container'>
            <div className='detail-content'>
                <div className='seller-container'>
                    <img className='seller-image' src={seller.logo} alt={`Imagen del vendedor ${seller.name}`} />                   
                    <div className='seller-stats'>
                        <p className='seller-name'>{seller.name}</p>
                        <p className='seller-stats-text'>{formatVentasText(seller.ventas)}</p>
                        <p className='seller-stats-text'>reputación: {seller.average_mark} / 5</p>
                    </div>
                    <div className="seller-info">
                        <p>Vendiendo desde: {seller.date_creation}</p>
                        <p>{seller.adress_city}, {seller.adress_country}</p>
                        <p>{seller.quantity_review} reviews totales</p>
                    </div>
                </div>
                <div className="banner">
                    Products
                </div>
                <div className="mt-8">
                <CardHomeList allProducts={allProducts} />
                </div>                          
            </div>
        </div>
        </div>
        
    )
    };
    
    export default StoreDetail;