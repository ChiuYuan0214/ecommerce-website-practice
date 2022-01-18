import React, { useState } from "react";
import { useSelector } from "react-redux";

import Profile from "../components/CenterPage/Profile/Profile";
import BuyingHistory from "../components/CenterPage/BuyingHistory/BuyingHistory";
import Favorite from "../components/CenterPage/Favorite/Favorite";
import BrowsingHistory from "../components/CenterPage/BrowsingHistory/BrowsingHistory";

import styles from "./CenterPage.module.css";

const CenterPage = () => {
  const [toggleTarget, setToggleTarget] = useState("profile");
  const isAuth = useSelector(state => state.auth.isAuth);

  const setToggleHandler = (title) => {
    setToggleTarget(prev => {
      if (prev === title) {
        return null;
      }
        return title;
    });
  };

  return (
    <div className={styles.board}>
      {isAuth && (
        <>
          <Profile target={toggleTarget} setToggle={setToggleHandler} />
          <BuyingHistory target={toggleTarget} setToggle={setToggleHandler} />
          <Favorite target={toggleTarget} setToggle={setToggleHandler} />
          <BrowsingHistory target={toggleTarget} setToggle={setToggleHandler} />
        </>
      )}
      {!isAuth && <h1>Please login first!</h1>}
    </div>
  );
};

export default CenterPage;
