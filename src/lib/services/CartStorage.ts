/**
 * CartStorage - Interface for cart persistence
 * Interface Segregation: Minimal interface for storage operations
 * Dependency Inversion: Other code depends on this abstraction
 */
import { CartItem } from "@/types";

export interface ICartStorage {
  save(items: CartItem[]): Promise<void>;
  load(): Promise<CartItem[]>;
  clear(): Promise<void>;
}

export class LocalStorageCartStorage implements ICartStorage {
  private readonly storageKey: string;

  constructor(storageKey: string = "nextmarketplace-store-cart") {
    this.storageKey = storageKey;
  }

  async save(items: CartItem[]): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }

  async load(): Promise<CartItem[]> {
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  }

  async clear(): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }
}

export class CartStorage implements ICartStorage {
  private implementation: ICartStorage;

  constructor(implementation?: ICartStorage) {
    this.implementation = implementation || new LocalStorageCartStorage();
  }

  async save(items: CartItem[]): Promise<void> {
    return this.implementation.save(items);
  }

  async load(): Promise<CartItem[]> {
    return this.implementation.load();
  }

  async clear(): Promise<void> {
    return this.implementation.clear();
  }
}
