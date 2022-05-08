import React from "react";

import styles from "./ToggleBar.module.css";

const ToggleBar = ({ isToggle, title, onClick, isResponsive }) => {
  // change CSS based on isToggle and isResponsive.
  return (
    <div
      className={`${styles.toggleBar} ${isToggle && styles.active} ${
        isResponsive && styles.onPC
      }`}
      onClick={onClick}
    >
      {title} <span>{">"}</span>
    </div>
  );
};

export default ToggleBar;
