import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const { startSearch } = props;
  const items = useSelector(state => state.prod.items);
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const searchWord = new RegExp(inputRef.current.value, 'i');
    const searchList = items.filter(item => searchWord.test(item.title) === true);
    startSearch(searchList);
  };
  
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="search">Search Products</label>
      <input
        type="text"
        id="search"
        name="search"
        value={input}
        ref={inputRef}
        onChange={inputChangeHandler}
        placeholder="Please search by product name"
      />
      <button>Search!</button>
    </form>
  );
};

export default SearchBar;
