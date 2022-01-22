import { useSelector } from 'react-redux';

import styles from './HistoryItem.module.css';

const HistoryItem = ({item, index}) => {
    const {id, amount, discount} = item;
    const product = useSelector(state => state.prod.items).find(prod => prod.id === id);
    const {imageUrl, title, price} = product;
    let discountDesc = null;
    if (discount) {
      discountDesc = Math.round((1 - discount) * 100) + "% OFF";
    }

    return (
      <li
        id={id}
        className={styles.bar}
        style={{ animationDuration: `${0.3 + index * 1}s` }}
      >
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <div className={styles.flex}>
          <p className={styles.discount}>{discountDesc}</p>
          <p className={styles.amount}>X {amount}</p>
          <p className={styles.price}>{`NT$ ${price}`}</p>
        </div>
      </li>
    );
};

export default HistoryItem;