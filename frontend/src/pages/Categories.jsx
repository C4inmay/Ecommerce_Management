import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { categories } from '../services/catalog.js'

function Categories() {
  const [query, setQuery] = useState('')

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return categories.filter((category) => {
      if (!normalizedQuery) return true

      return [category.name, category.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [query])

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl sm:p-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Categories</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Organize your catalog into premium merchandising lanes.</h1>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Category cards are designed to feel like a modern SaaS catalog control surface with a dark glass finish.
          </p>
        </div>
        <div className="mt-6 max-w-xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Search categories" />
        </div>
      </section>

      {filteredCategories.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </section>
      ) : (
        <EmptyState title="No matching categories" description="Try a different search term to surface another merchandising cluster." />
      )}
    </div>
  )
}

export default Categories
