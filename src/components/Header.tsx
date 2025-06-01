
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AccountMenu from './AccountMenu';
import { useAuth } from '@/hooks/useAuth';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
  ];

  const handleUserAction = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/266b589d-2d61-4c55-8e5e-53c54e18c97f.png" 
          alt="Company Logo" 
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-2xl font-bold tracking-wide text-rose-600 ml-2">Jaspreet Singh</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 text-sm">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="hover:text-rose-500 transition-colors"
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-rose-500"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-rose-500 relative"
          onClick={handleWishlistClick}
        >
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-rose-500">
              <User className="h-5 w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-rose-500"
            onClick={handleUserAction}
          >
            <User className="h-5 w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-rose-500 relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 text-sm hidden sm:block"
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="hover:text-rose-500 transition-colors text-left py-2"
              >
                {item.name}
              </button>
            ))}
            <Button
              className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 text-sm mt-4"
              onClick={() => {
                navigate('/products');
                setIsMenuOpen(false);
              }}
            >
              Shop Now
            </Button>
          </div>
        </nav>
      )}

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        triggerRef={searchButtonRef}
      />
    </header>
  );
};

export default Header;
