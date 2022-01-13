import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const { startSearch } = props;
  const items = useSelector((state) => state.prod.items);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const inputChangeHandler = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    if (inputValue.trim() !== '') {
      setError(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value.trim();
    if (inputValue === '') {
      setError(true);
      return;
    }
    const searchWord = new RegExp(inputValue, "i");
    const searchList = items.filter(
      (item) =>
        searchWord.test(item.title) === true ||
        searchWord.test(item.category) === true
    );
    startSearch(searchList);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="search">Search Products/Categories</label>
      <input
        type="text"
        id="search"
        name="search"
        value={input}
        ref={inputRef}
        onChange={inputChangeHandler}
        placeholder="Please fill in"
        className={`${styles.input} ${error ? styles.errorInput : null}`}
      />
      <button>Search!</button>
      {error && (
        <div className={styles.error}>
          <p>Please enter valid value.</p>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
