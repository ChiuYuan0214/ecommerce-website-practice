import styles from "./DiscountList.module.css";

const DiscountList = ({ items, setDiscount }) => {
  const discountList = [];
  for (const item of items) {
    if (!discountList.includes(item.discount)) {
      discountList.push(item.discount);
    }
  }

  const topDiscount = Math.round((1 - Math.min(...discountList)) * 100);

  const content = discountList.map((discount, index) => {
    const cta = `${Math.round((1 - discount) * 100)}% OFF!`;
    return (
      <li
      key={index.toString()}
        style={{
          color: `rgb(${100 + index * 20}, ${100 + index * 40}, ${
            100 + index * 60
          })`,
        }}
        onClick={() => setDiscount(discount)}
      >
        <p>{cta}</p>
      </li>
    );
  });

  return (
    <>
      <h1 className={styles.headline}>
        Discount up to <span>{topDiscount}% OFF</span> now!
      </h1>
      <ul className={styles.board}>{content}</ul>
    </>
  );
};

export default DiscountList;
