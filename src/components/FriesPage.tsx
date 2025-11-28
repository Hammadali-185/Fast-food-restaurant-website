import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Navigation from './Navigation';
import Footer from './Footer';
import FoodDetailModal, { FoodItem } from './FoodDetailModal';

const FriesPage: React.FC = () => {
  const { addItem, state } = useCart();
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoAddToCart, setAutoAddToCart] = useState(false);

  const friesItems: FoodItem[] = [
    {
      id: 'small-fries',
      name: 'Small Fries',
      price: 99,
      image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop&crop=center',
      category: 'Fries',
      description: 'Crispy golden fries, perfectly seasoned',
      addOns: [
        { name: 'Ketchup', price: 20 },
        { name: 'Mayo', price: 20 }
      ],
      reviews: [
        { name: 'Asad', rating: 5, comment: 'Perfect crispiness!' }
      ],
      rating: 5.0
    },
    {
      id: 'large-fries',
      name: 'Large Fries',
      price: 149,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
      category: 'Fries',
      description: 'Extra large portion of our signature crispy fries',
      addOns: [
        { name: 'Cheese Dip', price: 50 },
        { name: 'Garlic Mayo', price: 40 }
      ],
      reviews: [
        { name: 'Rabia', rating: 5, comment: 'Great for sharing!' }
      ],
      rating: 4.8
    },
    {
      id: 'loaded-fries',
      name: 'Loaded Fries',
      price: 249,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop&crop=center',
      category: 'Fries',
      description: 'Fries loaded with cheese, bacon, and jalapeños',
      spiceLevels: ['Mild', 'Medium'],
      addOns: [
        { name: 'Extra Cheese', price: 60 },
        { name: 'Extra Bacon', price: 80 }
      ],
      reviews: [
        { name: 'Fahad', rating: 5, comment: 'Absolutely loaded!' }
      ],
      rating: 5.0
    },
    {
      id: 'zinger-fries',
      name: 'Zinger Fries',
      price: 199,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop&crop=center',
      category: 'Fries',
      description: 'Spicy seasoned fries with a kick of heat',
      spiceLevels: ['Medium', 'Inferno'],
      addOns: [
        { name: 'Chili Sauce', price: 30 },
        { name: 'Ranch Dip', price: 40 }
      ],
      reviews: [
        { name: 'Saima', rating: 4, comment: 'Spicy and delicious!' }
      ],
      rating: 4.5
    }
  ];

  const handleCardClick = (item: FoodItem) => {
    setSelectedFood(item);
    setAutoAddToCart(false);
    setIsModalOpen(true);
  };

  const handleAddToCartClick = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    setSelectedFood(item);
    setAutoAddToCart(true);
    setIsModalOpen(true);
  };

  return (
    <>
    <div className="min-h-screen bg-background-dark">
      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-accent-yellow to-primary-red text-primary-white py-16 px-4 text-center"
      >
        <h1
          className="text-4xl md:text-6xl lg:text-7xl mb-4"
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontWeight: '800',
            textShadow: '3px 3px 0px var(--accent-yellow)'
          }}
        >
          FRY FIREWORKS
        </h1>
        <p
          className="text-xl md:text-2xl"
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontWeight: '500'
          }}
        >
          Crispy chaos unleashed
        </p>
        <div className="border-t-4 border-white w-24 mx-auto mt-4 animate-pulse"></div>
      </motion.div>

      {/* Cart Summary */}
      {state.itemCount > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-accent-yellow text-primary-white p-4 text-center sticky top-0 z-50 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="font-bold text-lg">
              {state.itemCount} items - Rs {state.total}
            </span>
          </div>
        </motion.div>
      )}

      {/* Fries Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {friesItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 80, opacity: 0, rotate: -3 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { duration: 0.3 }
              }}
              onClick={() => handleCardClick(item)}
              className="relative overflow-hidden group cursor-pointer"
            >
              {/* Subtle Scattered Glow - Reduced for Natural Fade */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent-yellow/12 via-transparent to-primary-red/12 blur-3xl opacity-40"></div>
              
              {/* Hover Edge Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(245, 197, 66, 0.3), inset 0 0 40px rgba(255, 59, 0, 0.2), 0 0 30px rgba(245, 197, 66, 0.4)'
                   }}></div>
              
              {/* Main Card with Edge Fade */}
              <div className="relative m-3 p-6 rounded-2xl shadow-2xl shadow-accent-yellow/30 group-hover:shadow-accent-yellow/50 transition-shadow duration-500"
                   style={{
                     background: 'radial-gradient(ellipse 120% 120% at center, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0.1) 92%, rgba(0, 0, 0, 0.03) 97%, transparent 100%)',
                     backdropFilter: 'blur(4px)'
                   }}>
                {/* Food Image */}
                <div className="relative mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-accent-yellow text-primary-white px-3 py-1 rounded-full text-sm font-bold">
                    💥 CRISPY
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-4">
                  <h3
                    className="text-2xl md:text-3xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--accent-yellow)',
                      fontWeight: '800',
                      textShadow: '2px 2px 0px var(--primary-red)'
                    }}
                  >
                    {item.name.toUpperCase()}
                  </h3>
                  <p className="text-ui-gray-medium text-sm mb-3 font-bold">
                    {item.description}
                  </p>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--accent-orange)'
                    }}
                  >
                    Rs {item.price}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCartClick(e, item)}
                  className="w-full bg-accent-yellow text-primary-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-accent-yellow/80 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back to Menu Button */}
      <div className="text-center pb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-accent-yellow to-primary-red text-primary-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Back to Menu
        </motion.button>
      </div>

      {/* Footer */}
      <Footer />
    </div>

    {/* Food Detail Modal - Outside main container for proper z-index */}
    {selectedFood && (
      <FoodDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        food={selectedFood}
        autoAddToCart={autoAddToCart}
      />
    )}
    </>
  );
};

export default FriesPage;
