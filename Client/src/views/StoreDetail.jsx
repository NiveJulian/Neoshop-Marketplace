import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNewProducts } from "../Redux/Actions/Actions.js";
import { CardHomeList } from "../components/Home/CardHomeList/CardHomeList.jsx";
import "./StoreDetail.css";

import Nav from "../components/Nav/Nav";
import Sidebar from "../components/SideBar/SideBar.jsx";

const seller = {
    name: "MotoMoto",
    image: "https://lojarcell.vteximg.com.br/arquivos/ids/162373/banner-marcas-motorola-mobile-min.png?v=637493652503570000",
    ventas: 11000,
    average_mark: 4.5,
    adress_cp: "1653",
    adress_country: "Argentina",
    adress_city: "Buenos Aires",
    date_creation: "10 / 02 / 2024",
    quantity_review: 3000,
  };

const StoreDetail = () => {
    const dispatch = useDispatch();
    const newProducts = useSelector((state) => state.newProducts);
  
    useEffect(() => {
      dispatch(getNewProducts());
    }, [dispatch]);

    const formatVentasText = (ventas) => {
        return ventas >= 10000 ? 'más de 10 mil ventas' : `${ventas} ventas`;
      };

    return ( 
        <div>
        <Nav/>
        <Sidebar />
        <div className='detail-container'>
            
            <div className='detail-content'>
                <div className='seller-container'>
                    <img className='seller-image' src={seller.image} alt={`Imagen del vendedor ${seller.name}`} />                   
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
                <CardHomeList allProducts={newProducts} />
                </div>                          
            </div>
        </div>
        </div>
        
    )
    };
    
    export default StoreDetail;