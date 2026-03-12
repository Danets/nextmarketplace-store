/**
 * CartService - Handles all cart business logic
 * Single Responsibility: Manage cart operations
 * Dependency Inversion: Depends on abstractions (CartStorage)
 */
import { CartItem, Product } from "@/types";
import { CartStorage } from "./CartStorage";

export class CartService {
  constructor(private storage: CartStorage) {}

  addToCart(items: CartItem[], product: Product, quantity: number): CartItem[] {
    const existingItemIndex = items.findIndex(
      (item) => item.productId === product.id,
    );

    if (existingItemIndex !== -1) {
      const updated = [...items];
      updated[existingItemIndex] = {
        ...updated[existingItemIndex],
        quantity: updated[existingItemIndex].quantity + quantity,
      };
      return updated;
    }

    return [...items, { productId: product.id, quantity, product }];
  }

  removeFromCart(items: CartItem[], productId: string): CartItem[] {
    return items.filter((item) => item.productId !== productId);
  }

  updateQuantity(
    items: CartItem[],
    productId: string,
    quantity: number,
  ): CartItem[] {
    if (quantity <= 0) {
      return this.removeFromCart(items, productId);
    }

    return items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item,
    );
  }

  clearCart(): CartItem[] {
    return [];
  }

  getTotal(items: CartItem[]): number {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  getItemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  saveCart(items: CartItem[]): void {
    this.storage.save(items);
  }

  loadCart(): CartItem[] {
    return this.storage.load();
  }
}
