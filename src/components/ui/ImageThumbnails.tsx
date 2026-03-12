'use client';

import Image from 'next/image';

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

export function ImageThumbnails({ images, currentIndex, onSelect, productName }: ImageThumbnailsProps) {
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
