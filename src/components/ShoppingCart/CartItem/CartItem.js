import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CartItem.module.css";

const CartItem = React.memo(
  ({
    imageUrl,
    title,
    price,
    discount,
    id,
    amount,
    addItem,
    removeItem,
    toggleCart,
  }) => {
    const navigate = useNavigate();
    const totalPrice = amount * price * (discount ? discount : 1);

    const checkDetailHandler = () => {
      navigate(`/${id}`);
      toggleCart();
    };

    return (
      <li className={styles.item}>
        <img src={imageUrl} alt={title} />
        <div className={styles.info}>
          <h3>{title}</h3>
          <p onClick={checkDetailHandler}>Check detail</p>
        </div>
        <div className={styles.amount}>
          <div>
            <button onClick={() => removeItem(id)}>-</button>
            <p>{amount}</p>
            <button onClick={() => addItem({ id, price: 10, amount: 1 })}>
              +
            </button>
          </div>
          <div>NT$ {totalPrice.toFixed(0)}</div>
        </div>
      </li>
    );
  }
);

export default CartItem;
