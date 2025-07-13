import { useState, useEffect } from 'react';
import { CartItem } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => 
        cartItem.menuItemId === item.menuItemId && 
        cartItem.variantId === item.variantId
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      saveCart(updatedItems);
    } else {
      saveCart([...cartItems, item]);
    }
  };

  const updateQuantity = (menuItemId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId, variantId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.menuItemId === menuItemId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    );
    saveCart(updatedItems);
  };

  const removeFromCart = (menuItemId: string, variantId: string) => {
    const updatedItems = cartItems.filter(
      item => !(item.menuItemId === menuItemId && item.variantId === variantId)
    );
    saveCart(updatedItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalAmount,
    getTotalItems,
  };
};