'use client';

import Link from 'next/link';

/**
 * Header - Single Responsibility: Display navigation header
 * Reusable: Used across all pages
 * DRY: Eliminates duplicate header code
 */
export function Header() {
    return (
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
    );
}
