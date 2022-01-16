import SearchItem from './SearchItem/SearchItem';

import styles from "./SearchList.module.css";

const SearchList = ({ list }) => {
  let content = <h1>No products found.</h1>;
  if (list.length > 0) {
    content = list.map((prod, index) => (
      <SearchItem key={prod.id} prod={prod} index={index} />
    ));
  }

  return (
    <ul className={styles.board}>
      {content}
    </ul>
  );
};

export default SearchList;
