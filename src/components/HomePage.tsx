import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Phone, MapPin, Menu, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import MenuAndFeaturedSections from './MenuAndFeaturedSections';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background JUSHHH Text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-8"
        >
          <h1 
            className="text-[8rem] md:text-[12rem] lg:text-[16rem] select-none"
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontWeight: '700',
              color: 'var(--primary-red)',
              textShadow: '4px 4px 0px var(--primary-red-dark), 8px 8px 0px #990000, 12px 12px 0px #660000',
              transform: 'rotate(-1deg)',
              letterSpacing: '0.05em'
            }}
          >
            JUSHHH
          </h1>
        </motion.div>

        {/* Corner Taglines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Top Left */}
          <div className="absolute top-8 left-8">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl select-none max-w-80"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '800',
                color: 'var(--primary-red)',
                transform: 'rotate(-5deg)'
              }}
            >
              "When flavor explodes, the only word you'll say is JUSHHH."
            </p>
          </div>

          {/* Top Right */}
          <div className="absolute top-8 right-8">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl select-none max-w-80"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '800',
                color: 'var(--primary-red)',
                transform: 'rotate(5deg)'
              }}
            >
              "Stay hungry, stay savage, and never settle for bland bites."
            </p>
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-8 left-8">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl select-none max-w-80"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '800',
                color: 'var(--primary-red)',
                transform: 'rotate(3deg)'
              }}
            >
              "Street vibes, savage flavor — every bite louder than the last."
            </p>
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-8 right-8">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl select-none max-w-80"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '800',
                color: 'var(--primary-red)',
                transform: 'rotate(-3deg)'
              }}
            >
              "Heat, meat, and madness — the triple threat of JUSHHH"
            </p>
          </div>
        </motion.div>

        {/* Burger Image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 flex items-center justify-center"
        >
          <div 
            className="w-[90vw] h-[90vh]"
            style={{
              backgroundImage: 'url(/burger.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
        </motion.div>

      </section>

      {/* Revamped Menu and Featured Sections */}
      <MenuAndFeaturedSections />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-red to-accent-orange text-primary-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 
                className="text-4xl md:text-5xl mb-6"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontWeight: '800'
                }}
              >
                JUSHHH
              </h3>
              <p className="text-primary-white/80 text-lg">Feel the JUSHHH in every bite!</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 
                className="text-2xl mb-6"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontWeight: '700'
                }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-jushhh-yellow transition-colors text-lg font-medium">Menu</a></li>
                <li><a href="#" className="hover:text-jushhh-yellow transition-colors text-lg font-medium">About</a></li>
                <li><a href="#" className="hover:text-jushhh-yellow transition-colors text-lg font-medium">Contact</a></li>
                <li><a href="#" className="hover:text-jushhh-yellow transition-colors text-lg font-medium">Order</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 
                className="text-2xl mb-6"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontWeight: '700'
                }}
              >
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">+1 (555) JUSHHH</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">123 Food Street</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 
                className="text-2xl mb-6"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontWeight: '700'
                }}
              >
                Follow Us
              </h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <motion.a
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  href="#"
                  className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors shadow-lg"
                >
                  <Instagram className="w-7 h-7" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.3, rotate: -15 }}
                  href="#"
                  className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-7 h-7" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  href="#"
                  className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors shadow-lg"
                >
                  <Phone className="w-7 h-7" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-orange-100 text-lg">
              Made with <Heart className="inline w-5 h-5 text-red-300" /> for food lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
