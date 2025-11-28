import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { state } = useCart();
  
  // Debug logging
  console.log('Navigation - Cart state:', state);
  console.log('Navigation - Cart items:', state.items);
  console.log('Navigation - Cart item count:', state.itemCount);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-ui-surface-dark/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg border-b border-ui-gray-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  color: 'var(--primary-red)',
                  fontWeight: '800',
                  textShadow: '2px 2px 0px var(--accent-yellow)'
                }}
              >
                JUSH
              </h1>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/burgers" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/burgers') 
                    ? 'text-primary-red' 
                    : 'text-primary-white hover:text-primary-red'
                }`}
              >
                🍔 Burgers
              </Link>
              <Link 
                to="/shawarma" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/shawarma') 
                    ? 'text-primary-red' 
                    : 'text-primary-white hover:text-primary-red'
                }`}
              >
                🌯 Shawarma
              </Link>
              <Link 
                to="/fries" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/fries') 
                    ? 'text-primary-red' 
                    : 'text-primary-white hover:text-primary-red'
                }`}
              >
                🍟 Fries
              </Link>
              <Link 
                to="/beverages" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/beverages') 
                    ? 'text-primary-red' 
                    : 'text-primary-white hover:text-primary-red'
                }`}
              >
                🥤 Beverages
              </Link>
              <a href="#" className="text-primary-white hover:text-primary-red px-3 py-2 text-sm font-medium transition-colors">
                🔥 Deals
              </a>
            </div>
          </div>

          {/* Search Bar and Cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-ui-gray-medium" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="block w-full pl-10 pr-3 py-2 border border-ui-gray-dark rounded-full leading-5 bg-ui-surface-dark placeholder-ui-gray-medium focus:outline-none focus:placeholder-ui-gray-medium focus:ring-1 focus:ring-primary-red focus:border-primary-red sm:text-sm text-primary-white"
              />
            </form>
            
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-primary-white hover:text-primary-red transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-red text-primary-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-ui-gray-dark inline-flex items-center justify-center p-2 rounded-md text-ui-gray-medium hover:text-primary-white hover:bg-ui-gray-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-red"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ui-gray-dark border-t border-ui-gray-medium">
          <Link
            to="/burgers"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/burgers')
                ? 'text-primary-red bg-primary-red/20'
                : 'text-primary-white hover:text-primary-red hover:bg-ui-gray-medium'
            }`}
          >
            🍔 Burgers
          </Link>
          <Link
            to="/shawarma"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/shawarma')
                ? 'text-primary-red bg-primary-red/20'
                : 'text-primary-white hover:text-primary-red hover:bg-ui-gray-medium'
            }`}
          >
            🌯 Shawarma
          </Link>
          <Link
            to="/fries"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/fries')
                ? 'text-primary-red bg-primary-red/20'
                : 'text-primary-white hover:text-primary-red hover:bg-ui-gray-medium'
            }`}
          >
            🍟 Fries
          </Link>
          <Link
            to="/beverages"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/beverages')
                ? 'text-primary-red bg-primary-red/20'
                : 'text-primary-white hover:text-primary-red hover:bg-ui-gray-medium'
            }`}
          >
            🥤 Beverages
          </Link>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-white hover:text-primary-red hover:bg-ui-gray-medium"
          >
            🔥 Deals
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
