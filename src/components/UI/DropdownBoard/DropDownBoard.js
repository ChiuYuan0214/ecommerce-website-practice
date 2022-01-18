import styles from "./DropDownBoard.module.css";

const DropDownBoard = ({ isResponsive, dropdown, className, children }) => {
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
