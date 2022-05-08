import styles from "./DropDownBoard.module.css";

const DropDownBoard = ({ isResponsive, dropdown, className, children }) => {
  // Change CSS based on dropdown and isResponsive.
  return (
    <section
      className={`${styles.board} ${className} ${dropdown && styles.drop} ${
        isResponsive && styles.onPC
      }`}
    >
      {children}
    </section>
  );
};

export default DropDownBoard;
