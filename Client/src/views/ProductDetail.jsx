import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetail.css";
import Nav from "../components/Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProductById } from "../Redux/Actions/productActions";
import { getSellerById } from "../Redux/Actions/storeActions";
import { addToCart } from "../Redux/Actions/cartActions";
import { addToFavorites } from "../Redux/Actions/favoritesActions";

const reviews = [
  'Marcos: "Me encantó" 5 / 5',
  'Juan: "Muy buen producto" 4 / 5',
  'Candela: "Es casi perfecto!" 4.5 / 5',
  'María: "Excelente!" 5 / 5',
];

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [customQuantity, setCustomQuantity] = useState("");
  // const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const seller = useSelector((state) => state.store.seller);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    dispatch(getProductById(id));
    dispatch(getSellerById(product.storeIdStore));

    return () => clearInterval(interval);
  }, [dispatch, id, product.storeIdStore]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.img_product?.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = (product) => {
    toast.success("Add to cart")
    dispatch(addToCart(product))
  }

  const handleAddToFavorites = (product) => {
    toast.success("Add to favorites")
    dispatch(addToFavorites(product))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.img_product?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const formatVentasText = (ventas) => {
    return ventas >= 10000 ? "más de 10 mil ventas" : `${ventas} ventas`;
  };

  return (
    <div>
      <Nav color={"primary"}/>
      <div className="detail-container">
        <div className="detail-cont">
          <div>
            <div className="image-container">
              {product?.img_product?.length > 1 && (
                <button className="mr-2" onClick={handlePrevImage}>
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  class="size-6"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              )}
              <img
                src={
                  product?.img_product
                    ? product?.img_product[currentImageIndex]
                    : "neoshoplogo.jpeg"
                }
                alt={`Product Image ${currentImageIndex + 1}`}
              />
              {product?.img_product?.length > 1 && (
                <button className="ml-2" onClick={handleNextImage}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="size-6"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              )}
            </div>
            <div className="thumbnail-container">
              {product?.img_product?.length > 0 ? (
                product?.img_product?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail border border-gray-300 ${
                      currentImageIndex === index ? "selected" : ""
                    } `}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))
              ) : (
                <img
                className="w-24 h-auto object-cover border border-gray-300"
                  src={
                    product?.img_product
                      ? product?.img_product
                      : "neoshoplogo.jpeg"
                  }
                  alt={`Product Image ${currentImageIndex + 1}`}
                />
              )}
            </div>
            <div className="description-container">
              <p className="product-description">{product.description}</p>
              <ul className="specifications-list">
                <p className="spec-title">Characterístics</p>
                {/* {Object.entries(product.specifics).map(([key, value]) => (
                  <li key={key}>
                    <span className="spec-name">{key}:</span>{" "}
                    <span className="spec-value">{value}</span>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>

          <div className="info-container">
            <p className="product-date">Published: {product?.date_creation}</p>
            <h1 className="product-name">{product?.name}</h1>
            <p className="brand">Category: {product?.category}</p>
            <div className="content-flex">
              <p className="product-average-mark">
                {product?.average_mark} / 5
              </p>
              <p className="product-status">{product?.status}</p>
              <p
                className={`product-availability ${
                  product?.available ? "available" : "not-available"
                }`}
              >
                {product?.available ? "Disponible" : "No disponible"}
              </p>
            </div>
            <p className="product-price">${product?.price}</p>
            <div className="product-quantity">
              <label htmlFor="quantity-select">quantity: </label>
              <select
                id="quantity-select"
                value={selectedQuantity}
                onChange={handleQuantityChange}
              >
                {[...Array(product?.quantity).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="total-available">
                ({product?.quantity} available)
              </span>
            </div>
            <div className="flex m-2">
              <button onClick={() => handleAddToCart(product)} className="buy-button">Add to cart</button>
              <button onClick={() => handleAddToFavorites(product)} className="fav-button">
              <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="size-6"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>            
            <p className="brand">Seller:</p>
            <div className="seller-cont">
              <img
                className="seller-image"
                src={seller.logo}
                alt={`Imagen del vendedor ${seller.name}`}
              />
              <p className="sellers-name">{seller.name}</p>
              <div className="sellers-stats">
                <p className="sellers-stats-text">
                  {formatVentasText(seller.ventas)}
                </p>
                <p className="sellers-stats-text">
                  Scrore: {seller.average_mark} / 5
                </p>
              </div>
              <Link
                to={`/store/${product.storeIdStore}`}
                className="seller-button"
              >
                Go to Store
              </Link>
            </div>
            <div className="review-container">
              <p className="review-text">{reviews[currentReviewIndex]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
