import { useState, useEffect } from "react";

import ToggleBar from "../../UI/ToggleBar/ToggleBar";
import DropDownBoard from "../../UI/DropdownBoard/DropDownBoard";
import HistoryItem from "./HistoryItem";

import styles from "./HistoryRow.module.css";

const HistoryRow = ({ onDrop, setOnDrop, history }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((prev) => !prev);
    setOnDrop(history.date);
  };

  useEffect(() => {
    if (onDrop !== history.date) {
      setDropdown(false);
    }
  }, [onDrop, history.date]);

  const date = new Date(+history.date);
  const buyYear = date.getFullYear();
  const buyMonth = date.getMonth() + 1;
  const buyDate = date.getDate();

  const buyList = history.items.map((item, index) => {
    return (
      <HistoryItem key={item.id} item={item} index={index} />
    );
  });

  return (
    <>
      <ToggleBar
        isToggle={dropdown}
        onClick={toggleDropdownHandler}
        title={`Time: ${buyYear}/ ${buyMonth}/ ${buyDate}`}
      />
      <DropDownBoard dropdown={dropdown}>
        <p className={styles.totalPrice}>
          Total price: NT$ {history.totalPrice.toFixed(0)}
        </p>
        <ul className={styles.list}>{buyList}</ul>
      </DropDownBoard>
    </>
  );
};

export default HistoryRow;
