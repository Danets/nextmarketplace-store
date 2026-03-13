import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { getFeaturedProducts, categories } from '@/lib/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

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

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-16 text-white">
          <h1 className="mb-4 text-4xl font-bold">Welcome to NextMarketplace</h1>
          <p className="mb-6 text-lg text-blue-100">
            Discover a wide selection of products from electronics to fashion and home & garden.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Shop All Products
          </Link>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Browse our popular categories
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check out our best-selling items
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              View All Products
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
