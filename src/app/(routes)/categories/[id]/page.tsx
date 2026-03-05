'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { getCategoryById, getProductsByCategory } from '@/lib/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductPreviewModal } from '@/components/ProductPreviewModal';
import { notFound } from 'next/navigation';
import { Product } from '@/types';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const category = getCategoryById(id);
    const categoryProducts = getProductsByCategory(id);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    if (!category) {
        notFound();
    }

    // Filter products by search query
    const filteredProducts = categoryProducts.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products
    if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const handleProductClick = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        setSelectedProduct(product);
        setIsModalOpen(true);
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
                    <span className="text-gray-600 dark:text-gray-400">{category.name}</span>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Category Header */}
                <div className="mb-8">
                    <div className="rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 p-8 dark:from-gray-900 dark:to-gray-800">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{category.description}</p>
                        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
                        </p>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Search */}
                    <div className="flex-1 sm:mr-4">
                        <input
                            type="text"
                            placeholder="Search in category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-gray-600 dark:text-gray-400">
                            No products found matching your search.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={(e) => handleProductClick(e, product)}
                                className="cursor-pointer"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Product Preview Modal */}
            {selectedProduct && (
                <ProductPreviewModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
