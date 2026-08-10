import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './Icons.jsx'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:hover:shadow-[0_8px_20px_rgba(2,6,23,0.36)]"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-slate-900/5 to-transparent dark:from-slate-950/60 dark:via-slate-950/15" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-700 ring-1 ring-slate-200 shadow-[0_4px_10px_rgba(15,23,42,0.04)] dark:bg-slate-950/80 dark:text-slate-200 dark:ring-slate-700 dark:shadow-[0_4px_10px_rgba(2,6,23,0.28)]">
            {category.productCount} products
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{category.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-5 text-sm text-slate-600 dark:text-slate-300">
        <span>Open curated catalog</span>
        <span className="flex items-center gap-1 text-blue-600 transition group-hover:gap-2 dark:text-blue-300">
          Browse <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard
