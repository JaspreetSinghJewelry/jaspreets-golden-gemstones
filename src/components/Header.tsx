
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
    <header className="bg-[#1F1E39] text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] py-2">
        <div className="container mx-auto px-4 text-center text-sm font-medium">
          <FancyText variant="elegant">
            Free Shipping on Orders Above ₹10,000 | Certified Jewelry
          </FancyText>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-[#1F1E39] font-bold text-lg">JS</span>
            </div>
            <div>
              <FancyText variant="glow" className="text-xl font-bold">
                Jaspreet Singh
              </FancyText>
              <p className="text-sm text-yellow-400">Jewelry</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-yellow-400"
              onClick={() => navigate('/signin')}
            >
              <User className="h-5 w-5" />
            </Button>
            <CartDrawer>
              <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400 relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#1F1E39] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </CartDrawer>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
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
