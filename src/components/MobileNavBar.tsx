
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/hooks/useAuth';

const MobileNavBar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Collections", path: "/collections" },
    { label: "Lab Grown Diamonds", path: "/lab-grown-diamonds" },
    { label: "Contact Us", path: "/contact" },
  ];

  const collectionItems = [
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
    { name: 'Lab Grown Diamonds', path: '/lab-grown-diamonds' },
  ];

  return (
    <div className="fixed z-[999] top-0 left-0 w-full bg-white border-b shadow-sm flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-3 py-2">
        <div
          onClick={() => navigate('/')}
          className="flex items-center min-w-[48px] cursor-pointer"
        >
          <img
            src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png"
            alt="Logo"
            className="h-8 w-auto"
            style={{maxHeight: '40px'}}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <nav className="flex flex-row gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">
            <button className="mobile-nav-link"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button className="mobile-nav-link"
              onClick={() => navigate('/about')}
            >
              About Us
            </button>
            {/* Collections opens the mobile sheet */}
            <Sheet open={collectionsOpen} onOpenChange={setCollectionsOpen}>
              <SheetTrigger asChild>
                <button
                  className="mobile-nav-link flex items-center"
                  aria-label="Collections"
                  onClick={() => setCollectionsOpen(true)}
                  tabIndex={0}
                >
                  Collections <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-0 rounded-t-lg h-auto min-h-[220px]">
                <SheetHeader className="border-b px-4 py-3 bg-white">
                  <SheetTitle className="text-lg">Collections</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col px-4 py-3">
                  {collectionItems.map((item) => (
                    <button
                      key={item.name}
                      className="py-3 mb-1 text-base text-left w-full text-neutral-800 active:bg-neutral-100 rounded transition"
                      onClick={() => {
                        navigate(item.path);
                        setCollectionsOpen(false);
                      }}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <button className="mobile-nav-link"
              onClick={() => navigate('/lab-grown-diamonds')}
            >
              Lab Grown Diamonds
            </button>
            <button className="mobile-nav-link"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-1 min-w-[48px] ml-3">
          <Button variant="ghost" size="icon" className="relative h-9 w-9 p-0" onClick={() => navigate('/wishlist')}>
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-800 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{wishlistCount}</span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 p-0" onClick={() => navigate('/cart')}>
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-800 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 p-0"
            onClick={() => isAuthenticated ? navigate('/account') : navigate('/auth')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        <Button
          className="ml-2 rounded-full font-bold px-5 py-2 text-white text-base bg-[#222] shadow mobile-nav-shop-btn hidden xs:inline-flex"
          style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'}}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default MobileNavBar;
