import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest electronic devices and gadgets",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    slug: "electronics",
    productCount: 45,
  },
  {
    id: "2",
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
    slug: "fashion",
    productCount: 120,
  },
  {
    id: "3",
    name: "Home & Garden",
    description: "Everything for your home",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    slug: "home-garden",
    productCount: 85,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    ],
    category: "Electronics",
    categoryId: "1",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    discount: 33,
    features: [
      "Active Noise Cancellation",
      "30-hour battery",
      "Bluetooth 5.0",
      "Foldable design",
    ],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "4K Webcam",
    description:
      "Professional 4K webcam for streaming and video calls with built-in microphone.",
    price: 149.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
    ],
    category: "Electronics",
    categoryId: "1",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    discount: 17,
    features: [
      "4K resolution",
      "Built-in microphone",
      "Auto focus",
      "Wide angle lens",
    ],
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    description:
      "RGB Mechanical gaming keyboard with customizable switches and programmable keys.",
    price: 129.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1587829191301-11db59a44f6b?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587829191301-11db59a44f6b?w=500&h=500&fit=crop",
    ],
    category: "Electronics",
    categoryId: "1",
    rating: 4.7,
    reviews: 287,
    inStock: true,
    discount: 28,
    features: [
      "Mechanical switches",
      "RGB lighting",
      "USB-C connection",
      "Aluminum frame",
    ],
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    name: "Premium Cotton T-Shirt",
    description:
      "Comfortable and durable cotton t-shirt, perfect for everyday wear.",
    price: 29.99,
    originalPrice: 44.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    ],
    category: "Fashion",
    categoryId: "2",
    rating: 4.5,
    reviews: 512,
    inStock: true,
    discount: 33,
    features: [
      "100% organic cotton",
      "Preshrunk",
      "Multiple colors",
      "Sustainable production",
    ],
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    name: "Elegant Watch",
    description:
      "Luxury stainless steel watch with automatic movement and leather strap.",
    price: 349.99,
    originalPrice: 499.99,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop",
    ],
    category: "Fashion",
    categoryId: "2",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    discount: 30,
    features: [
      "Stainless steel case",
      "Automatic movement",
      "Leather strap",
      "Water resistant",
    ],
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "6",
    name: "Modern Table Lamp",
    description:
      "Minimalist LED table lamp with adjustable brightness and USB charging.",
    price: 59.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop",
    ],
    category: "Home & Garden",
    categoryId: "3",
    rating: 4.6,
    reviews: 201,
    inStock: true,
    discount: 33,
    features: [
      "LED technology",
      "Dimmable",
      "USB charging port",
      "Touch control",
    ],
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "7",
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking and extended battery life.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    ],
    category: "Electronics",
    categoryId: "1",
    rating: 4.4,
    reviews: 423,
    inStock: true,
    features: [
      "Ergonomic design",
      "2.4GHz wireless",
      "Precision tracking",
      "Long battery life",
    ],
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "8",
    name: "Minimalist Backpack",
    description:
      "Sleek and functional backpack with laptop compartment and water resistance.",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    ],
    category: "Fashion",
    categoryId: "2",
    rating: 4.7,
    reviews: 334,
    inStock: true,
    discount: 31,
    features: [
      "Laptop compartment",
      "Water resistant",
      "Minimalist design",
      "Comfortable straps",
    ],
    createdAt: new Date("2024-01-22"),
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery),
  );
}
