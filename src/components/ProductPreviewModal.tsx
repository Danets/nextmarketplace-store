'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartContext } from './CartProvider';
import { RatingDisplay, PriceDisplay, QuantitySelector } from '@/components/ui';

/**
 * ProductPreviewModal - Single Responsibility: Display product details in modal
 * Open/Closed: Can be extended with additional product information
 */
interface ProductPreviewModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductPreviewModal({ product, isOpen, onClose }: ProductPreviewModalProps) {
    const { addToCart } = useCartContext();
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen) return null;

    const images = product.images || [product.image];
    const currentImage = images[currentImageIndex];

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1);
        onClose();
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Modal Background Click Handler */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative z-10 max-h-screen w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-900">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={currentImage}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            {product.discount && product.discount > 0 && (
                                <div className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                    -{product.discount}%
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <ImageThumbnails
                                images={images}
                                currentIndex={currentImageIndex}
                                onSelect={setCurrentImageIndex}
                                productName={product.name}
                            />
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-4">
                        {/* Category */}
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {product.category}
                        </span>

                        {/* Product Name */}
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

                        {/* Rating */}
                        <RatingDisplay rating={product.rating} reviews={product.reviews} />

                        {/* Price */}
                        <PriceDisplay
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                            size="lg"
                        />

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <ProductFeatures features={product.features} />
                        )}

                        {/* Stock Status */}
                        <div className="text-sm font-medium">
                            {product.inStock ? (
                                <span className="text-green-600 dark:text-green-400">✓ In Stock</span>
                            ) : (
                                <span className="text-red-600 dark:text-red-400">✗ Out of Stock</span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <QuantitySelector
                            initialQuantity={quantity}
                            onQuantityChange={handleQuantityChange}
                        />

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="rounded-lg bg-blue-600 py-3 px-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * ImageThumbnails - Single Responsibility: Display product image thumbnails
 * Open/Closed: Can be extended with image effects
 */
interface ImageThumbnailsProps {
    images: string[];
    currentIndex: number;
    onSelect: (index: number) => void;
    productName: string;
}

function ImageThumbnails({ images, currentIndex, onSelect, productName }: ImageThumbnailsProps) {
    return (
        <div className="flex gap-2">
            {images.map((img, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${index === currentIndex
                            ? 'border-blue-600'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                >
                    <Image
                        src={img}
                        alt={`${productName} ${index + 1}`}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                    />
                </button>
            ))}
        </div>
    );
}

/**
 * ProductFeatures - Single Responsibility: Display product features
 * Open/Closed: Can be extended with feature icons or descriptions
 */
interface ProductFeaturesProps {
    features: string[];
}

function ProductFeatures({ features }: ProductFeaturesProps) {
    return (
        <div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Features:</h3>
            <ul className="space-y-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-blue-600">✓</span>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}
