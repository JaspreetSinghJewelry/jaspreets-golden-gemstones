
import React, { useState, useRef } from 'react';
import { Search, ShoppingBag, User, Heart, ChevronDown } from 'lucide-react';
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
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
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

  const handleUserAction = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  return (
    <header className="flex flex-col gap-2 px-3 sm:px-5 md:px-10 lg:px-24 py-2 shadow-sm sticky top-0 z-50 bg-[#001c39]">
      {/* Top Row: Logo and Actions */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
            alt="Jaspreet Singh Jewelry" 
            className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
          />
        </div>
        
        {/* Header Actions (right side) */}
        <div className="flex items-center space-x-1 md:space-x-4">
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
        </div>
      </div>

      {/* Navigation Bar */}
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-center space-x-6 text-sm">
        <button onClick={() => navigate('/')} className="transition-colors" style={{ color: '#C8A157' }}>
          Home
        </button>
        <button onClick={() => navigate('/about')} className="transition-colors" style={{ color: '#C8A157' }}>
          About Us
        </button>
        {/* Collections Dropdown */}
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
        <button onClick={() => navigate('/lab-grown-diamonds')} className="transition-colors" style={{ color: '#C8A157' }}>
          Lab Grown Diamonds
        </button>
        <button onClick={() => navigate('/contact')} className="transition-colors" style={{ color: '#C8A157' }}>
          Contact Us
        </button>
        <Button
          className="text-white px-2 py-1 md:px-4 md:py-2 rounded-full hover:opacity-80 text-xs md:text-sm"
          style={{ backgroundColor: '#C8A157' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </nav>

      {/* Mobile Navigation - Always Visible in Header */}
      <nav className="flex lg:hidden items-center w-full overflow-x-auto space-x-2 scrollbar-thin" style={{ WebkitOverflowScrolling: "touch" }}>
        <button
          onClick={() => navigate('/')}
          className="transition-colors whitespace-nowrap text-xs font-medium px-3 py-2 rounded-full"
          style={{ color: '#C8A157', background: 'transparent' }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/about')}
          className="transition-colors whitespace-nowrap text-xs font-medium px-3 py-2 rounded-full"
          style={{ color: '#C8A157', background: 'transparent' }}
        >
          About Us
        </button>
        {/* Mobile Collections Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="transition-colors flex items-center whitespace-nowrap text-xs font-medium px-3 py-2 rounded-full" style={{ color: '#C8A157', background: 'transparent' }}>
              Collections
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border shadow-lg z-50">
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
        <button
          onClick={() => navigate('/lab-grown-diamonds')}
          className="transition-colors whitespace-nowrap text-xs font-medium px-3 py-2 rounded-full"
          style={{ color: '#C8A157', background: 'transparent' }}
        >
          Lab Grown Diamonds
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="transition-colors whitespace-nowrap text-xs font-medium px-3 py-2 rounded-full"
          style={{ color: '#C8A157', background: 'transparent' }}
        >
          Contact Us
        </button>
        <Button
          className="text-white px-3 py-2 rounded-full hover:opacity-80 text-xs whitespace-nowrap"
          style={{ backgroundColor: '#C8A157' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </nav>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        triggerRef={searchButtonRef}
      />
    </header>
  );
};
export default Header;
