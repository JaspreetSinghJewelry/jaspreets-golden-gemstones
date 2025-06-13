
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
    <header className="flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-24 py-3 md:py-4 shadow-sm sticky top-0 z-50 responsive-layout" style={{ backgroundColor: '#001c39' }}>
      {/* Logo */}
      <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-4 xl:space-x-6 text-sm">
        <button
          onClick={() => navigate('/')}
          className="transition-colors hover:opacity-80 px-2 py-1 touch-target"
          style={{ color: '#C8A157' }}
        >
          Home
        </button>
        
        <button
          onClick={() => navigate('/about')}
          className="transition-colors hover:opacity-80 px-2 py-1 touch-target"
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
            className="transition-colors hover:opacity-80 flex items-center group px-2 py-1 touch-target" 
            style={{ color: '#C8A157' }}
          >
            Collections
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 ${isCollectionsHovered ? 'rotate-180' : ''}`} />
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
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors first:rounded-t-md last:rounded-b-md touch-target"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/lab-grown-diamonds')}
          className="transition-colors hover:opacity-80 px-2 py-1 touch-target"
          style={{ color: '#C8A157' }}
        >
          Lab Grown Diamonds
        </button>
        
        <button
          onClick={() => navigate('/contact')}
          className="transition-colors hover:opacity-80 px-2 py-1 touch-target"
          style={{ color: '#C8A157' }}
        >
          Contact Us
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="hover:bg-white/10 h-10 w-10 touch-target"
          style={{ color: '#C8A157' }}
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-white/10 relative h-10 w-10 touch-target"
          style={{ color: '#C8A157' }}
          onClick={handleWishlistClick}
        >
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 h-10 w-10 touch-target" style={{ color: '#C8A157' }}>
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-white/10 h-10 w-10 touch-target"
            style={{ color: '#C8A157' }}
            onClick={handleUserAction}
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="hover:bg-white/10 relative h-10 w-10 touch-target" style={{ color: '#C8A157' }}>
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="text-white px-3 py-2 rounded-full hover:opacity-80 text-sm hidden sm:block touch-target"
          style={{ backgroundColor: '#C8A157' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-white/10 h-10 w-10 touch-target"
          style={{ color: '#C8A157' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation - Optimized for mobile */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 shadow-lg border-t z-50 overflow-hidden" style={{ backgroundColor: '#001c39' }}>
          <div className="flex flex-col p-4 space-y-4">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="transition-colors text-left text-base font-medium py-3 touch-target"
              style={{ color: '#C8A157' }}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="transition-colors text-left text-base font-medium py-3 touch-target"
              style={{ color: '#C8A157' }}
            >
              About Us
            </button>
            
            {/* Mobile Collections Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="transition-colors flex items-center justify-between text-base font-medium py-3 touch-target" style={{ color: '#C8A157' }}>
                  Collections
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg z-50 w-full">
                {collectionItems.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100 py-3 text-base touch-target"
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button
              onClick={() => {
                navigate('/lab-grown-diamonds');
                setIsMenuOpen(false);
              }}
              className="transition-colors text-left text-base font-medium py-3 touch-target"
              style={{ color: '#C8A157' }}
            >
              Lab Grown Diamonds
            </button>
            
            <button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="transition-colors text-left text-base font-medium py-3 touch-target"
              style={{ color: '#C8A157' }}
            >
              Contact Us
            </button>
            
            <Button
              className="text-white px-4 py-3 rounded-full hover:opacity-80 text-base mt-4 touch-target"
              style={{ backgroundColor: '#C8A157' }}
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
