import { useCallback } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart";

import CartItem from "./CartItem/CartItem";
import Backdrop from "../UI/Backdrop/Backdrop";

import styles from "./ShoppingCart.module.css";

const ShoppingCart = ({ toggleCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.prod.items);

  const isAuth = useSelector((state) => state.auth.isAuth);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    let discount = products.find((prod) => prod.id === item.id).discount;
    if (!discount) {
      discount = 1;
    }
    return sum + item.price * item.amount * discount;
  }, 0);

  const addItemHandler = useCallback(
    (item) => {
      dispatch(cartActions.addItem(item));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id) => {
      dispatch(cartActions.removeItem(id));
    },
    [dispatch]
  );

  const confirmHandler = () => {
    if (!isAuth) {
      navigate("/auth");
      return;
    }
  };

  const content = cartItems.map((item) => {
    const { imageUrl, title, price, discount } = products.find(
      (prod) => prod.id === item.id
    );

    return (
      <CartItem
        imageUrl={imageUrl}
        title={title}
        price={price}
        discount={discount}
        key={item.id}
        id={item.id}
        amount={item.amount}
        addItem={addItemHandler}
        removeItem={removeItemHandler}
        toggleCart={toggleCart}
      />
    );
  });

  const Cart = () => {
    return (
      <section className={styles.cart}>
        <ul style={cartItems.length > 2 ? { overflowY: "scroll" } : null}>
          {content}
        </ul>
        <h2>Total Price: NT$ {totalPrice}</h2>
        <div className={styles.actions}>
          <button onClick={() => toggleCart()}>Close</button>
          <button onClick={confirmHandler}>Confirm</button>
        </div>
      </section>
    );
  };

  const portal = document.getElementById("modalRoot");

  return (
    <>
      {createPortal(<Backdrop onClick={() => toggleCart()} />, portal)}
      {createPortal(<Cart />, portal)}
    </>
  );
};

export default ShoppingCart;
