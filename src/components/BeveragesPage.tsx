import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Navigation from './Navigation';
import Footer from './Footer';
import FoodDetailModal, { FoodItem } from './FoodDetailModal';

const BeveragesPage: React.FC = () => {
  const { addItem, state } = useCart();
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoAddToCart, setAutoAddToCart] = useState(false);

  const beverageItems: FoodItem[] = [
    {
      id: 'pepsi',
      name: 'Pepsi',
      price: 49,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center',
      category: 'Beverages',
      description: 'Classic refreshing cola drink',
      reviews: [
        { name: 'Imran', rating: 5, comment: 'Always refreshing!' }
      ],
      rating: 5.0
    },
    {
      id: 'mirinda',
      name: 'Mirinda',
      price: 49,
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center',
      category: 'Beverages',
      description: 'Orange flavored fizzy drink',
      reviews: [
        { name: 'Ayesha', rating: 5, comment: 'Love the orange flavor!' }
      ],
      rating: 4.8
    },
    {
      id: 'sprite',
      name: 'Sprite',
      price: 49,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center',
      category: 'Beverages',
      description: 'Lemon-lime soda, crisp and refreshing',
      reviews: [
        { name: 'Kashif', rating: 5, comment: 'So crisp and refreshing!' }
      ],
      rating: 4.9
    },
    {
      id: 'coca-cola',
      name: 'Coca Cola',
      price: 49,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center',
      category: 'Beverages',
      description: 'The original cola taste',
      reviews: [
        { name: 'Zara', rating: 5, comment: 'Classic taste!' }
      ],
      rating: 5.0
    },
    {
      id: 'mountain-dew',
      name: 'Mountain Dew',
      price: 49,
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center',
      category: 'Beverages',
      description: 'Citrus flavored energy drink',
      reviews: [
        { name: 'Bilal', rating: 4, comment: 'Great energy boost!' }
      ],
      rating: 4.5
    },
    {
      id: 'water',
      name: 'Mineral Water',
      price: 29,
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop&crop=center',
      category: 'Beverages',
      description: 'Pure, clean mineral water',
      reviews: [
        { name: 'Sana', rating: 5, comment: 'Always need water with spicy food!' }
      ],
      rating: 5.0
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
        className="bg-gradient-to-r from-primary-red to-accent-orange text-primary-white py-16 px-4 text-center"
      >
        <h1
          className="text-4xl md:text-6xl lg:text-7xl mb-4"
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontWeight: '800',
            textShadow: '3px 3px 0px var(--accent-yellow)'
          }}
        >
          THIRST QUENCHERS
        </h1>
        <p
          className="text-xl md:text-2xl"
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontWeight: '500'
          }}
        >
          Cool drinks for hot moments
        </p>
        <div className="border-t-4 border-white w-24 mx-auto mt-4 animate-pulse"></div>
      </motion.div>

      {/* Cart Summary */}
      {state.itemCount > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-primary-red text-primary-white p-4 text-center sticky top-0 z-50 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="font-bold text-lg">
              {state.itemCount} items - Rs {state.total}
            </span>
          </div>
        </motion.div>
      )}

      {/* Beverages Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beverageItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 80, opacity: 0, rotate: -2 }}
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
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-red/12 via-transparent to-accent-orange/12 blur-3xl opacity-40"></div>
              
              {/* Hover Edge Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(255, 59, 0, 0.3), inset 0 0 40px rgba(255, 102, 0, 0.2), 0 0 30px rgba(255, 59, 0, 0.4)'
                   }}></div>
              
              {/* Main Card with Edge Fade */}
              <div className="relative m-3 p-6 rounded-2xl shadow-2xl shadow-primary-red/30 group-hover:shadow-primary-red/50 transition-shadow duration-500"
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
                  <div className="absolute -top-2 -right-2 bg-primary-red text-primary-white px-3 py-1 rounded-full text-sm font-bold">
                    🥤 COLD
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-4">
                  <h3
                    className="text-2xl md:text-3xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--primary-red)',
                      fontWeight: '800',
                      textShadow: '2px 2px 0px var(--accent-yellow)'
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
                  className="w-full bg-primary-red text-primary-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-primary-red-dark transition-all duration-300 flex items-center justify-center gap-2"
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
          className="bg-gradient-to-r from-primary-red to-accent-orange text-primary-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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

export default BeveragesPage;
