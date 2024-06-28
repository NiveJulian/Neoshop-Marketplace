import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
};

export const ProductCard = ({
  id,
  name,
  img_product = [],
  date_creation,
  price,
  quantity,
  available,
  average_mark,
  status,
  id_review,
  id_discounts,
  id_store,
  onAddToCart,
}) => {
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();

  const neutralColor = theme === "dark" ? "#2F2F2F" : "#FFFFFF";
  const blueColor = theme === "dark" ? "#0069AA" : "#3B82F6";
  const textColorButton = theme === "dark" ? "#b4b4b4" : "#FFFFFF";
  const textColor = theme === "dark" ? "#d1d1d1" : "#292929";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "orange",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
        }}
      ></div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <ul style={{ margin: 0, padding: 0, display: "flex" }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <article className="w-64 h-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 mb-6"
    style={{ backgroundColor: neutralColor }}

    >
      <a href={`/product/${id}`}>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          {img_product.length > 1 ? (
            <Slider {...settings} className="w-64 h-64">
              {img_product.map((logo, index) => (
                <div key={index}>
                  <img src={logo} alt={name} className="w-64 h-64 object-cover" />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={img_product[0] ? img_product[0] : "neoshoplogo.jpeg"}
              alt={name}
              className="w-64 h-64 object-cover"
            />
          )}
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-slate-400">{average_mark}</span>
          </div>
        </div>
      </a>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700" style={{ color: textColor  }}>{name}</h2>
          <p className="mt-1 text-sm text-slate-400">{date_creation}</p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-lg font-bold text-blue-500" style={{ color: blueColor}}>${price}</p>

            <div onClick={() => onAddToCart()} className="flex cursor-pointer items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
              style={{ background:blueColor }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              <button className="text-sm" color={textColorButton}>{t("addToCart")}</button>
            </div>
          </div>
        </div>
    </article>
  );
};