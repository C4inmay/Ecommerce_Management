import { useEffect, useMemo, useState } from 'react'
import ThemeContext from '../context/themeContext.js'

const THEME_STORAGE_KEY = 'ecom-control-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  return window.localStorage.getItem(THEME_STORAGE_KEY) || 'light'
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: theme === 'dark',
      setTheme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
