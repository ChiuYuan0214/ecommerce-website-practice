import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductDetail from '../components/ProductPage/ProductDetail/ProductDetail';

const ProductPage = () => {
  const { prodId } = useParams();
  const items = useSelector((state) => state.prod.items);
  
  const product = items.find((item) => item.id === prodId);

  return <ProductDetail product={product} />;
};

export default ProductPage;
