
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (product: WishlistItem) => {
    console.log('Adding to wishlist:', product);
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (!existingItem) {
        const newItems = [...prevItems, product];
        console.log('Wishlist items after adding:', newItems);
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist`,
        });
        return newItems;
      }
      console.log('Product already in wishlist');
      return prevItems;
    });
  };

  const removeFromWishlist = (id: number) => {
    console.log('Removing from wishlist, ID:', id);
    setWishlistItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        const newItems = prevItems.filter(item => item.id !== id);
        console.log('Wishlist items after removing:', newItems);
        toast({
          title: "Removed from Wishlist",
          description: `${item.name} has been removed from your wishlist`,
        });
        return newItems;
      }
      return prevItems;
    });
  };

  const isInWishlist = (id: number) => {
    const inWishlist = wishlistItems.some(item => item.id === id);
    console.log(`Checking if product ${id} is in wishlist:`, inWishlist);
    return inWishlist;
  };

  const wishlistCount = wishlistItems.length;
  console.log('Current wishlist count:', wishlistCount);

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
