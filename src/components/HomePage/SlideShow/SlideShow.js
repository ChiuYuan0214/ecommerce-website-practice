import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import FavoriteIcon from "../../UI/FavoriteIcon/FavoriteIcon";
import styles from "./SlideShow.module.css";

const SlideShow = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const navigate = useNavigate();

  const slideChangeHander = (amount) => {
      if (slideIndex + amount > 3) {
          setSlideIndex(0);
      } else if (slideIndex + amount < 0) {
          setSlideIndex(3);
      } else {
          setSlideIndex(prev => prev + amount);
      }
  };

  const slideshow = props.items.map((item, index) => (
    <div
      className={`${styles.slide} ${slideIndex === index ? styles.show : null}`}
      key={item.id}
    >
      <img src={item.imageUrl} alt={item.title} onClick={() => navigate(`/${item.id}`)} />
      <div>
        <div className={styles.desc}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div
          className={styles.favorite}
          onClick={props.setIsFav.bind(null, item.id)}
        >
          <FavoriteIcon isFav={item.isFav} />
        </div>
      </div>
    </div>
  ));

  return (
    <section className={styles.container}>
      <div className={styles.previous} onClick={slideChangeHander.bind(null, -1)}>&#10094;</div>
      {slideshow}
      <div className={styles.next} onClick={slideChangeHander.bind(null, 1)}>&#10095;</div>
    </section>
  );
};

export default SlideShow;
