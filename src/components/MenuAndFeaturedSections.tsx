import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuAndFeaturedSections: React.FC = () => {
  return (
    <>
      {/* Menu Section */}
      <section className="py-20 px-4 bg-background-dark">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="border-t-4 border-primary-red w-24 mx-auto mb-6 animate-pulse"
            />
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl mb-4 select-none"
              style={{
                fontFamily: 'Dancing Script, cursive',
                color: 'var(--primary-red)',
                fontWeight: '800'
              }}
            >
              Our Menu
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-ui-gray-medium"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '500'
              }}
            >
              Taste the JUSHHH in every bite
            </motion.p>
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Burgers Card */}
            <Link to="/burgers">
              <motion.div
                initial={{ y: 80, opacity: 0, rotate: -5 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden cursor-pointer group"
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
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center"
                    alt="Delicious Burger"
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-primary-red text-primary-white px-3 py-1 rounded-full text-sm font-bold">
                    🔥 HOT
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-3xl md:text-4xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--primary-red)',
                      fontWeight: '800',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    BURGER BEASTS
                  </h3>
                  <p className="text-ui-gray-medium text-sm italic font-medium">
                    "Big, bold, unapologetic."
                  </p>
                </div>
              </div>
              </motion.div>
            </Link>

            {/* Wraps Card */}
            <Link to="/shawarma">
              <motion.div
                initial={{ y: 80, opacity: 0, rotate: 5 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden cursor-pointer group"
              >
              {/* Subtle Scattered Glow - Reduced for Natural Fade */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent-orange/12 via-transparent to-accent-yellow/12 blur-3xl opacity-40"></div>
              
              {/* Hover Edge Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(255, 102, 0, 0.3), inset 0 0 40px rgba(245, 197, 66, 0.2), 0 0 30px rgba(255, 102, 0, 0.4)'
                   }}></div>
              
              {/* Main Card with Edge Fade */}
              <div className="relative m-3 p-6 rounded-2xl shadow-2xl shadow-accent-orange/30 group-hover:shadow-accent-orange/50 transition-shadow duration-500"
                   style={{
                     background: 'radial-gradient(ellipse 120% 120% at center, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0.1) 92%, rgba(0, 0, 0, 0.03) 97%, transparent 100%)',
                     backdropFilter: 'blur(4px)'
                   }}>
                {/* Food Image */}
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop&crop=center"
                    alt="Delicious Shawarma"
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-accent-orange text-primary-white px-3 py-1 rounded-full text-sm font-bold">
                    ⚡ FRESH
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-3xl md:text-4xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--accent-orange)',
                      fontWeight: '800',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    WRAP WARRIORS
                  </h3>
                  <p className="text-ui-gray-medium text-sm italic font-medium">
                    "Tight rolls, wild flavors."
                  </p>
                </div>
              </div>
              </motion.div>
            </Link>

            {/* Fries Card */}
            <Link to="/fries">
              <motion.div
                initial={{ y: 80, opacity: 0, rotate: -3 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden cursor-pointer group"
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
                    src="https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop&crop=center"
                    alt="Crispy Fries"
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-accent-yellow text-primary-white px-3 py-1 rounded-full text-sm font-bold">
                    💥 CRISPY
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-3xl md:text-4xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--accent-yellow)',
                      fontWeight: '800',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    FRY FIREWORKS
                  </h3>
                  <p className="text-ui-gray-medium text-sm italic font-medium">
                    "Crispy chaos unleashed."
                  </p>
                </div>
              </div>
              </motion.div>
            </Link>

            {/* Beverages Card */}
            <Link to="/beverages">
              <motion.div
                initial={{ y: 80, opacity: 0, rotate: 2 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden cursor-pointer group"
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
                    src="https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center"
                    alt="Cold Beverages"
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-primary-red text-primary-white px-3 py-1 rounded-full text-sm font-bold">
                    🥤 COLD
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-3xl md:text-4xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--primary-red)',
                      fontWeight: '800',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    THIRST QUENCHERS
                  </h3>
                  <p className="text-ui-gray-medium text-sm italic font-medium">
                    "Cool drinks for hot moments."
                  </p>
                </div>
              </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Hype Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-primary-red text-primary-white text-center py-3 text-lg font-bold tracking-widest animate-pulse overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          JUSHHH IS HOT RIGHT NOW 🔥 BURGERS • WRAPS • FRIES • BEVERAGES • DEALS
        </motion.div>
      </motion.div>

      {/* Featured Favorites Section */}
      <section className="py-20 px-4 bg-background-dark">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl mb-4 select-none"
              style={{
                fontFamily: 'Dancing Script, cursive',
                color: 'var(--primary-red)',
                fontWeight: '800'
              }}
            >
              🔥 Our Crowd Killers — The JUSHHH Bestsellers
            </h2>
            <p
              className="text-xl md:text-2xl text-ui-gray-medium"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '500'
              }}
            >
              These flavors run the streets.
            </p>
          </motion.div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Spicy Volcano Burger */}
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.3 }
              }}
              className="relative overflow-hidden group"
            >
              {/* Subtle Scattered Glow - Reduced for Natural Fade */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-red/12 via-transparent to-accent-orange/12 blur-3xl opacity-40"></div>
              
              {/* Hover Edge Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(255, 59, 0, 0.3), inset 0 0 40px rgba(255, 102, 0, 0.2), 0 0 30px rgba(255, 59, 0, 0.4)'
                   }}></div>
              
              {/* Main Card with Edge Fade */}
              <div className="relative m-4 p-6 rounded-2xl shadow-2xl shadow-primary-red/30 group-hover:shadow-primary-red/50 transition-shadow duration-500"
                   style={{
                     background: 'radial-gradient(ellipse 120% 120% at center, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0.1) 92%, rgba(0, 0, 0, 0.03) 97%, transparent 100%)',
                     backdropFilter: 'blur(4px)'
                   }}>
                {/* Best Seller Badge */}
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  whileInView={{ rotate: 15, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 -right-3 bg-primary-red text-primary-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg"
                >
                  🔥 BEST SELLER
                </motion.div>

                {/* Food Image */}
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center"
                    alt="Spicy Volcano Burger"
                    className="w-full h-40 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-xl md:text-2xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--primary-red)',
                      fontWeight: '800',
                      textShadow: '2px 2px 0px var(--accent-yellow)'
                    }}
                  >
                    VOLCANO BURGER
                  </h3>
                  <p className="text-ui-gray-medium text-sm font-bold">
                    The ultimate burger experience with explosive flavor.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Loaded Shawarma Wrap */}
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.3 }
              }}
              className="relative overflow-hidden group"
            >
              {/* Subtle Scattered Glow - Reduced for Natural Fade */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent-orange/12 via-transparent to-accent-yellow/12 blur-3xl opacity-40"></div>
              
              {/* Hover Edge Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(255, 102, 0, 0.3), inset 0 0 40px rgba(245, 197, 66, 0.2), 0 0 30px rgba(255, 102, 0, 0.4)'
                   }}></div>
              
              {/* Main Card with Edge Fade */}
              <div className="relative m-4 p-6 rounded-2xl shadow-2xl shadow-accent-orange/30 group-hover:shadow-accent-orange/50 transition-shadow duration-500"
                   style={{
                     background: 'radial-gradient(ellipse 120% 120% at center, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0.1) 92%, rgba(0, 0, 0, 0.03) 97%, transparent 100%)',
                     backdropFilter: 'blur(4px)'
                   }}>
                {/* Best Seller Badge */}
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  whileInView={{ rotate: 15, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 -right-3 bg-accent-orange text-primary-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg"
                >
                  ⚡ BEST SELLER
                </motion.div>

                {/* Food Image */}
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop&crop=center"
                    alt="Loaded Shawarma Wrap"
                    className="w-full h-40 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-xl md:text-2xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--accent-orange)',
                      fontWeight: '800',
                      textShadow: '2px 2px 0px var(--accent-yellow)'
                    }}
                  >
                    LIGHTNING WRAP
                  </h3>
                  <p className="text-ui-gray-medium text-sm font-bold">
                    Bursting with bold sauces and fresh crunch.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Zinger Fries */}
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.3 }
              }}
              className="relative overflow-hidden group"
            >
              {/* Subtle Scattered Glow - Reduced for Natural Fade */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent-yellow/12 via-transparent to-primary-red/12 blur-3xl opacity-40"></div>
              
              {/* Hover Edge Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(245, 197, 66, 0.3), inset 0 0 40px rgba(255, 59, 0, 0.2), 0 0 30px rgba(245, 197, 66, 0.4)'
                   }}></div>
              
              {/* Main Card with Edge Fade */}
              <div className="relative m-4 p-6 rounded-2xl shadow-2xl shadow-accent-yellow/30 group-hover:shadow-accent-yellow/50 transition-shadow duration-500"
                   style={{
                     background: 'radial-gradient(ellipse 120% 120% at center, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0.1) 92%, rgba(0, 0, 0, 0.03) 97%, transparent 100%)',
                     backdropFilter: 'blur(4px)'
                   }}>
                {/* Best Seller Badge */}
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  whileInView={{ rotate: 15, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 -right-3 bg-accent-yellow text-primary-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg"
                >
                  💥 BEST SELLER
                </motion.div>

                {/* Food Image */}
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop&crop=center"
                    alt="Zinger Fries"
                    className="w-full h-40 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3
                    className="text-xl md:text-2xl mb-2"
                    style={{
                      fontFamily: 'Dancing Script, cursive',
                      color: 'var(--accent-yellow)',
                      fontWeight: '800',
                      textShadow: '2px 2px 0px var(--primary-red)'
                    }}
                  >
                    SPICE FRIES
                  </h3>
                  <p className="text-ui-gray-medium text-sm font-bold">
                    Crispy perfection with a spicy kick.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300 text-xl"
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontWeight: '700'
            }}
          >
            Taste the JUSHHH 🔥
          </motion.button>
        </motion.div>
      </section>
    </>
  );
};

export default MenuAndFeaturedSections;
