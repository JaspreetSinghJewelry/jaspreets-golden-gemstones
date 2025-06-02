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
  const { isAuthenticated, isSessionValid } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage on initialization with validation
    try {
      if (!isSessionValid()) {
        return [];
      }
      const savedCart = localStorage.getItem('cartItems');
      if (!savedCart) return [];
      
      const parsed = JSON.parse(savedCart);
      // Validate cart data structure
      if (!Array.isArray(parsed)) return [];
      
      const validatedCart = parsed.filter(item => 
        item && 
        typeof item.id === 'number' && 
        typeof item.name === 'string' && 
        typeof item.price === 'string' && 
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        item.quantity <= 99 // Maximum quantity limit
      );
      
      console.log('CartContext initialized - Loaded cart from localStorage:', validatedCart);
      return validatedCart;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (!isSessionValid()) {
      setCartItems([]);
      return;
    }

    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('CartContext - Cart saved to localStorage:', cartItems);
      console.log('CartContext - Current cart count:', cartItems.length);
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
      toast({
        title: "Storage Error",
        description: "Failed to save cart data",
        variant: "destructive"
      });
    }
  }, [cartItems, isSessionValid]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const validateProduct = (product: Omit<CartItem, 'quantity'>): boolean => {
    return !!(
      product &&
      typeof product.id === 'number' &&
      product.id > 0 &&
      typeof product.name === 'string' &&
      product.name.trim().length > 0 &&
      typeof product.price === 'string' &&
      product.price.trim().length > 0 &&
      typeof product.image === 'string'
    );
  };

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    if (!validateProduct(product)) {
      toast({
        title: "Invalid Product",
        description: "Cannot add invalid product to cart",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Added to Cart",
        description: `${product.name} added! Sign in to complete your purchase.`,
      });
    }

    console.log('CartContext - Adding to cart:', product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check maximum quantity limit
        if (existingItem.quantity >= 99) {
          toast({
            title: "Quantity Limit",
            description: "Maximum quantity reached for this item",
            variant: "destructive"
          });
          return prevItems;
        }

        if (isAuthenticated) {
          toast({
            title: "Updated Cart",
            description: `Increased quantity of ${product.name}`,
          });
        }
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        );
        console.log('CartContext - Updated cart items:', updatedItems);
        return updatedItems;
      } else {
        // Check total cart limit
        if (prevItems.length >= 50) {
          toast({
            title: "Cart Limit",
            description: "Maximum number of different items in cart reached",
            variant: "destructive"
          });
          return prevItems;
        }

        if (isAuthenticated) {
          toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart`,
          });
        }
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log('CartContext - New cart items:', newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (id: number) => {
    if (typeof id !== 'number' || id <= 0) {
      console.error('Invalid product ID for removal:', id);
      return;
    }

    console.log('CartContext - Removing from cart:', id);
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        const filtered = prevItems.filter(item => item.id !== id);
        console.log('CartContext - Cart after removal:', filtered);
        toast({
          title: "Removed from Cart",
          description: "Item has been removed from your cart",
        });
        return filtered;
      }
      return prevItems;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (typeof id !== 'number' || id <= 0 || typeof quantity !== 'number') {
      console.error('Invalid parameters for quantity update:', { id, quantity });
      return;
    }

    console.log('CartContext - Updating quantity:', id, quantity);
    
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    // Validate quantity bounds
    const validQuantity = Math.max(1, Math.min(quantity, 99));
    
    setCartItems(prevItems => {
      const updated = prevItems.map(item =>
        item.id === id ? { ...item, quantity: validQuantity } : item
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
    try {
      const total = cartItems.reduce((total, item) => {
        const priceStr = item.price.replace(/[₹,]/g, '');
        const price = parseInt(priceStr);
        if (isNaN(price)) {
          console.error('Invalid price format:', item.price);
          return total;
        }
        return total + (price * item.quantity);
      }, 0);
      console.log('CartContext - Cart total calculated:', total, 'for items:', cartItems.length);
      return total;
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  console.log('CartContext - Rendering with cart items:', cartItems.length, 'items');

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      cartCount,
      clearCart
    }}>
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
