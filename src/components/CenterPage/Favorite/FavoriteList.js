import { useSelector} from 'react-redux';

import FavoriteItem from './FavoriteItem';

import styles from './FavoriteList.module.css';

const FavoriteList = () => {
    const favList = useSelector(state => state.auth.authData.favoriteList);
    let content = <h1>No favorite products yet.</h1>;
    if (favList.length > 0) {
        content = favList.map((id) => <FavoriteItem key={id} id={id} />);
    }
    return (
        <ul className={styles.list}>
            {content}
        </ul>
    );
};

export default FavoriteList;