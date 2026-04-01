'use client';

import Link from 'next/link';

/**
 * Footer - Single Responsibility: Display footer with links and information
 * Reusable: Used across all pages
 * DRY: Eliminates duplicate footer code
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            NextMarketplace
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your trusted online marketplace for quality products.
                        </p>
                    </div>

                    {/* Shop Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                            Shop
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Shopping Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                            Support
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:support@nextmarketplace.com" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            © {currentYear} NextMarketplace. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                Twitter
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                Facebook
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
