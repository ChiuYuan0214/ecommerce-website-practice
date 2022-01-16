import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart";
import CartItem from "../ShoppingCart/CartItem/CartItem";

import styles from "./Cart.module.css";

const Cart = ({ toggleCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const navigate = useNavigate();

  const addItemHandler = (item) => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        price: item.price,
        discount: item.discount,
        amount: 1,
      })
    );
  };

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const confirmHandler = () => {
    if (!isAuth) {
      navigate("/auth");
      return;
    }
  };

  const content = cartItems.map((item) => (
    <CartItem
      item={item}
      addItem={addItemHandler}
      removeItem={removeItemHandler}
    />
  ));

  return (
    <section>
      <ul className={styles.list}>{content}</ul>
      <div className={styles.actions}>
        <button onClick={() => toggleCart()}>Close</button>
        <button className={styles.confirm} onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </section>
  );
};

export default Cart;
