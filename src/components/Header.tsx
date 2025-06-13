
import React, { useState, useRef } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import CartDrawer from './CartDrawer';
import AccountMenu from './AccountMenu';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  
  // Safe access to context values with fallbacks
  const cart = useCart();
  const wishlist = useWishlist();
  const auth = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const cartCount = cart?.cartCount || 0;
  const wishlistCount = wishlist?.wishlistCount || 0;
  const isAuthenticated = auth?.isAuthenticated || false;

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
    <header className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-2 shadow-sm sticky top-0 z-50" style={{ backgroundColor: '#001c39' }}>
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
          onError={(e) => {
            console.error('Logo failed to load');
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 text-sm">
        <button
          onClick={() => navigate('/')}
          className="transition-colors"
          style={{ color: '#C8A157' }}
        >
          Home
        </button>
        
        <button
          onClick={() => navigate('/about')}
          className="transition-colors"
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
            className="transition-colors flex items-center group" 
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
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors first:rounded-t-md last:rounded-b-md"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/lab-grown-diamonds')}
          className="transition-colors"
          style={{ color: '#C8A157' }}
        >
          Lab Grown Diamonds
        </button>
        
        <button
          onClick={() => navigate('/contact')}
          className="transition-colors"
          style={{ color: '#C8A157' }}
        >
          Contact Us
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
          style={{ color: '#C8A157' }}
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-white/10 relative h-8 w-8 md:h-10 md:w-10"
          style={{ color: '#C8A157' }}
          onClick={handleWishlistClick}
        >
          <Heart className="h-4 w-4 md:h-5 md:w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 h-8 w-8 md:h-10 md:w-10" style={{ color: '#C8A157' }}>
              <User className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
            style={{ color: '#C8A157' }}
            onClick={handleUserAction}
          >
            <User className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="hover:bg-white/10 relative h-8 w-8 md:h-10 md:w-10" style={{ color: '#C8A157' }}>
            <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="text-white px-2 py-1 md:px-4 md:py-2 rounded-full hover:opacity-80 text-xs md:text-sm hidden sm:block"
          style={{ backgroundColor: '#C8A157' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
          style={{ color: '#C8A157' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation - Desktop-like layout */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 shadow-lg border-t z-50 min-w-full overflow-x-auto" style={{ backgroundColor: '#001c39' }}>
          <div className="flex flex-row items-center justify-start p-4 space-x-6 min-w-max">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="transition-colors whitespace-nowrap text-sm font-medium"
              style={{ color: '#C8A157' }}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="transition-colors whitespace-nowrap text-sm font-medium"
              style={{ color: '#C8A157' }}
            >
              About Us
            </button>
            
            {/* Mobile Collections Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="transition-colors flex items-center whitespace-nowrap text-sm font-medium" style={{ color: '#C8A157' }}>
                  Collections
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg z-50">
                {collectionItems.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100"
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
              className="transition-colors whitespace-nowrap text-sm font-medium"
              style={{ color: '#C8A157' }}
            >
              Lab Grown Diamonds
            </button>
            
            <button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="transition-colors whitespace-nowrap text-sm font-medium"
              style={{ color: '#C8A157' }}
            >
              Contact Us
            </button>
            
            <Button
              className="text-white px-4 py-2 rounded-full hover:opacity-80 text-sm whitespace-nowrap ml-4"
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
