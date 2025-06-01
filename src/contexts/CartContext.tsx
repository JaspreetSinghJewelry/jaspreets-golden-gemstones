
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getCartTotal: () => number;
  cartCount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage on initialization
    try {
      const savedCart = localStorage.getItem('cartItems');
      const parsed = savedCart ? JSON.parse(savedCart) : [];
      console.log('CartContext initialized - Loaded cart from localStorage:', parsed);
      return parsed;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('CartContext - Cart saved to localStorage:', cartItems);
      console.log('CartContext - Current cart count:', cartItems.length);
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to add items to your cart",
        variant: "destructive"
      });
      return;
    }

    console.log('CartContext - Adding to cart:', product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Updated Cart",
          description: `Increased quantity of ${product.name}`,
        });
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('CartContext - Updated cart items:', updatedItems);
        return updatedItems;
      } else {
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart`,
        });
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log('CartContext - New cart items:', newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (id: number) => {
    console.log('CartContext - Removing from cart:', id);
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      const filtered = prevItems.filter(item => item.id !== id);
      console.log('CartContext - Cart after removal:', filtered);
      
      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        });
      }
      
      return filtered;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    console.log('CartContext - Updating quantity:', id, quantity);
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => {
      const updated = prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      console.log('CartContext - Cart after quantity update:', updated);
      return updated;
    });
  };

  const clearCart = () => {
    console.log('CartContext - Clearing cart');
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
    console.log('CartContext - Cart total calculated:', total, 'for items:', cartItems.length);
    return total;
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  console.log('CartContext - Rendering with cart items:', cartItems.length, 'items');

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    cartCount,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
