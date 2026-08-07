import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { FilterIcon } from '../components/Icons.jsx'
import { categories, products } from '../services/catalog.js'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const selectedCategory = searchParams.get('category') ?? 'all'

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return [...products]
      .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
      .filter((product) => {
        if (!normalizedQuery) return true

        return [product.name, product.brand, product.categoryName, product.description]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((left, right) => {
        if (sortBy === 'price-asc') return left.price - right.price
        if (sortBy === 'price-desc') return right.price - left.price
        if (sortBy === 'name') return left.name.localeCompare(right.name)
        return right.rating - left.rating
      })
  }, [query, selectedCategory, sortBy])

  const handleCategoryChange = (value) => {
    setSearchParams(value === 'all' ? {} : { category: value })
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Products</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">A polished product catalog for operations teams.</h1>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              Search, filter, and sort inventory with a UI that feels ready for premium SaaS merchandising workflows.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-sm text-slate-300">
            <FilterIcon className="h-4 w-4 text-sky-300" />
            {filteredProducts.length} products visible
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <SearchBar value={query} onChange={setQuery} placeholder="Search product, brand, or category" />
          <label className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
            <span className="mr-3 text-slate-400">Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
            <span className="mr-3 text-slate-400">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </section>

      {filteredProducts.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No products found"
          description="Try adjusting the search term, category, or sort order to surface more inventory."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery('')
                handleCategoryChange('all')
                setSortBy('featured')
              }}
              className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Reset filters
            </button>
          }
        />
      )}
    </div>
  )
}

export default Products
