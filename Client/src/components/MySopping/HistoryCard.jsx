import { Link } from "react-router-dom";
export const HistoryCard = ({
    brand,
    name,
    price,
    img_product,
    id_product,
    quantity,
}) => {

    return (
        <div className="space-y-4 mb-4">
            <Link to={`/product/${id_product}`}>
            <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
                <div className="flex items-center">
                <div className="flex">
                    <img
                    src={img_product}
                    className="rounded-full border border-gray-400 p-2 w-28 h-28 mr-5"
                    />
                    <div>
                        <div className="flex mb-4">
                        <p className="text-2xl font-bold text-lg">{brand}</p>
                        <p className="text-2xl font-bold text-lg">{name}</p>
                        </div>    
                    <p className="text-2xl text-lg">Price: ${price}</p>
                    <p className="text-2xl text-lg">Quantity: {quantity}</p>
                    </div>                   
                </div>
                </div>
            </div>
            </Link>   
        </div>
    )

}