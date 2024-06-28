import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const HistoryCard = ({
    brand,
    name,
    price,
    img_product,
    id_product,
    quantity,
}) => {
    const theme = useSelector((state) => state.themes.theme);

    const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
    const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
    const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  
    return (
        <div className="space-y-4 mb-4" >
            <Link to={`/product/${id_product}`}>
            <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary" style={{ background: backgroundColor, borderColor: bordesPlomos}}>
                <div className="flex items-center">
                <div className="flex">
                    <img
                    src={img_product}
                    className="rounded-full border border-gray-400 p-2 w-28 h-28 mr-5"
                    />
                    <div>
                        <div className="flex mb-4">
                        <p className="text-2xl font-bold text-lg" style={{ color: textColor}}>{brand}</p>
                        <p className="text-2xl font-bold text-lg" style={{ color: textColor}}>{name}</p>
                        </div>    
                    <p className="text-2xl text-lg" style={{ color: textColor}}>Price: ${price}</p>
                    <p className="text-2xl text-lg" style={{ color: textColor}}>Quantity: {quantity}</p>
                    </div>                   
                </div>
                </div>
            </div>
            </Link>   
        </div>
    )

}