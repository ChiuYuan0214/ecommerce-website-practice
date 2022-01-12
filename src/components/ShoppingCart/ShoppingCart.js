import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

import styles from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const Cart = () => {
    return (
      <section className={styles.cart}>
        <ul>
          {cartItems.map((item) => (
            <li className={styles.card}>
              <h3>{item.title}</h3>
              <p>Amount: {item.amount}</p>
              <p>Price: NT$ {item.amount * item.price}</p>
            </li>
          ))}
        </ul>
        <h2>Total Price: NT$ {totalPrice}</h2>
      </section>
    );
  };

  const Backdrop = () => {
    return <div className={styles.backdrop}></div>;
  };

  const portal = document.getElementById("modalRoot");

  return (
    <>
      {createPortal(<Backdrop />, portal)}
      {createPortal(<Cart />, portal)}
    </>
  );
};

export default ShoppingCart;
