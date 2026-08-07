import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { LogoMark, MenuIcon, MoonIcon, SunIcon, XIcon } from './Icons.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/categories' },
  { label: 'Customers', to: '/customers' },
  { label: 'Orders', to: '/orders' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  const linkClass = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm font-medium transition duration-300',
      isActive
        ? 'bg-sky-500/10 text-slate-950 ring-1 ring-sky-200/80 shadow-[0_0_0_1px_rgba(15,23,42,0.04)] dark:bg-white/10 dark:text-white dark:ring-white/15'
        : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65 dark:border-white/10 dark:bg-slate-950/70 dark:supports-[backdrop-filter]:bg-slate-950/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-slate-950 uppercase dark:text-white">Ecom Control</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Premium commerce operations</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_18px_40px_rgba(2,6,23,0.3)] dark:hover:bg-white/10"
            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_18px_40px_rgba(2,6,23,0.3)] dark:hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="mx-4 mb-4 rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:mx-6 lg:mx-8">
          <div className="grid gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-2xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-sky-500/10 text-slate-950 ring-1 ring-sky-200/80 dark:bg-sky-400/10 dark:text-white dark:ring-sky-300/20'
                      : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white',
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
