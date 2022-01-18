import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";

import styles from "./FavoriteItem.module.css";

const FavoriteItem = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prod = useSelector((state) => state.prod.items).find(
    (item) => item.id === id
  );
  const { title, imageUrl, price, discount } = prod;

  const priceClass = `${styles.price} ${discount && styles.onSale}`;
  let discountDesc = null;
  if (discount) {
    discountDesc = `${Math.round((1 - discount) * 100)}% OFF`;
  }

  return (
    <li className={styles.item}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <div className={styles.priceBox}>
        {discount && <p className={styles.discount}>{discountDesc}</p>}
        <p className={priceClass}>NT$ {price}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => navigate(`/${id}`)}>Detail</button>
        <button onClick={() => dispatch(authActions.toggleFavorite(id))}>
          Unlike
        </button>
      </div>
    </li>
  );
};

export default FavoriteItem;
