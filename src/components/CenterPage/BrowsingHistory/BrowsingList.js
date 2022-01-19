import { useSelector } from "react-redux";

import BrowsingItem from "./BrowsingItem";

import styles from "./BrowsingList.module.css";

const BrowsingList = () => {
  let browList = useSelector((state) => state.auth.authData.browsingHistory);
  if (browList.length > 10) {
    browList = [...browList];
    browList = browList.splice(0, 10);
  }

  const content = browList.map((data) => {
    const date = new Date(+data.historyId);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const item = { id: data.id, year, month, day };

    return <BrowsingItem key={data.id} item={item} />;
  });

  return browList.length > 0 ? (
    <ul className={styles.list}>{content}</ul>
  ) : (
    <h1>No browsing history yet.</h1>
  );
};

export default BrowsingList;
