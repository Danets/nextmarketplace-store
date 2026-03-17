'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { RatingDisplay, PriceDisplay } from '@/components/ui';
import { useState } from 'react';
import { ProductPreviewModal } from './ProductPreviewModal';

/**
 * ProductCard - Single Responsibility: Display product information in card format
 * Open/Closed: Can be extended with additional display options
 */
interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <Link href={`/products/${product.id}`}>
                <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                    {/* Image Section */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="h-full w-full object-cover transition-transform"
                            style={{
                                transformOrigin: 'center',
                            }}
                        />
                        <style>{`
                            .group:hover [class*="object-cover"] {
                                transform: scale(1.1);
                            }
                        `}</style>
                        {product.discount && product.discount > 0 && (
                            <div className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                -{product.discount}%
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col gap-3 p-4">
                        {/* Category */}
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {product.category}
                        </span>

                        {/* Product Name */}
                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                            {product.name}
                        </h3>

                        {/* Rating */}
                        <RatingDisplay rating={product.rating} reviews={product.reviews} size="sm" />

                        {/* Price */}
                        <PriceDisplay
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                            size="md"
                        />

                        {/* Stock Status */}
                        <div className="text-xs font-medium">
                            {product.inStock ? (
                                <span className="text-green-600 dark:text-green-400">In Stock</span>
                            ) : (
                                <span className="text-red-600 dark:text-red-400">Out of Stock</span>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="mt-2 rounded-lg bg-blue-600 py-2 px-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </Link>
            {isModalOpen && (
                <ProductPreviewModal
                    product={product}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
