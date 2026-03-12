"use client";

import { useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { CartService } from "@/lib/services";
import { CartStorage } from "@/lib/services/CartStorage";

// Initialize services once - singleton pattern
const cartService = new CartService(new CartStorage());

/**
 * useCartManager - Manages cart state using CartService
 * Single Responsibility: Cart state management
 * Dependency Inversion: Uses CartService abstraction
 * React 19 Optimization: Removed useCallback, relies on compiler optimization
 */
export function useCartManager() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from storage on mount
  useEffect(() => {
    try {
      const savedItems = cartService.loadCart();
      setItems(savedItems);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to storage whenever items change
  useEffect(() => {
    if (!isLoading) {
      try {
        cartService.saveCart(items);
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    }
  }, [items, isLoading]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) =>
      cartService.addToCart(prevItems, product, quantity),
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => cartService.removeFromCart(prevItems, productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) =>
      cartService.updateQuantity(prevItems, productId, quantity),
    );
  };

  const clearCart = () => {
    setItems(cartService.clearCart());
  };

  const getTotal = () => {
    return cartService.getTotal(items);
  };

  const getItemCount = () => {
    return cartService.getItemCount(items);
  };

  return {
    items,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };
}
