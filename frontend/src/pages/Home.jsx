import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../services/api.js'
import SearchBar from '../components/SearchBar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    async function fetchData() {
      try {
        setLoading(true)
        const [prodRes, catRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/categories'),
        ])
        if (active) {
          setProducts(prodRes.data || [])
          setCategories(catRes.data || [])
          setLoading(false)
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.error?.message || err.message || 'Failed to fetch store data')
          setLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner label="Entering Ecom Store..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-md dark:border-rose-900/50 dark:bg-rose-950/20">
        <h2 className="text-xl font-bold text-rose-800 dark:text-rose-400">Unable to load the store</h2>
        <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Retry Connection
        </button>
      </div>
    )
  }

  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)
  const trendingProducts = products.filter((p) => p.rating >= 4.6).slice(0, 4)

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:p-12 lg:p-16">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
            ✨ Curated Lifestyle Collections
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-none">
            Elevate Your Daily Essentials
          </h1>
          <p className="max-w-xl text-base text-indigo-100 sm:text-lg leading-relaxed">
            Discover a premium selection of tech wearables, designer fashion, and minimalist living upgrades crafted for the modern shopper.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/products"
              className="rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 shadow-md transition duration-200 hover:scale-[1.02] hover:bg-slate-50 hover:text-blue-800"
            >
              Shop All Products
            </Link>
            <Link
              to="/categories"
              className="rounded-2xl border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:scale-[1.02] hover:bg-white/10"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Global Store Search */}
      <section className="mx-auto max-w-2xl px-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && searchQuery.trim()) {
              navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
            }
          }}
          placeholder="Search products by title, category, brand..."
          className="w-full py-4 text-base shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        />
      </section>

      {/* Curated Categories */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Browse our catalog through highly specialized collections
            </p>
          </div>
          <Link
            to="/categories"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>View All</span>
            <span className="transition duration-200 group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
        {categories.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800">
            No categories available at the moment.
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Best Sellers
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Customer favorites with the highest recommendation rates
            </p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>View All</span>
            <span className="transition duration-200 group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
        {bestSellers.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800">
            No products featured yet. Check back soon!
          </div>
        )}
      </section>

      {/* Trending Products */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Trending Products
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Top rated items that people are loving right now
          </p>
        </div>
        {trendingProducts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800">
            No trending products available.
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
