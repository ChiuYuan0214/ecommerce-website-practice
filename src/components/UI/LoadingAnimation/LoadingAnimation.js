import ReactDOM from "react-dom";

import styles from "./LoadingAnimation.module.css";

const LoadingSpinner = () => {
  const BackDrop = () => {
    return <div className={styles.backdrop}></div>;
  };

  const LoadingSign = () => {
    return (
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };

  const portal = document.getElementById("modalRoot");
  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, portal)}
      {ReactDOM.createPortal(<LoadingSign />, portal)}
    </>
  );
};

export default LoadingSpinner;
