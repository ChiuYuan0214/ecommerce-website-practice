import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useCognito } from "../../hooks/cognito";

import NavbarToggler from "./NavbarToggler";

import styles from "./Header.module.css";

const Header = ({ navbar, toggleNavbar, toggleCart }) => {
  const dispatch = useDispatch();
  const { signOut } = useCognito();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const navClass = navbar ? styles.show : null;

  // clear both browser storage and auth state.
  const logoutHandler = () => {
    signOut();
    dispatch(authActions.logout());
    alert("Logged out");
  };

  // convert duplicated code into component.
  const HeaderLink = ({ to, children }) => {
    return (
      <li>
        <NavLink
          to={to}
          className={(navData) => (navData.isActive ? styles.active : "")}
        >
          {children}
        </NavLink>
      </li>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO GOES HERE</div>
      <div style={{ position: "relative" }}>
        <NavbarToggler onClick={toggleNavbar} />
        <nav className={`${styles.navbar} ${navClass}`} onClick={toggleNavbar}>
          <ul>
            <HeaderLink to="/home">Home</HeaderLink>
            <HeaderLink to="/categories">Categories</HeaderLink>
            <HeaderLink to="/discount">Discount</HeaderLink>
            <li>
              <p className={styles.btn} onClick={() => toggleCart()}>
                Cart
              </p>
            </li>
            {!isAuth && <HeaderLink to="/auth">Login</HeaderLink>}
            {isAuth && (
              <li>
                <p className={styles.btn} onClick={logoutHandler}>
                  Log out
                </p>
              </li>
            )}
            <HeaderLink to="/center">Center</HeaderLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
