import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useCognito } from "../../hooks/cognito";

import NavbarToggler from "./NavbarToggler";

import styles from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const { signOut } = useCognito();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const [navbarIsShown, setNavbarIsShown] = useState(false);
  const navClass = navbarIsShown ? styles.show : null;

  const toggleNavbarHandler = () => {
    setNavbarIsShown((prev) => !prev);
  };

  const logoutHandler = () => {
    signOut();
    dispatch(authActions.logout());
    alert('Logged out');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO GOES HERE</div>
      <div style={{ position: "relative" }}>
        <NavbarToggler onClick={toggleNavbarHandler} />
        <nav
          className={`${styles.navbar} ${navClass}`}
          onClick={toggleNavbarHandler}
        >
          <ul>
            <li>
              <NavLink
                to="/home"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discount"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Discount
              </NavLink>
            </li>
            <li>
              <p className={styles.btn} onClick={() => props.toggleCart()}>
                Cart
              </p>
            </li>
            {!isAuth && (
              <li>
                <NavLink
                  to="/auth"
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <p className={styles.btn} onClick={logoutHandler}>
                  Log out
                </p>
              </li>
            )}
            <li>
              <NavLink
                to="/center"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Center
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
