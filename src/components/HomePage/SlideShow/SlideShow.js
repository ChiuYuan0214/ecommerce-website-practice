import { useState } from "react";

import Slide from "./Slides";
import styles from "./SlideShow.module.css";

const SlideShow = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // set the slide index to reverse side if amount overflow the bundary.
  const slideChangeHander = (amount) => {
    if (slideIndex + amount > 3) {
      setSlideIndex(0);
    } else if (slideIndex + amount < 0) {
      setSlideIndex(3);
    } else {
      setSlideIndex((prev) => prev + amount);
    }
  };

  const SlideList = () =>
    props.items.map((item, index) => (
      <Slide key={item.id} slideIndex={slideIndex} item={item} index={index} />
    ));

  return (
    <section className={styles.container}>
      <div
        className={styles.previous}
        onClick={slideChangeHander.bind(null, -1)}
      >
        &#10094;
      </div>
      <SlideList />
      <div className={styles.next} onClick={slideChangeHander.bind(null, 1)}>
        &#10095;
      </div>
    </section>
  );
};

export default SlideShow;
