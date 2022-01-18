import { useState, useEffect } from "react";

import ToggleBar from "../../UI/ToggleBar/ToggleBar";
import DropDownBoard from "../../UI/DropdownBoard/DropDownBoard";
import HistoryItem from "./HistoryItem";

import styles from "./HistoryRow.module.css";

const HistoryRow = ({ onDrop, setOnDrop, history }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((prev) => !prev);
    setOnDrop(history.id);
  };

  useEffect(() => {
    if (onDrop !== history.id) {
      setDropdown(false);
    }
  }, [onDrop, history.id]);

  const date = new Date(+history.id);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  const buyList = history.items.map((item, index) => {
    return (
      <HistoryItem item={item} index={index} />
    );
  });

  return (
    <>
      <ToggleBar
        isToggle={dropdown}
        onClick={toggleDropdownHandler}
        title={`Time: ${year}/ ${month}/ ${day}`}
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
