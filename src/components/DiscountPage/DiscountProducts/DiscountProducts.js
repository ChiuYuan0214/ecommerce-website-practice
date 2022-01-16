import { useNavigate } from "react-router-dom";
import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from "./DiscountProducts.module.css";

const DiscountProducts = ({ list, onClose }) => {
  const navigate = useNavigate();

  
  const productList = list.map((prod) => (
    <li key={prod.id} className={styles.prod} onClick={() => navigate(`/${prod.id}`)}>
      <img src={prod.imageUrl} alt={prod.title} />
      <h3>{prod.title}</h3>
      <p>{Math.round((1 - prod.discount) * 100)}% OFF!</p>
    </li>
  ));
  
  const content = <ul className={styles.board}>{productList}</ul>;

  return (
    <>
      <Backdrop onClick={onClose} />
      {content}
    </>
  );
};

export default DiscountProducts;
