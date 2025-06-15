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
    <header className="px-2 sm:px-4 py-2 sticky top-0 z-50 w-full bg-white shadow-sm border-b">
      {/* Header Row: Logo, Nav, Actions */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer min-w-[80px] sm:min-w-[100px]"
          onClick={() => navigate('/')}
        >
          <img
            src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png"
            alt="Jaspreet Singh Jewelry"
            className="h-10 sm:h-12 lg:h-16 w-auto"
          />
        </div>

        {/* Navigation - always centered, all links visible regardless of screen size */}
        <nav
          className="
            flex-1
            flex
            justify-center
            items-center
            gap-1 sm:gap-4
            text-xs sm:text-sm
            font-medium
            select-none
          "
        >
          <button
            className="px-2 sm:px-3 py-1 rounded transition-colors hover:bg-neutral-100"
            style={{ color: '#001c39' }}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="px-2 sm:px-3 py-1 rounded transition-colors hover:bg-neutral-100"
            style={{ color: '#001c39' }}
            onClick={() => navigate('/about')}
          >
            About Us
          </button>
          {/* Collections Dropdown - show on all screen sizes as dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center px-2 sm:px-3 py-1 rounded transition-colors hover:bg-neutral-100"
                style={{ color: '#001c39' }}
              >
                Collections
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border shadow-lg z-[99]">
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
            className="px-2 sm:px-3 py-1 rounded transition-colors hover:bg-neutral-100"
            style={{ color: '#001c39' }}
            onClick={() => navigate('/lab-grown-diamonds')}
          >
            Lab Grown Diamonds
          </button>
          <button
            className="px-2 sm:px-3 py-1 rounded transition-colors hover:bg-neutral-100"
            style={{ color: '#001c39' }}
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>
          {/* Shop Now */}
          <Button
            className="rounded-full font-bold transition-colors px-4 py-1 ml-2"
            style={{
              backgroundColor: '#131313',
              color: 'white',
              boxShadow: '0 1px 5px 0 rgba(0,0,0,0.02)'
            }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </nav>

        {/* Header Actions (Right) */}
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-[90px] justify-end ml-2">
          <Button
            ref={searchButtonRef}
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 h-8 w-8"
            style={{ color: '#001c39' }}
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 relative h-8 w-8"
            style={{ color: '#001c39' }}
            onClick={handleWishlistClick}
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold"
                style={{ backgroundColor: '#C8A157' }}>
                {wishlistCount}
              </span>
            )}
          </Button>
          {isAuthenticated ? (
            <AccountMenu>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 h-8 w-8"
                style={{ color: '#001c39' }}
              >
                <User className="h-5 w-5" />
              </Button>
            </AccountMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 h-8 w-8"
              style={{ color: '#001c39' }}
              onClick={handleUserAction}
            >
              <User className="h-5 w-5" />
            </Button>
          )}
          <CartDrawer>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 relative h-8 w-8"
              style={{ color: '#001c39' }}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold"
                  style={{ backgroundColor: '#C8A157' }}>
                  {cartCount}
                </span>
              )}
            </Button>
          </CartDrawer>
        </div>
      </div>
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        triggerRef={searchButtonRef}
      />
    </header>
  );
};

export default Header;
