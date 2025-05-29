
import React, { useState } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import { FancyText } from '@/components/ui/fancy-text';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const navItems = [
    'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Collections', 'Bridal'
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white sticky top-0 z-50 shadow-2xl animate-fade-in">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-yellow-300 to-pink-400 text-gray-800 py-2 animate-pulse">
        <div className="container mx-auto px-4 text-center text-sm font-medium">
          <FancyText variant="elegant" className="animate-bounce">
            Free Shipping on Orders Above ₹10,000 | Certified Jewelry
          </FancyText>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer transform hover:scale-110 transition-all duration-300 animate-slide-in-left" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-spin" style={{animationDuration: '3s'}}>
              <span className="text-gray-800 font-bold text-lg">JS</span>
            </div>
            <div>
              <FancyText variant="glow" className="text-xl font-bold animate-pulse">
                Jaspreet Singh
              </FancyText>
              <p className="text-sm text-yellow-300 animate-bounce">Jewelry</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className="hover:text-yellow-300 transition-all duration-300 font-medium transform hover:scale-110 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-300 transform hover:scale-125 transition-all duration-300 animate-bounce">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-300 transform hover:scale-125 transition-all duration-300 animate-pulse">
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-yellow-300 transform hover:scale-125 transition-all duration-300"
              onClick={() => navigate('/signin')}
            >
              <User className="h-5 w-5" />
            </Button>
            <CartDrawer>
              <Button variant="ghost" size="icon" className="text-white hover:text-yellow-300 relative transform hover:scale-125 transition-all duration-300 animate-bounce">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-300 to-pink-400 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Button>
            </CartDrawer>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white transform hover:scale-125 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/30 pt-4 animate-slide-in-up">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-yellow-300 transition-colors duration-200 transform hover:scale-105 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
