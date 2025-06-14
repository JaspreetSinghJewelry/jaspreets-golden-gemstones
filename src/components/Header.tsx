
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);
 
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Lab Grown Diamonds', path: '/lab-grown-diamonds' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const collectionItems = [
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
  ];

  const handleUserAction = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  return (
    <header className="flex justify-between items-center px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-2 shadow-sm sticky top-0 z-50" style={{ backgroundColor: '#001c39' }}>
      {/* Logo */}
      <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-12 sm:h-16 md:h-18 lg:h-20 xl:h-24 w-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-4 xl:space-x-6 text-sm flex-shrink">
        <button
          onClick={() => navigate('/')}
          className="transition-colors whitespace-nowrap"
          style={{ color: '#C8A157' }}
        >
          Home
        </button>
        
        <button
          onClick={() => navigate('/about')}
          className="transition-colors whitespace-nowrap"
          style={{ color: '#C8A157' }}
        >
          About Us
        </button>
        
        {/* Collections Dropdown with Hover Animation */}
        <div 
          className="relative"
          onMouseEnter={() => setIsCollectionsHovered(true)}
          onMouseLeave={() => setIsCollectionsHovered(false)}
        >
          <button 
            className="transition-colors flex items-center group whitespace-nowrap" 
            style={{ color: '#C8A157' }}
          >
            Collections
            <ChevronDown className={`h-3 w-3 xl:h-4 xl:w-4 ml-1 transition-transform duration-300 ${isCollectionsHovered ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu with Animation */}
          <div className={`absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-50 transition-all duration-300 transform ${
            isCollectionsHovered 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-2 invisible'
          }`}>
            {collectionItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors first:rounded-t-md last:rounded-b-md"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/lab-grown-diamonds')}
          className="transition-colors whitespace-nowrap"
          style={{ color: '#C8A157' }}
        >
          Lab Grown Diamonds
        </button>
        
        <button
          onClick={() => navigate('/contact')}
          className="transition-colors whitespace-nowrap"
          style={{ color: '#C8A157' }}
        >
          Contact Us
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
          style={{ color: '#C8A157' }}
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-white/10 relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
          style={{ color: '#C8A157' }}
          onClick={handleWishlistClick}
        >
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11" style={{ color: '#C8A157' }}>
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
            style={{ color: '#C8A157' }}
            onClick={handleUserAction}
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="hover:bg-white/10 relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11" style={{ color: '#C8A157' }}>
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:opacity-80 text-xs sm:text-sm hidden sm:block whitespace-nowrap"
          style={{ backgroundColor: '#C8A157' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
          style={{ color: '#C8A157' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation - Cleaner mobile layout */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 shadow-lg border-t z-50 overflow-hidden" style={{ backgroundColor: '#001c39' }}>
          {/* Mobile Shop Now button - prominent placement */}
          <div className="px-4 py-3 border-b border-white/10">
            <Button
              className="text-white w-full py-3 rounded-full hover:opacity-80 text-sm font-medium"
              style={{ backgroundColor: '#C8A157' }}
              onClick={() => {
                navigate('/products');
                setIsMenuOpen(false);
              }}
            >
              Shop Now
            </Button>
          </div>
          
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 transition-colors text-sm font-medium rounded"
              style={{ color: '#C8A157' }}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 transition-colors text-sm font-medium rounded"
              style={{ color: '#C8A157' }}
            >
              About Us
            </button>
            
            {/* Mobile Collections - Expandable */}
            <div className="py-1">
              <div className="text-sm font-medium px-2 py-2" style={{ color: '#C8A157' }}>
                Collections
              </div>
              <div className="pl-4 space-y-1">
                {collectionItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-2 text-sm transition-colors rounded"
                    style={{ color: '#C8A157' }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => {
                navigate('/lab-grown-diamonds');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 transition-colors text-sm font-medium rounded"
              style={{ color: '#C8A157' }}
            >
              Lab Grown Diamonds
            </button>
            
            <button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 transition-colors text-sm font-medium rounded"
              style={{ color: '#C8A157' }}
            >
              Contact Us
            </button>
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
