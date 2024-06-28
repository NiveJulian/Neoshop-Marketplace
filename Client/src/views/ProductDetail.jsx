import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetail.css";
import Nav from "../components/Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProductById } from "../Redux/Actions/productActions";
import { getSellerById } from "../Redux/Actions/storeActions";
import { addToCart } from "../Redux/Actions/cartActions";
import { getPaymentsByUserId } from "../Redux/Actions/reviewActions";
import { sendReview } from "../Redux/Actions/reviewActions";
import { useTranslation } from "react-i18next";

function betterAverageMark(average_mark) {
  const formattedNumber = average_mark.toFixed(1);
  return parseFloat(formattedNumber);
}
//Esta funcion verifica que el usuario haya comprado el producto anteriormente
function hasUserPurchasedProduct(payments, productId) {
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    for (let j = 0; j < payment.paymentProducts.length; j++) {
      const product = payment.paymentProducts[j];
      if (product.id_product === productId) {
        return true;
      }
    }
  }
  return false;
}

//Esta funcion devuelve fechas del back en un mejor formato
function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0, así que sumamos 1
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`; // Formatear la fecha como "YYYY/MM/DD"
  return formattedDate;
}

// Componente para sacar el promedio de estrellas de los usuarios
const StarRating = ({ rating, color = "#ffc107" }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} style={{ color: color }}>
          &#9733;
        </span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span
          key={index + fullStars + (halfStar ? 1 : 0)}
          style={{ color: "#ccc" }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const seller = useSelector((state) => state.store.seller);
  const user = useSelector((state) => state.auth.user);
  const payments = useSelector((state) => state.reviews.allPayments) || [];
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });
  const theme = useSelector((state) => state.themes.theme);//todo
  const { t, i18n } = useTranslation();

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";//todo
  const cartBackGround = theme === "dark" ? "#212121" : "#FFFFFF";
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const naranjaClaro = theme === "dark" ? "#FFDCDC" : "#FFDCDC";

  

  // En useEffect de ProductDetail
  useEffect(() => {
    // Lógica para obtener datos del producto, vendedor, etc.
    dispatch(getProductById(id));
    dispatch(getSellerById(product.storeIdStore));
    dispatch(getPaymentsByUserId(user.id_user));
  }, [dispatch, id, product.storeIdStore, user.id_user]);

  // Función para manejar el cambio dinámico de altura del textarea
  const handleTextareaChange = (e) => {
    const textareaLineHeight = 24;
    const minRows = 1;
    e.target.rows = minRows;
    const currentRows = Math.ceil(e.target.scrollHeight / textareaLineHeight);
    e.target.style.height = `${currentRows * textareaLineHeight}px`;
    setNewReview({ ...newReview, text: e.target.value });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = (product) => {
    toast.success(t("toast.cartTrue"));
    dispatch(addToCart(product,t));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const formatVentasText = (ventas) => {
    return ventas >= 10000 ? "more than 10 thousand sales" : `${ventas} sales`;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewText = newReview.text.trim();
    if (!reviewText) {
      toast.error(t("toast.empty")); // Validación de texto de reseña no vacío
      return;
    }
    if (reviewText.length > 500) {
      toast.error(t("toast.tooLong")); // Validación de longitud máxima del texto
      return;
    }
    const suspiciousPattern = /[<*-+)({}|><^%$#@)>]/; // Validación de caracteres sospechosos utilizando una expresión regular
    if (suspiciousPattern.test(reviewText)) {
      toast.error(t("toast.ilegal"));
      return;
    }
    if (newReview.rating < 1 || newReview.rating > 5) {
      // Validación de rating en el rango válido (1 a 5)
      toast.error(t("toast.rating"));
      return;
    }
    const reviewInfo = {
      rating: newReview.rating,
      comment: newReview.text,
      id_user: user.id_user,
      id_product: id,
    };
    try {
      dispatch(sendReview(reviewInfo));
      toast.loading(t("toast.waiting"));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(t("toast.reviewFalse"));
    }
    e.target.previousElementSibling.value = ""; // Limpiar el textarea y resetear la calificación después del envío
    e.target.previousElementSibling.style.height = "auto";
    setNewReview({ text: "", rating: 0 });
    toast.success(t("toast.reviewTrue"));
  };
  
  return (
    <div style={{ background: backgroundColor}}>
      <Nav color={"primary"} />
      {/* <div className="detail-container"> */}
      <div className="detail-container" style={{ background: cartBackGround, border: "none" }}>
      <div className="detail-cont">
          <div>
            <div className="image-container">
              {product.img_product > 1 && (
                <button onClick={handlePrevImage}>&lt;</button>
              )}
              <img
                src={
                  product?.img_product
                    ? product?.img_product
                    : "neoshoplogo.jpeg"
                }
                alt={`Product Image ${currentImageIndex + 1}`}
              />
              {product.img_product > 1 && (
                <button onClick={handleNextImage}>&gt;</button>
              )}
            </div>
            <div className="thumbnail-container" style={{ borderColor: bordesPlomos }}>
              {product.length > 0 ? (
                product.images.map((image, index) => (
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
            <div className="description-container" >
              <p className="product-description"  style={{ color: textColor}}>{product.description}</p>
              <ul className="specifications-list" style={{ borderColor: bordesPlomos }}>
                <p className="spec-title" style={{ color: textColor, borderColor: bordesPlomos}}>{t('productDetail.characteristics')}</p>
                {/* {Object.entries(product.specifics).map(([key, value]) => (
                  <li key={key}>
                    <span className="spec-name">{key}:</span>{" "}
                    <span className="spec-value">{value}</span>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>

          <div className="info-container" style={{ borderColor: bordesPlomos}}>
            <p className="product-date" style={{ color: textColor}}>
            {t('productDetail.published')}: {product ? formatDate(product.date_creation) : null}
            </p>
            <h1 className="product-name" style={{ color: textColor}}>{product?.name}</h1>
            <p className="brand" >{t('productDetail.category')}: {product?.category}</p>
            <div className="content-flex">
              <p className="product-average-mark" style={{ color: textColor }}>
                {product.average_mark
                  ? betterAverageMark(product.average_mark)
                  : null}{" "}
                / 5
              </p>
              <p className="product-status">{product?.status}</p>
              <p
                className={`product-availability ${
                  product?.available ? "available" : "not-available"
                }`}
              >
                {product?.available ? "Available" : "Not available"}
              </p>
            </div>
            <p className="product-price" style={{ color: textColor}}>${product?.price}</p>
            <div className="product-quantity">
              <label htmlFor="quantity-select" style={{ color: textColor}}>{t('productDetail.quantity')}: </label>
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
                ({product?.quantity} {t('productDetail.avaliable')})
              </span>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="buy-button"
            >
              {t('productDetail.addToCart')}
            </button>
            <p className="brand">{t('productDetail.seller')}:</p>
            <div className="seller-cont"style={{ borderColor: bordesPlomos}} >
              <img
                className="seller-image"
                src={seller.logo}
                alt={`Imagen del vendedor ${seller.name}`
              
              }
              />
              <p className="sellers-name" style={{ color: textColor}}>{seller.name}</p>
              <div className="sellers-stats">
                <p className="sellers-stats-text">
                  {formatVentasText(seller.ventas)}
                </p>
                <p className="sellers-stats-text">
                {t('productDetail.score')}: {seller.average_mark} / 5
                </p>
              </div>
              {/* <Link
                to={`/store/${product.storeIdStore}`}
                className="seller-button"
              > */}
              <Link
                to={`/store/${product.storeIdStore}`}
                className={
                  theme === "dark"
                    ? "seller-button seller-button-dark"
                    : "seller-button"
                }            
              >
                {t('productDetail.goStore')}
              </Link>
            </div>
            <div className="review-container" style={{ background: backgroundColor, borderColor: bordesPlomos}}>
              <p className="spec-title" style={{ color: textColor, borderColor: bordesPlomos}}>{t('productDetail.reviews')}</p>
              <div className="review-overflow">
                {hasUserPurchasedProduct(payments, id) ? (
                  <div className="write-review-box" style={{ background: backgroundColor}}>
                    <textarea
                    
                      className="review-textarea"
                      value={newReview.text}
                      onChange={handleTextareaChange}
                      placeholder={t('productDetail.placeHolderReviews')}
                      rows={1}
                      style={{ minHeight: "50px" }}
                    />
                    <div className="star-rating-container">
                      <p className="star-rating-title" style={{ color: textColor}}>{t('productDetail.qualification')}:</p>
                      <div className="star-rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= newReview.rating
                                ? "star selected"
                                : "star"
                            }
                            onClick={() =>
                              setNewReview({ ...newReview, rating: star })
                            }
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      className="submit-review-button"
                      onClick={handleReviewSubmit}
                    >
                      {t('productDetail.submitReview')}
                    </button>
                  </div>
                ) : null}
                <div className="reviews-users">
                  <div className="reviews-users">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <div key={index} className="review-item">
                          <div className="review-item-top">
                            <p className="review-author" style={{ color: textColor}}>{review.user.name}</p>
                            <StarRating
                              rating={review.rating}
                              color="#ffc107"
                            />{" "}
                          </div>
                          <p className="review-date" style={{ color: textColor}}>
                          {t('productDetail.reviewdOn')} {formatDate(review.date)}
                          </p>
                          <p className="review-text" style={{ color: textColor}}>"{review.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: textColor}}>{t('productDetail.noReviews')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
