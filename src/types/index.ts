// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  categoryId: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  features?: string[];
  createdAt: Date;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Review types
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: Date;
}
