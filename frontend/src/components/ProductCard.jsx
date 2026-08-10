import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon, StarIcon } from './Icons.jsx'
import { formatCurrency } from '../services/catalog.js'

function ProductCard({ product, compact = false }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:hover:shadow-[0_8px_20px_rgba(2,6,23,0.36)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent dark:from-slate-950/50" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700 shadow-[0_4px_10px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200 dark:shadow-[0_4px_10px_rgba(2,6,23,0.28)]">
          <CheckIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
          {product.status}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-[0_4px_10px_rgba(15,23,42,0.04)] dark:bg-slate-950/80 dark:text-white dark:shadow-[0_4px_10px_rgba(2,6,23,0.28)]">
          {formatCurrency(product.price)}
        </div>
      </div>

      <div className={compact ? 'space-y-3 p-4' : 'space-y-4 p-5'}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">{product.brand}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{product.name}</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">{product.categoryName}</div>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{product.description}</p>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 text-amber-500 dark:text-amber-300" />
            <span className="font-medium text-slate-900 dark:text-white">{product.rating}</span>
            <span className="text-slate-500 dark:text-slate-400">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 transition group-hover:gap-2 dark:text-blue-300">
            <span>View details</span>
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
