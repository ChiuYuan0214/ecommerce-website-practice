import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import HistoryRow from "./HistoryRow";
import ToggleBar from "../../UI/ToggleBar/ToggleBar";
import DropDownBoard from "../../UI/DropdownBoard/DropDownBoard";

import styles from "./BuyingHistory.module.css";

const BuyingHistory = ({target, setToggle}) => {
  const [dropdown, setDropdown] = useState(false);
  const [onDropRow, setOnDropRow] = useState(null);

  const toggleDropdownHandler = () => {
    setDropdown((prev) => !prev);
    setToggle('buying');
  };

  // set onDropRow to specified history id.
  const setOnDropRowHandler = (id) => {
    setOnDropRow(id);
  };

  useEffect(() => {
    if (target !== 'buying') {
      setDropdown(false);
    } else if (target === 'buying' && dropdown === false) {
      setDropdown(true);
    }
  }, [target, dropdown]);

  const buyingHistory = useSelector(
    (state) => state.auth.authData.buyingHistory
  );

  let content = <h1>No buying history yet.</h1>;

  // a row per history.
  if (buyingHistory.length > 0) {
    content = buyingHistory.map((history) => (
      <HistoryRow
        key={history.date}
        onDrop={onDropRow}
        setOnDrop={setOnDropRowHandler}
        history={history}
      />
    ));
  }

  return (
    <section>
      <ToggleBar
        isResponsive={true}
        isToggle={dropdown}
        onClick={toggleDropdownHandler}
        title="Buying History"
      />
      <DropDownBoard isResponsive={true} dropdown={dropdown}>
        <ul className={styles.list}>{content}</ul>
      </DropDownBoard>
    </section>
  );
};

export default BuyingHistory;
