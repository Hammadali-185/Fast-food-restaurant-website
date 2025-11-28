import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './components/HomePage';
import BurgerPage from './components/BurgerPage';
import FriesPage from './components/FriesPage';
import ShawarmaPage from './components/ShawarmaPage';
import BeveragesPage from './components/BeveragesPage';
import CartPage from './components/CartPage';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/burgers" element={<BurgerPage />} />
              <Route path="/fries" element={<FriesPage />} />
              <Route path="/shawarma" element={<ShawarmaPage />} />
              <Route path="/beverages" element={<BeveragesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;