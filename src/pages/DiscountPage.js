import { useState } from "react";
import { useSelector } from "react-redux";

import DiscountList from "../components/DiscountPage/DiscountList/DiscountList";
import DiscountProducts from "../components/DiscountPage/DiscountProducts/DiscountProducts";

const DiscountPage = () => {
  const [discount, setDiscount] = useState(null);
  const items = useSelector((state) => state.prod.items).filter(
    (item) => item.discount !== null
  );

  const setDiscountHandler = (dis) => {
    setDiscount(dis);
  };

  const resetDiscountHandler = () => {
      setDiscount(null);
  };

  let productList = null;
  if (discount) {
    productList = items.filter((item) => item.discount === discount);
  }

  return (
    <>
      <DiscountList items={items} setDiscount={setDiscountHandler} />
      {discount && <DiscountProducts list={productList} onClose={resetDiscountHandler} />}
    </>
  );
};

export default DiscountPage;
