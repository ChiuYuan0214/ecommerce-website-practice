import { useNavigate } from 'react-router-dom';

import styles from './HotSaleBlock.module.css';

const HotSaleBlock = ({items}) => {
  const navigate = useNavigate();
    const topItems = [];
    for (let i = 0; i < 5; i++) {
        topItems.push(items[i]);
    }

    const list = topItems.map((item, index) => (
      <li key={item.id} className={styles.card} onClick={() => navigate(`/${item.id}`)}>
        <p className={styles.icon}>
          Top <br/><span>{index + 1}</span>
        </p>
        <img src={item.imageUrl} alt={item.title} />
        <div className={styles.desc}>
          <h3>{item.title}</h3>
          <p>NT$ {item.price}</p>
        </div>
      </li>
    ));

    return (
        <ul className={styles.container}>
            {list}
        </ul>
    );
};

export default HotSaleBlock;