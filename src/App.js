
import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

import HomePage from "./pages/HomePage";
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import DiscountPage from './pages/DiscountPage';
import AuthPage from './pages/AuthPage';

import styles from "./App.module.css";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleCartHandler = () => {
    setCartIsOpen(prev => !prev);
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
        </Routes>
      </main>
    </>
  );
}

export default App;
