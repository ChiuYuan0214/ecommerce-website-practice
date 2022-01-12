import { useSelector } from "react-redux";
import { useState } from "react";

import styles from "./CategoriesBlock.module.css";

const CategoriesBlock = () => {
  const items = useSelector((state) => state.prod.items);
  const cateList = useSelector((state) => state.prod.categories);
  const [cate, setCate] = useState(null);

  const setCateHandler = (title) => {
    if (cate === title) {
      return;
    }
    setCate(title);
  };

  const btnList = cateList.map((cate) => (
    <li key={cate}>
      <button onMouseEnter={setCateHandler.bind(null, cate)}>
        {cate.toUpperCase()}
      </button>
    </li>
  ));

  const filteredList = items.filter((item) => item.category === cate);

  const ProductList = () => {
    return (
      <ul className={styles.prodList}>
        {filteredList.map((item, index) => (
          <li
            key={item.id}
            id={item.id}
            style={{
              animationDuration: `${1 + index * 0.3}s`,
            }}
          >
            <h3>#{item.title}</h3>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={styles.card}>
      <h2>Categories</h2>
      <ul className={styles.btnBoard}>{btnList}</ul>
      {cate && <ProductList />}
    </section>
  );
};

export default CategoriesBlock;
