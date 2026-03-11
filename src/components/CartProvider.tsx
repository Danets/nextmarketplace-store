'use client';

import React, { createContext, useContext } from 'react';
import { useCartManager } from '@/lib/hooks/useCartManager';
import { CartItem, Product } from '@/types';

/**
 * CartContextType - Interface Segregation: Only expose needed cart operations
 */
interface CartContextType {
    items: CartItem[];
    isLoading: boolean;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider - Single Responsibility: Provide cart context
 * Dependency Inversion: Uses useCartManager abstraction
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
    const cart = useCartManager();

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

/**
 * useCartContext - Consumer hook with error handling
 */
export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within CartProvider');
    }
    return context;
}
