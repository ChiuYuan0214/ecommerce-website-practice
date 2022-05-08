import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import styles from "./CategoriesBlock.module.css";

const CategoriesBlock = () => {
  const items = useSelector((state) => state.prod.items);
  const cateList = useSelector((state) => state.prod.categories);
  const [cate, setCate] = useState(null);
  const listRef = useRef();
  const navigate = useNavigate();

  // change the category when hovered.
  const setCateHandler = (title) => {
    if (cate === title) {
      return;
    }
    setCate(title);
  };

  // scroll the list into view whenever the target category has changed.
  useEffect(() => {
    if (cate) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [cate]);

  const btnList = cateList.map((cate) => (
    <li
      key={cate}
      onMouseEnter={() => {
        setCateHandler(cate);
      }}
    >
      {cate.toUpperCase()}
    </li>
  ));

  const filteredList = items.filter((item) => item.category === cate);

  const ProductList = () => {
    return (
      <ul className={styles.prodList} ref={listRef}>
        {filteredList.map((item, index) => (
          <li
            key={item.id}
            id={item.id}
            style={{
              animationDuration: `${1 + index * 0.3}s`,
            }}
            onClick={() => navigate(`/${item.id}`)}
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
