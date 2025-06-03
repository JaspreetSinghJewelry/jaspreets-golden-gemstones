
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
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);

 
  const collectionItems = [
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
  ];
 
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact' },
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
    <header className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-2 shadow-sm sticky top-0 bg-white z-50">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 text-sm">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="text-black hover:text-gray-600 transition-colors"
          >
            {item.name}
          </button>
        ))}
        
        {/* Collections Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-black hover:text-gray-600 transition-colors flex items-center">
              Collections
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border shadow-lg">
            {collectionItems.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => navigate(item.path)}
                className="cursor-pointer hover:bg-gray-100"
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-black h-8 w-8 md:h-10 md:w-10"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-black relative h-8 w-8 md:h-10 md:w-10"
          onClick={handleWishlistClick}
        >
          <Heart className="h-4 w-4 md:h-5 md:w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-black text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black h-8 w-8 md:h-10 md:w-10">
              <User className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-black h-8 w-8 md:h-10 md:w-10"
            onClick={handleUserAction}
          >
            <User className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black relative h-8 w-8 md:h-10 md:w-10">
            <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-black text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="bg-black text-white px-2 py-1 md:px-4 md:py-2 rounded-full hover:bg-gray-800 text-xs md:text-sm hidden sm:block"
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600 h-8 w-8 md:h-10 md:w-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
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
                className="text-black hover:text-gray-600 transition-colors text-left py-2 text-sm md:text-base"
              >
                {item.name}
              </button>
            ))}
            <div className="border-b border-gray-200 pb-2">
              <span className="text-black font-medium py-2 block text-sm md:text-base">Collections</span>
              {collectionItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-left py-1 pl-4 block text-sm"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <Button
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm mt-4"
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
