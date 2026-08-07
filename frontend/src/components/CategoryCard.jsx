import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './Icons.jsx'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_70px_rgba(2,6,23,0.24)] dark:hover:border-sky-400/30 dark:hover:bg-white/8"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-slate-950/10 to-transparent dark:from-slate-950/75 dark:via-slate-950/20" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-700 ring-1 ring-slate-200/80 dark:bg-white/10 dark:text-white/80 dark:ring-white/15">
            {category.productCount} products
          </div>
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{category.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{category.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-5 text-sm text-slate-600 dark:text-slate-300">
        <span>Open curated catalog</span>
        <span className="flex items-center gap-1 text-sky-600 transition group-hover:gap-2 dark:text-sky-300">
          Browse <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard
