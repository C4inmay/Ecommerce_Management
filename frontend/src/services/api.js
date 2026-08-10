import axios from 'axios'

// In development Vite proxies /api to Express. Set VITE_API_URL to the
// deployed Express endpoint when the frontend is hosted separately.
const baseURL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
