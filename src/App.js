
import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { cartActions } from './store/cart';

import Header from "./components/Header/Header";
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import HomePage from "./pages/HomePage";
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import DiscountPage from './pages/DiscountPage';
import AuthPage from './pages/AuthPage';
import CenterPage from './pages/CenterPage';

import styles from "./App.module.css";

function App() {
  const cartIsOpen = useSelector(state => state.cart.cartIsOpen);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <>
      {cartIsOpen && <ShoppingCart toggleCart={toggleCartHandler} />}
      <Header toggleCart={toggleCartHandler} />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:prodId" element={<ProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/center" element={<CenterPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
