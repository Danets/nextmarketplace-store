'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/components/CartProvider';
import { Header } from '@/components/Header';

export default function CartPage() {
    const { items, isLoading, removeFromCart, updateQuantity, getTotal, clearCart } = useCartContext();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black">
                <Header />

                <main className="mx-auto max-w-7xl px-6 py-8">
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <Header />

            {/* Breadcrumb */}
            <nav className="border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600 dark:text-gray-400">Cart</span>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>

                {items.length === 0 ? (
                    /* Empty Cart */
                    <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
                        <svg className="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">Your cart is empty</p>
                        <Link
                            href="/products"
                            className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    /* Cart with Items */
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                                    >
                                        {/* Product Image */}
                                        <Link href={`/products/${item.productId}`} className="flex-shrink-0">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                width={96}
                                                height={96}
                                                className="rounded-lg object-cover"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <Link
                                                href={`/products/${item.productId}`}
                                                className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {item.product.category}
                                            </p>
                                            <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                                                ${item.product.price.toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Quantity and Remove */}
                                        <div className="flex flex-col items-end gap-4">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    −
                                                </button>
                                                <span className="w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Total Price */}
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.productId)}
                                                className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Shopping */}
                            <Link
                                href="/products"
                                className="mt-6 inline-block text-blue-600 hover:underline dark:text-blue-400"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

                                <div className="space-y-3 border-b border-gray-200 pb-4 dark:border-gray-800">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${getTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-600 dark:text-green-400">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span>${(getTotal() * 0.1).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>${(getTotal() * 1.1).toFixed(2)}</span>
                                </div>

                                <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={() => clearCart()}
                                    className="mt-3 w-full rounded-lg border border-gray-300 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
