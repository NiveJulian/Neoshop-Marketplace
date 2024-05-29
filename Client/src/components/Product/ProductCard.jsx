import { Link } from "react-router-dom";
import style from './ProductCard.module.css'; // Asegúrate de que este archivo CSS exista y esté correcto

export default function ProductCard({ id_product, name, img_product, description, date_creation,
   price, quantity, available, average_mark, status, id_review, id_discounts, id_store }) {
  return (
    <div className={style.tarjeta}>
      <Link to={`/product/${id_product}`}><h2 className={style.nameSobreImagen}>{name}</h2></Link>
      <img className={style.imagen_borde} src={img_product} alt="" />
      <h2>{description}</h2>
      <h2>{date_creation}</h2>
      <h2>{price}</h2>
      <h2>{quantity}</h2>
      <h2>{available}</h2>
      <h2>{average_mark}</h2>
      <h2>{status}</h2>
      <h2>{id_review}</h2>
      <h2>{id_discounts}</h2>
      <h2>{id_store}</h2>
    </div>
  );
}