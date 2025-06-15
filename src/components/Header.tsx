
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AccountMenu from './AccountMenu';
import { useAuth } from '@/hooks/useAuth';
import SearchModal from './SearchModal';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

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
    <header className="flex justify-between items-center px-4 lg:px-16 xl:px-24 py-3 shadow-sm sticky top-0 z-50 bg-white">
      {/* Logo */}
      <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-10 w-auto"
        />
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
        <button
          onClick={() => navigate('/')}
          className="text-gray-800 hover:text-gray-600 transition-colors"
        >
          Home
        </button>
        
        <button
          onClick={() => navigate('/about')}
          className="text-gray-800 hover:text-gray-600 transition-colors"
        >
          About Us
        </button>
        
        {/* Collections Dropdown */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-800 hover:text-gray-600 bg-transparent hover:bg-gray-100 data-[state=open]:bg-gray-100">
                Collections
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-48 gap-1 p-2">
                  {collectionItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors rounded-md"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <button
          onClick={() => navigate('/lab-grown-diamonds')}
          className="text-gray-800 hover:text-gray-600 transition-colors"
        >
          Lab Grown Diamonds
        </button>
        
        <button
          onClick={() => navigate('/contact')}
          className="text-gray-800 hover:text-gray-600 transition-colors"
        >
          Contact Us
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="hover:bg-gray-100 h-10 w-10 text-gray-600"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-gray-100 relative h-10 w-10 text-gray-600"
          onClick={handleWishlistClick}
        >
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-10 w-10 text-gray-600">
              <User className="h-5 w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gray-100 h-10 w-10 text-gray-600"
            onClick={handleUserAction}
          >
            <User className="h-5 w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 relative h-10 w-10 text-gray-600">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        <Button
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm hidden sm:block"
          onClick={() => navigate('/products')}
        >
          Shop
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-gray-100 h-10 w-10 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 text-gray-800 font-medium border-b border-gray-100"
            >
              Home
            </button>
            
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 text-gray-800 font-medium border-b border-gray-100"
            >
              About Us
            </button>
            
            {/* Collections Section */}
            <div className="border-b border-gray-100 pb-3">
              <div className="text-gray-800 font-medium py-2 px-2">
                Collections
              </div>
              <div className="pl-4 space-y-2">
                {collectionItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-2 text-gray-600"
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
              className="block w-full text-left py-3 px-2 text-gray-800 font-medium border-b border-gray-100"
            >
              Lab Grown Diamonds
            </button>
            
            <button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-2 text-gray-800 font-medium border-b border-gray-100"
            >
              Contact Us
            </button>
            
            {/* Shop Now Button for Mobile */}
            <div className="pt-3">
              <Button
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 font-medium"
                onClick={() => {
                  navigate('/products');
                  setIsMenuOpen(false);
                }}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
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
