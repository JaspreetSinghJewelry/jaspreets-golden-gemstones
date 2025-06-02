
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

  const navItems = [
    { name: 'Home', path: '/' },
  ];

  const collectionItems = [
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
    <header className="flex justify-between items-center px-24 py-3 shadow-sm sticky top-0 bg-white z-49">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-28 w-auto"
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
       <li>
                  <Link to="/about-us" className="text-gray-600 hover:text-black transition-colors">
                    About Us
                  </Link>
                </li>
                <li>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-black"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-black relative"
          onClick={handleWishlistClick}
        >
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black">
              <User className="h-5 w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-black"
            onClick={handleUserAction}
          >
            <User className="h-5 w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm hidden sm:block"
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
                className="text-black hover:text-gray-600 transition-colors text-left py-2"
              >
                {item.name}
              </button>
            ))}
            <div className="border-b border-gray-200 pb-2">
              <span className="text-black font-medium py-2 block">Collections</span>
              {collectionItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-left py-1 pl-4 block"
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
