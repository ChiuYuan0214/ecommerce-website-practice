import { useState, useEffect } from "react";

import DropDownBoard from "../../UI/DropdownBoard/DropDownBoard";
import ToggleBar from "../../UI/ToggleBar/ToggleBar";
import FavoriteList from "./FavoriteList";

const Favorite = ({target, setToggle}) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((prev) => !prev);
    setToggle('favorite');
  };

  useEffect(() => {
    if (target !== 'favorite') {
      setDropdown(false);
    } else if (target === 'favorite' && dropdown === false) {
      setDropdown(true);
    }
  }, [target, dropdown]);

  return (
    <section>
      <ToggleBar
        isResponsive={true}
        isToggle={dropdown}
        title="Favorite"
        onClick={toggleDropdownHandler}
      />
      <DropDownBoard isResponsive={true} dropdown={dropdown}>
        <FavoriteList />
      </DropDownBoard>
    </section>
  );
};

export default Favorite;
