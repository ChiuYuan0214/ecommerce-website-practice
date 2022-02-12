import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import useUserData from "../hooks/user-data";

import Profile from "../components/CenterPage/Profile/Profile";
import BuyingHistory from "../components/CenterPage/BuyingHistory/BuyingHistory";
import Favorite from "../components/CenterPage/Favorite/Favorite";
import BrowsingHistory from "../components/CenterPage/BrowsingHistory/BrowsingHistory";

import styles from "./CenterPage.module.css";

const CenterPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.prod.items);
  const [toggleTarget, setToggleTarget] = useState("profile");
  const {data: newBuyHis, sendRequest: fetchBuyHis} = useUserData();
  
  useEffect(() => {
    fetchBuyHis('buying');
  }, [fetchBuyHis]);

  useEffect(() => {
    if (newBuyHis) {
      const buyList = newBuyHis.map(his => {
        const totalPrice = his.items.map(item => {
          const price = products.find(prod => prod.id === item.id).price;
          let discount = 1;
          if (!isNaN(item.discount)) {
            discount = item.discount;
          }
          return item.amount * discount * price;
        }).reduce((sum, prodPrice) => sum + prodPrice, 0);
        
        return {...his, totalPrice};
      });

      dispatch(authActions.setBuyingHistory(buyList));
    }
  }, [newBuyHis, dispatch, products]);

  const setToggleHandler = (title) => {
    setToggleTarget((prev) => {
      if (prev === title) {
        return null;
      }
      return title;
    });
  };

  return (
    <div className={styles.board}>
      <Profile target={toggleTarget} setToggle={setToggleHandler} />
      <BuyingHistory target={toggleTarget} setToggle={setToggleHandler} />
      <Favorite target={toggleTarget} setToggle={setToggleHandler} />
      <BrowsingHistory target={toggleTarget} setToggle={setToggleHandler} />
    </div>
  );
};

export default CenterPage;
