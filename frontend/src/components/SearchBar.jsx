import { SearchIcon } from './Icons.jsx'

function SearchBar({
  value,
  onChange,
  placeholder = 'Search products, orders, or customers',
  className = '',
  trailing,
  ...props
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition duration-200 focus-within:border-blue-500 focus-within:shadow-[0_4px_12px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:focus-within:border-blue-400 ${className}`}
    >
      <SearchIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
        {...props}
      />
      {trailing}
    </label>
  )
}

export default SearchBar
