
import React, { useState } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AccountMenu from './AccountMenu';
import { FancyText } from '@/components/ui/fancy-text';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Collections', 'Bridal'
  ];

  const handleUserAction = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a] to-[#1e3a8a] text-white sticky top-0 z-50 shadow-2xl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-[#1e3a8a] py-2">
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
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/266b589d-2d61-4c55-8e5e-53c54e18c97f.png" 
              alt="Company Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-yellow-400 transition-all duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400 hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <Heart className="h-5 w-5" />
            </Button>
            
            {isAuthenticated ? (
              <AccountMenu>
                <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
                  <User className="h-5 w-5" />
                </Button>
              </AccountMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-yellow-400"
                onClick={handleUserAction}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            
            <CartDrawer>
              <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400 relative hover:bg-white/10">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#1e3a8a] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
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
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/30 pt-4">
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
