import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { authActions } from "../../store/auth";

import CartItem from "./CartItem/CartItem";
import Backdrop from "../UI/Backdrop/Backdrop";

import styles from "./ShoppingCart.module.css";

const ShoppingCart = ({ toggleCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.prod.items);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

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

  const cancelHandler = () => {
    toggleCart();
    setIsAddingAddress(false);
  };

  const confirmHandler = () => {
    if (!isAddingAddress) {
      setIsAddingAddress(true);
      return;
    } else {
      const dataList = cartItems.map((item) => {
        const discount = products.find((prod) => prod.id === item.id).discount;
        return { ...item, discount };
      });
      dispatch(authActions.addBuyingHistory(dataList));
      dispatch(cartActions.reset());
      setIsAddingAddress(false);
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
        <h2>Total Price: NT$ {totalPrice.toFixed(0)}</h2>
        <div className={styles.actions}>
          <button onClick={cancelHandler}>Close</button>
          <button disabled={cartItems.length === 0} onClick={confirmHandler}>Buy</button>
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
