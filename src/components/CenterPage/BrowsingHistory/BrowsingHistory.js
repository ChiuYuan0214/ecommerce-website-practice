import { useState, useEffect } from "react";

import ToggleBar from "../../UI/ToggleBar/ToggleBar";
import DropDownBoard from "../../UI/DropdownBoard/DropDownBoard";
import BrowsingList from "./BrowsingList";

const BrowsingHistory = ({ target, setToggle }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown(true);
    setToggle("browsing");
  };

  useEffect(() => {
    if (target !== "browsing") {
      setDropdown(false);
    } else if (target === "browsing" && dropdown === false) {
      setDropdown(true);
    }
  }, [target, dropdown]);

  return (
    <section>
      <ToggleBar
        isResponsive={true}
        isToggle={dropdown}
        title="Browsing History"
        onClick={toggleDropdownHandler}
      />
      <DropDownBoard isResponsive={true} dropdown={dropdown}>
        <BrowsingList />
      </DropDownBoard>
    </section>
  );
};

export default BrowsingHistory;
