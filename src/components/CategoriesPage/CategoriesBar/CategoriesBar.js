
import { useSelector } from 'react-redux';
import CategoriesList from './CategoriesList/CategoriesList';

import styles from './CategoriesBar.module.css';

const CategoriesBar = ({ cateState, setCateHandler }) => {
  const categories = useSelector((state) => state.prod.categories);

  const list = categories.map((cate) => (
    <li
      className={styles.cate}
      key={cate}
      onClick={setCateHandler.bind(null, cate)}
    >
      {cate}
    </li>
  ));

  return (
    <>
      <ul className={styles.board}>{list}</ul>
      {cateState && <CategoriesList cate={cateState} />}
    </>
  );
};

export default CategoriesBar;