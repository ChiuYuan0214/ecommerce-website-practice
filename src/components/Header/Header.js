import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import NavbarToggler from "./NavbarToggler";

import styles from "./Header.module.css";

const Header = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [navbarIsShown, setNavbarIsShown] = useState(false);
  const navClass = navbarIsShown ? styles.show : null;

  const toggleNavbarHandler = () => {
      setNavbarIsShown(prev => !prev);
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
              <a className={styles.btn} onClick={props.toggleCart}>Cart</a>
            </li>
            {!isAuth && (
              <>
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
              </>
            )}
            {isAuth && (
              <li>
                <NavLink
                  to="/center"
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
