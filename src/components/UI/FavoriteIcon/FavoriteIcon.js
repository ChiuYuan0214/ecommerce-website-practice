import styles from './FavoriteIcon.module.css';

const FavoriteIcon = (props) => {
    const iconClass = `${styles.icon} ${props.isFav ? styles.isFav : null}`;

    return (
        <div className={iconClass} onClick={props.onClick}></div>
    );
};

export default FavoriteIcon;