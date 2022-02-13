import { useSelector } from "react-redux";

import SlideShow from "../components/HomePage/SlideShow/SlideShow";
import HotSaleBlock from "../components/HomePage/HotSaleBlock/HotSaleBlock";
import CategoriesBlock from "../components/HomePage/CategoriesBlock/CategoriesBlock";

import styles from './HomePage.module.css';

const HomePage = () => {
  const items = useSelector((state) => state.prod.items);

  return (
    <section className={styles.container}>
      <SlideShow items={items} />
      <HotSaleBlock items={items} />
      <CategoriesBlock />
    </section>
  );
};

export default HomePage;
