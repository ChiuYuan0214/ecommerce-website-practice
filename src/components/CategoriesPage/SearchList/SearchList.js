import SearchItem from './SearchItem/SearchItem';

import styles from "./SearchList.module.css";

const SearchList = ({ list }) => {

  return (
    <ul className={styles.board}>
      {list.map((prod, index) => (
        <SearchItem key={prod.id} prod={prod} index={index} />
      ))}
    </ul>
  );
};

export default SearchList;
