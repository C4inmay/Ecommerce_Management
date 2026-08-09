import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import { BellIcon, LogoMark, MenuIcon, MoonIcon, SunIcon, XIcon } from './Icons.jsx'
import useTheme from '../hooks/useTheme.js'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/categories' },
  { label: 'Orders', to: '/orders' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`)
      setSearchVal('')
      setIsOpen(false)
    }
  }

  const linkClass = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm font-medium transition duration-200',
      isActive
        ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase dark:text-white">Ecom Store</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Customer Shop</p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center gap-4 xl:flex">
          <SearchBar
            value={searchVal}
            onChange={setSearchVal}
            onKeyDown={handleSearchSubmit}
            placeholder="Search products..."
            className="max-w-xl flex-1"
          />

          <nav className="flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition duration-200 hover:scale-[1.02] hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:hover:border-slate-700 dark:hover:text-white"
            aria-label="Notifications"
          >
            <BellIcon />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition duration-200 hover:scale-[1.02] hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:hover:border-slate-700 dark:hover:text-white"
            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <div
            className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.06)] xl:inline-flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              C
            </span>
            <span>Customer</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition duration-200 hover:scale-[1.02] hover:border-slate-300 hover:text-slate-900 xl:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:hover:border-slate-700 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={`xl:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_12px_rgba(15,23,42,0.06)] sm:mx-6 lg:mx-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
          <div className="grid gap-2">
            <SearchBar
              value={searchVal}
              onChange={setSearchVal}
              onKeyDown={handleSearchSubmit}
              placeholder="Search products..."
              className="mb-2"
            />
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-2xl px-4 py-3 text-sm font-medium transition duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-slate-800 dark:text-white dark:ring-slate-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                  ].join(' ')
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
