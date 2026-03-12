'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getProductById, products } from '@/lib/data/products';
import { useCartContext } from '@/components/CartProvider';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const product = getProductById(id);
    const { addToCart } = useCartContext();
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    if (!product) {
        notFound();
    }

    const images = product.images || [product.image];
    const relatedProducts = products
        .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleQuantityChange = (value: number) => {
        if (value > 0) {
            setQuantity(value);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Header */}
            <header className="border-b border-gray-200 dark:border-gray-800">
                <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                        NextMarketplace
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Cart
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Breadcrumb */}
            <nav className="border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/products" className="text-blue-600 hover:underline dark:text-blue-400">
                        Products
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600 dark:text-gray-400">{product.name}</span>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 md:h-[500px]">
                            <img
                                src={images[currentImageIndex]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                            {product.discount && (
                                <div className="absolute top-4 right-4 rounded-full bg-red-500 px-4 py-2 font-bold text-white">
                                    -{product.discount}%
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${index === currentImageIndex
                                            ? 'border-blue-600'
                                            : 'border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-6">
                        {/* Category */}
                        <span className="inline-block w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-900 dark:bg-blue-900/30 dark:text-blue-400">
                            {product.category}
                        </span>

                        {/* Product Name */}
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-xl ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {product.rating.toFixed(1)} • {product.reviews} reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-gray-500 line-through dark:text-gray-400">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div>
                                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Key Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                                ✓
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="text-sm font-medium">
                            {product.inStock ? (
                                <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                    <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                                    In Stock
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                            <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-semibold">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`rounded-lg py-4 px-6 font-semibold text-white transition-all ${isAdded
                                ? 'bg-green-600 dark:bg-green-700'
                                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                                } disabled:bg-gray-400`}
                        >
                            {isAdded ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>

                        {/* Additional Info */}
                        <div className="space-y-2 border-t border-gray-200 pt-6 dark:border-gray-800">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">SKU:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{product.id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                                <Link
                                    href={`/categories/${product.categoryId}`}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    {product.category}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16 border-t border-gray-200 pt-16 dark:border-gray-800">
                        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Related Products</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                                    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                                        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            <img
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col gap-2 p-4">
                                            <h3 className="line-clamp-2 font-semibold text-gray-900 dark:text-white">
                                                {relatedProduct.name}
                                            </h3>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                ${relatedProduct.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
