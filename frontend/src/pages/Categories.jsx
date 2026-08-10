import { useMemo, useState, useEffect } from 'react'
import apiClient from '../services/api.js'
import SearchBar from '../components/SearchBar.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let active = true
    async function fetchCategories() {
      try {
        setLoading(true)
        const response = await apiClient.get('/categories')
        if (active) {
          setCategories(response.data || [])
          setLoading(false)
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.error?.message || err.message || 'Failed to load categories')
          setLoading(false)
        }
      }
    }
    fetchCategories()
    return () => {
      active = false
    }
  }, [])

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return categories.filter((category) => {
      if (!normalizedQuery) return true

      return [category.name, category.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [categories, query])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner label="Loading categories..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-md dark:border-rose-900/50 dark:bg-rose-950/20">
        <h2 className="text-xl font-bold text-rose-800 dark:text-rose-400">Failed to load categories</h2>
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
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] sm:p-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-blue-700 dark:text-blue-300">Explore Collections</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Discover Products by Category</h1>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Browse our specialized lanes of high-quality electronics, apparel, and lifestyle accessories designed to fit your unique requirements.
          </p>
        </div>
        <div className="mt-7 max-w-xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Search categories..." />
        </div>
      </section>

      {filteredCategories.length ? (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </section>
      ) : (
        <EmptyState title="No matching categories" description="Try a different search term to browse our collections." />
      )}
    </div>
  )
}

export default Categories
