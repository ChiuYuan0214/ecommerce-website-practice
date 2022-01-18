import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../../../store/cart';

import styles from "./SearchItem.module.css";

const SearchItem = ({ prod, index }) => {
  const { id, title, imageUrl, price, discount } = prod;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let discountDesc = null;
  if (discount) {
    const sales = `${Math.round((1 - discount) * 100)}% off now`;
    discountDesc = <p className={styles.onSale}>{sales}</p>;
  }

  const BuyingHandler = () => {
    dispatch(cartActions.addItem({id, amount: 1}));
    dispatch(cartActions.toggleCart());
  };

  return (
    <li
      id={id}
      className={styles.bar}
      style={{ animationDuration: `${0.3 + index * 1}s` }}
    >
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <div className={styles.flex}>
        <div className={styles.priceBlock}>
          {discountDesc}
          <p className={styles.price}>{`NT$ ${price}`}</p>
        </div>
        <div className={styles.actions}>
          <button onClick={() => navigate(`/${id}`)}>Detail</button>
          <button onClick={BuyingHandler}>Buy</button>
        </div>
      </div>
    </li>
  );
};

export default SearchItem;
