import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import HomePage from './components/HomePage';
import BurgerPage from './components/BurgerPage';
import ShawarmaPage from './components/ShawarmaPage';
import FriesPage from './components/FriesPage';
import BeveragesPage from './components/BeveragesPage';
import SearchResults from './components/SearchResults';
import CartPage from './components/CartPage';
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/burgers" element={<BurgerPage />} />
            <Route path="/shawarma" element={<ShawarmaPage />} />
            <Route path="/fries" element={<FriesPage />} />
            <Route path="/beverages" element={<BeveragesPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
