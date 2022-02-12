import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./store/cart";
import { authActions } from "./store/auth";
import { useCognito } from "./hooks/cognito";
import { useProfile } from "./hooks/profile";

import Header from "./components/Header/Header";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import LoadingAnimation from './components/UI/LoadingAnimation/LoadingAnimation';

import styles from "./App.module.css";

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const DiscountPage = React.lazy(() => import('./pages/DiscountPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const CenterPage = React.lazy(() => import('./pages/CenterPage'));


function App() {
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  const cartIsOpen = useSelector((state) => state.cart.cartIsOpen);
  const globalAuth = useSelector((state) => state.auth.isAuth);
  const { isAuth, isLoading, isAuthenticated } = useCognito();
  const { profile, getProfile } = useProfile();

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  const toggleNavbarHandler = () => {
    setNavbar((prev) => !prev);
  };

  // get the user profile after logged in automatically if it's not exist yet.
  useEffect(() => {
    if (!globalAuth) {
      return;
    }
    if (!profile) {
      getProfile();
    } else if (globalAuth && profile) {
      dispatch(authActions.setProfile({ target: "all", data: profile }));
    }
  }, [dispatch, getProfile, globalAuth, profile]);

  // check if the user have token only the first time.
  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  // set redux state isAuth to true after cognito verified.
  useEffect(() => {
    if (isAuth) {
      dispatch(authActions.login());
    }
  }, [isAuth, dispatch]);

  return (
    <>
      {cartIsOpen && <ShoppingCart toggleCart={toggleCartHandler} />}
      {isLoading && <LoadingAnimation />}
      <Header
        navbar={navbar}
        toggleNavbar={toggleNavbarHandler}
        toggleCart={toggleCartHandler}
      />
      <main className={styles.main} onClick={() => setNavbar(false)}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/:prodId" element={<ProductPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/discount" element={<DiscountPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/center" element={<CenterPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;