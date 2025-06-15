
import React, { useRef, useState } from 'react';
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

  // For tanishq style: Collections is handled as a fullscreen sheet/modal on mobile
  const collectionItems = [
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
    //... add more if needed
  ];

  return (
    <div className="fixed z-[999] top-0 left-0 w-full bg-white border-b flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <div
          onClick={() => navigate('/')}
          className="flex items-center min-w-[50px] cursor-pointer"
        >
          <img
            src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png"
            alt="Logo"
            className="h-8 w-auto"
            style={{maxHeight: '40px'}}
          />
        </div>
        <div className="flex items-center gap-2">
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
      </div>
      {/* Scrollable nav */}
      <nav className="flex flex-row items-center overflow-x-auto gap-2 px-2 pb-2 no-scrollbar whitespace-nowrap">
        <button className="px-4 py-2 rounded-full font-semibold text-neutral-900 bg-neutral-100 active:bg-neutral-200 transition text-sm"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          Home
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-neutral-900 bg-neutral-100 active:bg-neutral-200 transition text-sm"
          onClick={() => navigate('/about')}
          aria-label="About Us"
        >
          About Us
        </button>
        {/* Collections opens the mobile sheet */}
        <Sheet open={collectionsOpen} onOpenChange={setCollectionsOpen}>
          <SheetTrigger asChild>
            <button
              className="px-4 py-2 rounded-full font-semibold text-neutral-900 bg-neutral-100 active:bg-neutral-200 transition flex items-center text-sm"
              aria-label="Collections"
              onClick={() => setCollectionsOpen(true)}
              tabIndex={0}
            >
              Collections <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-0 rounded-t-lg h-auto min-h-[220px]">
            <SheetHeader className="border-b px-4 py-3">
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
        <button className="px-4 py-2 rounded-full font-semibold text-neutral-900 bg-neutral-100 active:bg-neutral-200 transition text-sm"
          onClick={() => navigate('/lab-grown-diamonds')}
          aria-label="Lab Grown Diamonds"
        >
          Lab Grown Diamonds
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-neutral-900 bg-neutral-100 active:bg-neutral-200 transition text-sm"
          onClick={() => navigate('/contact')}
          aria-label="Contact Us"
        >
          Contact Us
        </button>
        <Button
          className="rounded-full font-bold px-6 py-2 text-white ml-2 text-base bg-[#222] whitespace-nowrap"
          style={{ boxShadow: '0 1px 5px 0 rgba(0,0,0,0.02)' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </nav>
    </div>
  );
};

export default MobileNavBar;

