import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from './ProductPage.module.css';

const ProductPage = () => {
    const { prodId } = useParams();
    const items = useSelector(state => state.items);
    const product = items.fliter(item => item.id === prodId);

    return (
      <>
        <h3>{`${product.category} >`}</h3>
        <section>
          <img src={product.imageUrl} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <span>{product.discount}</span>
        </section>
      </>
    );
};

export default ProductPage;