import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './providers/ThemeProvider.jsx'
import './index.css'
import App from './App.jsx'

if (typeof document !== 'undefined') {
  const storedTheme = window.localStorage.getItem('ecom-control-theme')

  document.documentElement.classList.toggle('dark', storedTheme === 'dark')
  document.documentElement.style.colorScheme = storedTheme === 'dark' ? 'dark' : 'light'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
