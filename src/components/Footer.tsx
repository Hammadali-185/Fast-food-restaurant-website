import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
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
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '600'
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="/burgers" className="text-primary-white/80 hover:text-primary-white transition-colors">🍔 Burgers</a></li>
              <li><a href="/shawarma" className="text-primary-white/80 hover:text-primary-white transition-colors">🌯 Shawarma</a></li>
              <li><a href="/fries" className="text-primary-white/80 hover:text-primary-white transition-colors">🍟 Fries</a></li>
              <li><a href="/beverages" className="text-primary-white/80 hover:text-primary-white transition-colors">🥤 Beverages</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '600'
              }}
            >
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="text-primary-white/80">+92 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="text-primary-white/80">123 Food Street, Karachi</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span className="text-primary-white/80">hello@jushhh.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontWeight: '600'
              }}
            >
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/jushhh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-white/20 hover:bg-primary-white/30 p-3 rounded-full transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://facebook.com/jushhh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-white/20 hover:bg-primary-white/30 p-3 rounded-full transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
            <p className="text-primary-white/60 text-sm mt-4">
              Stay updated with our latest deals and new menu items!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-primary-white/20 mt-12 pt-8 text-center"
        >
          <p className="text-primary-white/60">
            © 2024 JUSHHH. All rights reserved. Made with 🔥 for food lovers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
