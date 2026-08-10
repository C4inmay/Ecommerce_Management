import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import apiClient from '../services/api.js'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { FilterIcon } from '../components/Icons.jsx'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const urlSearch = searchParams.get('search') ?? ''
  const selectedCategory = searchParams.get('category') ?? 'all'
  const [query, setQuery] = useState(urlSearch)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    setQuery(searchParams.get('search') ?? '')
  }, [searchParams])

  useEffect(() => {
    let active = true
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
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

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return [...products]
      .filter((product) => selectedCategory === 'all' || String(product.category_id) === String(selectedCategory))
      .filter((product) => {
        if (!normalizedQuery) return true

        return [product.name, product.brand, product.categoryName, product.description, product.sku]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((left, right) => {
        if (sortBy === 'price-asc') return left.price - right.price
        if (sortBy === 'price-desc') return right.price - left.price
        if (sortBy === 'stock') return left.stock - right.stock
        if (sortBy === 'name') return left.name.localeCompare(right.name)
        return right.rating - left.rating
      })
  }, [products, query, selectedCategory, sortBy])

  const handleCategoryChange = (value) => {
    const newParams = {}
    if (value !== 'all') newParams.category = value
    if (query.trim()) newParams.search = query.trim()
    setSearchParams(newParams)
  }

  const handleQueryChange = (value) => {
    setQuery(value)
    const newParams = {}
    if (selectedCategory !== 'all') newParams.category = selectedCategory
    if (value.trim()) newParams.search = value.trim()
    setSearchParams(newParams)
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner label="Loading products..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-md dark:border-rose-900/50 dark:bg-rose-950/20">
        <h2 className="text-xl font-bold text-rose-800 dark:text-rose-400">Failed to load products</h2>
        <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] sm:p-7">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">Catalog</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Browse Premium Storefront</h1>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Explore our curated selection of high-quality products, categorized and sorted to matching standard client requirements.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
            <FilterIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            {filteredProducts.length} items found
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 grid gap-3 xl:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <SearchBar value={query} onChange={handleQueryChange} placeholder="Search product name, brand, or details..." />
          <label className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
            <span className="mr-3 text-slate-500 dark:text-slate-400">Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none dark:text-white"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
            <span className="mr-3 text-slate-500 dark:text-slate-400">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none dark:text-white"
            >
              <option value="featured">Featured (Top Rated)</option>
              <option value="stock">Stock: low to high</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </section>

      {/* Products Grid */}
      {filteredProducts.length ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No products found"
          description="Try adjusting the search query or changing filters to browse different categories."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSearchParams({})
                setSortBy('featured')
              }}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-blue-700"
            >
              Reset filters
            </button>
          }
        />
      )}

      {/* Customer Trust Badges */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Free shipping</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">On all orders over $150. Automatically applied at checkout.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Secure checkout</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">100% secure payment processing with modern encryption standards.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Easy returns</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">30-day hassle-free return policy on all eligible purchases.</p>
        </div>
      </section>
    </div>
  )
}

export default Products
