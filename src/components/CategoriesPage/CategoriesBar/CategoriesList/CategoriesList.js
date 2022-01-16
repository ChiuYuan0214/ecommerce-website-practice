import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import styles from "./CategoriesList.module.css";

const CategoriesList = ({ cate }) => {
  const containerRef = useRef();
  const navigate = useNavigate();

  const items = useSelector((state) => state.prod.items).filter(
    (item) => item.category === cate
  );

  const list = items.map((item) => {
    const { id, title, imageUrl, price, discount } = item;
    let itemPrice = price;
    if (discount) {
      itemPrice = price * discount;
    }
    return (
      <li key={id} onClick={() => navigate(`/${id}`)}>
        <img src={imageUrl} alt={title} />
        <div className={styles.info}>
          <h3>{title}</h3>
          <p
            className={styles.price}
            style={{ color: discount ? "red" : null }}
          >{`NT$ ${itemPrice}`}</p>
        </div>
      </li>
    );
  });

  useEffect(() => {
    containerRef.current.className = '';
    setTimeout(() => {
      containerRef.current.className = `${styles.container} ${styles.onDrop}`;
    }, 100);
  }, [cate]);

  return (
    <div ref={containerRef}>
      <ul className={`${styles.board}`}>{list}</ul>
    </div>
  );
};

export default CategoriesList;
