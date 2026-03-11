"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/types";
import { CartService } from "@/lib/services";
import { CartStorage } from "@/lib/services/CartStorage";

/**
 * useCartManager - Manages cart state using CartService
 * Single Responsibility: Cart state management
 * Dependency Inversion: Uses CartService abstraction
 */
export function useCartManager() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storage = new CartStorage();
  const cartService = new CartService(storage);

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedItems = await cartService.loadCart();
        setItems(savedItems);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to storage whenever items change
  useEffect(() => {
    if (!isLoading) {
      cartService.saveCart(items).catch((error) => {
        console.error("Failed to save cart:", error);
      });
    }
  }, [items, isLoading, cartService]);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      setItems((prevItems) =>
        cartService.addToCart(prevItems, product, quantity),
      );
    },
    [cartService],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prevItems) => cartService.removeFromCart(prevItems, productId));
    },
    [cartService],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setItems((prevItems) =>
        cartService.updateQuantity(prevItems, productId, quantity),
      );
    },
    [cartService],
  );

  const clearCart = useCallback(() => {
    setItems(cartService.clearCart());
  }, [cartService]);

  const getTotal = useCallback(() => {
    return cartService.getTotal(items);
  }, [items, cartService]);

  const getItemCount = useCallback(() => {
    return cartService.getItemCount(items);
  }, [items, cartService]);

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
