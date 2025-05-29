
import React, { useState, useRef } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AccountMenu from './AccountMenu';
import { FancyText } from '@/components/ui/fancy-text';
import { useAuth } from '@/hooks/useAuth';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Collections', 'Bridal'
  ];

  const handleUserAction = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  };

  return (
    <header className="bg-[#0D0C29] text-white sticky top-0 z-50 shadow-2xl">
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
            <Button 
              ref={searchButtonRef}
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-yellow-400 hover:bg-white/10"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-yellow-400 relative hover:bg-white/10"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  {wishlistCount}
                </span>
              )}
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
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#0D0C29] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
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

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        triggerRef={searchButtonRef}
      />
    </header>
  );
};

export default Header;
