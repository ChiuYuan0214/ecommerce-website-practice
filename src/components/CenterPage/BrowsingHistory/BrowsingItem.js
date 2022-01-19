import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './BrowsingItem.module.css';

const BrowsingItem = ({ item }) => {
    const navigate = useNavigate();
    const {id, year, month, day} = item;
    const product = useSelector(state => state.prod.items.find(item => item.id === id));
    const {imageUrl, title} = product;
    const dateDesc = `${year}-${month}-${day}`;
    return (
      <li className={styles.item}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <button onClick={() => navigate(`/${id}`)}>Go back</button>
        <div className={styles.textBox}>
          <p>Last time you visit:</p>
          <p>{dateDesc}</p>
        </div>
      </li>
    );
};

export default BrowsingItem;