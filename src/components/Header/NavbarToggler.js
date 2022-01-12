import styles from './NavbarToggler.module.css';

const NavbarToggler = (props) => {
    return (
        <div className={styles.toggle} onClick={props.onClick}></div>
    );
};

export default NavbarToggler;