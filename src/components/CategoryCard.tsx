'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/categories/${category.id}`}>
            <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-2 p-4">
                    {/* Category Name */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>

                    {/* Description */}
                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                    </p>

                    {/* Product Count */}
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {category.productCount} products
                    </div>

                    {/* Explore Link */}
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                        Explore Category
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
