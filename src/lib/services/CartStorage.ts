/**
 * CartStorage - Interface for cart persistence
 * Interface Segregation: Minimal interface for storage operations
 * Dependency Inversion: Other code depends on this abstraction
 */
import { CartItem } from "@/types";

export interface ICartStorage {
  save(items: CartItem[]): void;
  load(): CartItem[];
  clear(): void;
}

export class LocalStorageCartStorage implements ICartStorage {
  constructor(
    private readonly storageKey: string = "nextmarketplace-store-cart",
  ) {}

  save(items: CartItem[]): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }

  load(): CartItem[] {
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  }

  clear(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }
}

export class CartStorage implements ICartStorage {
  constructor(
    private implementation: ICartStorage = new LocalStorageCartStorage(),
  ) {}

  save(items: CartItem[]): void {
    return this.implementation.save(items);
  }

  load(): CartItem[] {
    return this.implementation.load();
  }

  clear(): void {
    return this.implementation.clear();
  }
}
