import { SearchIcon } from './Icons.jsx'

function SearchBar({
  value,
  onChange,
  placeholder = 'Search products, orders, or customers',
  className = '',
  trailing,
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 focus-within:border-sky-300 focus-within:bg-white/95 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-[0_20px_70px_rgba(2,6,23,0.25)] dark:focus-within:border-sky-400/40 dark:focus-within:bg-white/8 ${className}`}
    >
      <SearchIcon className="h-4 w-4 text-slate-400 dark:text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {trailing}
    </label>
  )
}

export default SearchBar
