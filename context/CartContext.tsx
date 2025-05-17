import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { CartItem, Product } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  isInCart: () => false,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'ecommerce_cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from storage on initial load
  useEffect(() => {
    const loadCart = async () => {
      try {
        // On web, use localStorage instead of SecureStore
        if (Platform.OS === 'web') {
          const storedCart = localStorage.getItem(STORAGE_KEY);
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        } else {
          const storedCart = await SecureStore.getItemAsync(STORAGE_KEY);
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        const jsonValue = JSON.stringify(cartItems);
        if (Platform.OS === 'web') {
          localStorage.setItem(STORAGE_KEY, jsonValue);
        } else {
          await SecureStore.setItemAsync(STORAGE_KEY, jsonValue);
        }
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    };

    if (cartItems.length > 0) {
      saveCart();
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // If item doesn't exist, add it with quantity
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (Platform.OS === 'web') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      SecureStore.deleteItemAsync(STORAGE_KEY);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getTotalItems, 
        getTotalPrice,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};