import { useState, useEffect } from "react";

import SearchBar from "../components/CategoriesPage/SearchBar/SearchBar";
import CategoriesBar from "../components/CategoriesPage/CategoriesBar/CategoriesBar";
import CategoriesList from "../components/CategoriesPage/CategoriesList/CategoriesList";
import SearchList from "../components/CategoriesPage/SearchList/SearchList";

const CategoriesPage = () => {
  const [onSearch, setOnSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const startSearchHandler = (list) => {
    setOnSearch(true);
    setSearchList(list);
  };

  const cancelSearchHandler = () => {
    setOnSearch(false);
  };

  return (
    <>
      <SearchBar startSearch={startSearchHandler} />
      <CategoriesBar cancelSearch={cancelSearchHandler} />
      {!onSearch && <CategoriesList />}
      {onSearch && <SearchList list={searchList} />}
    </>
  );
};

export default CategoriesPage;
