'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { products, categories } from '@/lib/data/products';

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
        const matchesSearch =
            !searchQuery ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <Header />

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Products</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Browse our complete selection of {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar - Filters */}
                    <aside className="lg:w-64">
                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Products
                            </label>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Categories</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${selectedCategory === null
                                        ? 'bg-blue-100 font-medium text-blue-900 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${selectedCategory === category.id
                                            ? 'bg-blue-100 font-medium text-blue-900 dark:bg-blue-900/30 dark:text-blue-400'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
                                <p className="text-gray-600 dark:text-gray-400">No products found. Try adjusting your filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="cursor-pointer"
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
