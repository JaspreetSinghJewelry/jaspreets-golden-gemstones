
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
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: '#001c39' }}>
      {/* Main Header */}
      <div className="flex justify-between items-center px-3 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-2">
        {/* Logo */}
        <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
          <img 
            src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
            alt="Jaspreet Singh Jewelry" 
            className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto"
          />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-sm">
          <button
            onClick={() => navigate('/')}
            className="transition-colors whitespace-nowrap hover:opacity-80"
            style={{ color: '#C8A157' }}
          >
            Home
          </button>
          
          <button
            onClick={() => navigate('/about')}
            className="transition-colors whitespace-nowrap hover:opacity-80"
            style={{ color: '#C8A157' }}
          >
            About Us
          </button>
          
          {/* Collections with NavigationMenu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="transition-colors bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 text-sm font-medium"
                  style={{ color: '#C8A157' }}
                >
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
            className="transition-colors whitespace-nowrap hover:opacity-80"
            style={{ color: '#C8A157' }}
          >
            Lab Grown Diamonds
          </button>
          
          <button
            onClick={() => navigate('/contact')}
            className="transition-colors whitespace-nowrap hover:opacity-80"
            style={{ color: '#C8A157' }}
          >
            Contact Us
          </button>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Button 
            ref={searchButtonRef}
            variant="ghost" 
            size="icon" 
            className="hover:bg-white/10 h-9 w-9 touch-target"
            style={{ color: '#C8A157' }}
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-white/10 relative h-9 w-9 touch-target"
            style={{ color: '#C8A157' }}
            onClick={handleWishlistClick}
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
                {wishlistCount}
              </span>
            )}
          </Button>
          
          {isAuthenticated ? (
            <AccountMenu>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 h-9 w-9 touch-target" style={{ color: '#C8A157' }}>
                <User className="h-4 w-4" />
              </Button>
            </AccountMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-white/10 h-9 w-9 touch-target"
              style={{ color: '#C8A157' }}
              onClick={handleUserAction}
            >
              <User className="h-4 w-4" />
            </Button>
          )}
          
          <CartDrawer>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 relative h-9 w-9 touch-target" style={{ color: '#C8A157' }}>
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold" style={{ backgroundColor: '#C8A157' }}>
                  {cartCount}
                </span>
              )}
            </Button>
          </CartDrawer>

          <Button
            className="text-white px-3 py-1 rounded-full hover:opacity-80 text-sm hidden sm:block touch-target"
            style={{ backgroundColor: '#C8A157' }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-white/10 h-9 w-9 touch-target"
            style={{ color: '#C8A157' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: '#001c39' }}>
          <div className="px-4 py-4 space-y-1">
            {/* Main Navigation Items */}
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-3 transition-colors text-base font-medium rounded-md hover:bg-white/5"
              style={{ color: '#C8A157' }}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-3 transition-colors text-base font-medium rounded-md hover:bg-white/5"
              style={{ color: '#C8A157' }}
            >
              About Us
            </button>
            
            {/* Collections Section */}
            <div className="py-2">
              <div className="text-base font-semibold py-2 px-3" style={{ color: '#C8A157' }}>
                Collections
              </div>
              <div className="pl-6 space-y-1">
                {collectionItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 text-sm transition-colors rounded-md hover:bg-white/5"
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
              className="block w-full text-left py-3 px-3 transition-colors text-base font-medium rounded-md hover:bg-white/5"
              style={{ color: '#C8A157' }}
            >
              Lab Grown Diamonds
            </button>
            
            <button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-3 transition-colors text-base font-medium rounded-md hover:bg-white/5"
              style={{ color: '#C8A157' }}
            >
              Contact Us
            </button>
            
            {/* Shop Now Button for Mobile */}
            <div className="pt-4 px-3">
              <Button
                className="w-full text-white py-3 rounded-full hover:opacity-80 text-base font-medium touch-target"
                style={{ backgroundColor: '#C8A157' }}
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
