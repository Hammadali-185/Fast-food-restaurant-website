import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, Flame, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  spiceLevels?: string[];
  addOns?: { name: string; price: number }[];
  reviews?: { name: string; rating: number; comment: string; avatar?: string }[];
  rating?: number;
}

interface FoodDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: FoodItem;
  autoAddToCart?: boolean; // If true, automatically add to cart on open
}

const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  food,
  autoAddToCart = false 
}) => {
  const { state, addItem, updateQuantity } = useCart();
  const [selectedSpice, setSelectedSpice] = useState(food.spiceLevels?.[0] || 'Mild');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Check if item is already in cart
  const cartItem = state.items.find(item => item.id === food.id);
  const isInCart = !!cartItem;

  useEffect(() => {
    if (isOpen && autoAddToCart && !isInCart) {
      handleAddToCart();
    }
  }, [isOpen, autoAddToCart]);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnName)
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  const calculateTotalPrice = () => {
    let total = food.price * quantity;
    selectedAddOns.forEach(addOnName => {
      const addOn = food.addOns?.find(a => a.name === addOnName);
      if (addOn) total += addOn.price * quantity;
    });
    return total;
  };

  const handleAddToCart = () => {
    addItem({
      id: food.id,
      name: food.name,
      price: calculateTotalPrice() / quantity, // Price per unit including add-ons
      image: food.image,
      category: food.category
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) return;
    setQuantity(newQuantity);
    if (isInCart) {
      updateQuantity(food.id, newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Modal */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              width: window.innerWidth >= 768 ? 'min(90vw, 850px)' : 'min(95vw, 450px)',
              maxHeight: window.innerWidth >= 768 ? '85vh' : '95vh'
            }}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-ui-surface-dark rounded-2xl overflow-hidden h-full
                       shadow-2xl shadow-primary-red/30 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 
                         bg-ui-gray-dark/90 backdrop-blur-sm text-primary-white 
                         p-2.5 rounded-full hover:bg-primary-red transition-colors duration-300
                         shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-primary-red scrollbar-track-ui-gray-dark">
              {/* Mobile: Single Column, Desktop: Two Columns */}
              <div className="md:grid md:grid-cols-2 md:gap-0">
                
                {/* LEFT SIDE - Image & Description */}
                <div className="md:flex md:flex-col">
                  {/* Hero Image */}
                  <div className="relative h-56 sm:h-64 md:h-80 lg:h-96">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ui-surface-dark/50 via-transparent to-transparent" />
                  </div>

                  {/* Title & Description - Desktop Only */}
                  <div className="hidden md:block p-6 lg:p-8">
                    <h2
                      className="text-4xl lg:text-5xl mb-3"
                      style={{
                        fontFamily: 'Dancing Script, cursive',
                        color: 'var(--primary-red)',
                        fontWeight: '800',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {food.name}
                    </h2>
                    <p className="text-ui-gray-medium text-base italic mb-4">
                      {food.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-primary-red">
                        Rs {food.price.toFixed(2)}
                      </span>
                      {food.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-accent-yellow text-accent-yellow" />
                          <span className="text-primary-white font-bold">{food.rating}</span>
                          <span className="text-ui-gray-medium text-sm">({food.reviews?.length || 0})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - Options & Actions */}
                <div className="p-4 sm:p-6 md:p-6 lg:p-8 space-y-4 md:space-y-5 pb-24 md:pb-6 md:overflow-y-auto md:max-h-[90vh]">
                  
                  {/* Header - Mobile Only */}
                  <div className="md:hidden">
                    <h2
                      className="text-3xl sm:text-4xl mb-2"
                      style={{
                        fontFamily: 'Dancing Script, cursive',
                        color: 'var(--primary-red)',
                        fontWeight: '800',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {food.name}
                    </h2>
                    <p className="text-ui-gray-medium text-sm italic mb-3">
                      {food.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-bold text-primary-red">
                        Rs {food.price.toFixed(2)}
                      </span>
                      {food.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent-yellow text-accent-yellow" />
                          <span className="text-primary-white font-bold text-sm">{food.rating}</span>
                          <span className="text-ui-gray-medium text-sm">({food.reviews?.length || 0})</span>
                        </div>
                      )}
                    </div>
                  </div>

                {/* Spice Level Selector */}
                {food.spiceLevels && food.spiceLevels.length > 0 && (
                  <div>
                    <h3 className="text-primary-white font-bold mb-3 flex items-center gap-2 text-sm md:text-base">
                      Choose your spice level <Flame className="h-4 w-4 md:h-5 md:w-5 text-primary-red" />
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {food.spiceLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedSpice(level)}
                          className={`px-4 sm:px-5 md:px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                            selectedSpice === level
                              ? 'bg-primary-red text-primary-white scale-105'
                              : 'bg-ui-gray-dark text-ui-gray-medium hover:bg-ui-gray-medium hover:text-primary-white'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {food.addOns && food.addOns.length > 0 && (
                  <div>
                    <h3 className="text-primary-white font-bold mb-3 text-sm md:text-base">Add-ons</h3>
                    <div className="space-y-2">
                      {food.addOns.map((addOn) => (
                        <label
                          key={addOn.name}
                          className="flex items-center justify-between p-3 bg-ui-gray-dark rounded-lg 
                                     cursor-pointer hover:bg-ui-gray-medium transition-colors duration-300"
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(addOn.name)}
                              onChange={() => toggleAddOn(addOn.name)}
                              className="w-4 h-4 md:w-5 md:h-5 accent-primary-red cursor-pointer"
                            />
                            <span className="text-primary-white text-sm md:text-base">{addOn.name}</span>
                          </div>
                          <span className="text-accent-yellow font-bold text-sm md:text-base whitespace-nowrap ml-2">
                            +Rs {addOn.price.toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <h3 className="text-primary-white font-bold mb-3 text-sm md:text-base">Quantity</h3>
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      onClick={() => handleUpdateQuantity(quantity - 1)}
                      className="bg-ui-gray-dark text-primary-white p-2 md:p-3 rounded-lg hover:bg-primary-red 
                                 transition-colors duration-300"
                    >
                      <Minus className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <span className="text-xl md:text-2xl font-bold text-primary-white w-10 md:w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(quantity + 1)}
                      className="bg-ui-gray-dark text-primary-white p-2 md:p-3 rounded-lg hover:bg-primary-red 
                                 transition-colors duration-300"
                    >
                      <Plus className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>

                {/* Reviews */}
                {food.reviews && food.reviews.length > 0 && (
                  <div>
                    <h3 className="text-primary-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                      Reviews ({food.reviews.length})
                      <Star className="h-4 w-4 md:h-5 md:w-5 fill-accent-yellow text-accent-yellow" />
                    </h3>
                    <div className="space-y-3 md:space-y-4 max-h-48 md:max-h-60 overflow-y-auto">
                      {food.reviews.map((review, index) => (
                        <div key={index} className="bg-ui-gray-dark p-3 md:p-4 rounded-lg">
                          <div className="flex items-start gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-red flex items-center justify-center text-primary-white font-bold text-sm md:text-base flex-shrink-0">
                              {review.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-primary-white font-bold text-sm md:text-base">{review.name}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 md:h-4 md:w-4 ${
                                        i < review.rating
                                          ? 'fill-accent-yellow text-accent-yellow'
                                          : 'text-ui-gray-medium'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-ui-gray-medium text-xs md:text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                  {/* Add to Cart Button - Fixed at bottom */}
                  <div className="sticky bottom-0 left-0 right-0 bg-ui-surface-dark/95 backdrop-blur-sm pt-3 md:pt-4 pb-2 border-t border-ui-gray-dark mt-6">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className="text-ui-gray-medium text-sm md:text-base">Total Price:</span>
                      <span className="text-2xl md:text-3xl font-bold text-primary-red">
                        Rs {calculateTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-primary-red to-accent-orange text-primary-white 
                                 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3
                                 hover:shadow-lg hover:shadow-primary-red/50 transition-all duration-300
                                 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                      {isInCart ? 'Update Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
                {/* End RIGHT SIDE */}
                
              </div>
              {/* End Grid */}
            </div>
            {/* End Scrollable Content */}
          </motion.div>
          </div>
          {/* End Modal Wrapper */}
        </>
      )}
    </AnimatePresence>
  );
};

export default FoodDetailModal;

