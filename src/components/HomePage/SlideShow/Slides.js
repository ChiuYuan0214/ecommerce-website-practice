import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";

import FavoriteIcon from "../../UI/FavoriteIcon/FavoriteIcon";

import styles from "./Slides.module.css";

const Slides = ({ slideIndex, item, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFav = useSelector((state) =>
    state.auth.authData.favoriteList.includes(item.id)
  );

  const toggleFavHandler = () => {
    dispatch(authActions.toggleFavorite(item.id));
  };

  return (
    <div
      className={`${styles.slide} ${slideIndex === index ? styles.show : ""}`}
      key={item.id}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        onClick={() => navigate(`/${item.id}`)}
      />
      <div>
        <div className={styles.desc}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div className={styles.favorite} onClick={toggleFavHandler}>
          <FavoriteIcon isFav={isFav} />
        </div>
      </div>
    </div>
  );
};

export default Slides;
