const createArtwork = (label, from, to, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none">
      <defs>
        <linearGradient id="g" x1="72" y1="84" x2="724" y2="540" gradientUnits="userSpaceOnUse">
          <stop stop-color="${from}" />
          <stop offset="1" stop-color="${to}" />
        </linearGradient>
        <radialGradient id="r" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(520 190) rotate(135) scale(280 260)">
          <stop stop-color="${accent}" stop-opacity="0.95" />
          <stop offset="1" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" rx="48" fill="url(#g)" />
      <circle cx="160" cy="136" r="92" fill="white" fill-opacity="0.09" />
      <circle cx="646" cy="112" r="126" fill="white" fill-opacity="0.07" />
      <circle cx="606" cy="448" r="176" fill="url(#r)" />
      <rect x="108" y="122" width="270" height="350" rx="34" fill="white" fill-opacity="0.07" stroke="white" stroke-opacity="0.14" />
      <rect x="156" y="168" width="174" height="18" rx="9" fill="white" fill-opacity="0.5" />
      <rect x="156" y="206" width="138" height="16" rx="8" fill="white" fill-opacity="0.28" />
      <rect x="156" y="272" width="202" height="122" rx="24" fill="white" fill-opacity="0.12" />
      <circle cx="484" cy="278" r="126" fill="white" fill-opacity="0.12" />
      <circle cx="484" cy="278" r="78" fill="white" fill-opacity="0.2" />
      <path d="M436 278h96M484 230v96" stroke="white" stroke-opacity="0.45" stroke-width="20" stroke-linecap="round" />
      <text x="110" y="538" fill="white" fill-opacity="0.9" font-size="44" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const formatPrice = (value) => `$${value.toFixed(2)}`

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Smart devices, accessories, and connected hardware for modern retail.',
    productCount: 38,
    accent: 'from-cyan-400 to-sky-600',
    image: createArtwork('Electronics', '#082f49', '#0f766e', '#67e8f9'),
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Premium apparel, footwear, and accessories with fast-moving inventory.',
    productCount: 52,
    accent: 'from-fuchsia-500 to-violet-600',
    image: createArtwork('Fashion', '#2e1065', '#7c3aed', '#f0abfc'),
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Furniture, decor, and wellness products that build recurring demand.',
    productCount: 24,
    accent: 'from-emerald-500 to-teal-600',
    image: createArtwork('Home', '#052e16', '#0f766e', '#6ee7b7'),
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'High-margin skincare, cosmetics, and self-care essentials.',
    productCount: 31,
    accent: 'from-rose-500 to-orange-500',
    image: createArtwork('Beauty', '#4c0519', '#c2410c', '#fda4af'),
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Performance gear, training equipment, and outdoor essentials.',
    productCount: 16,
    accent: 'from-amber-400 to-orange-500',
    image: createArtwork('Sports', '#451a03', '#7c2d12', '#fde68a'),
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Productivity tools, stationery, and workplace upgrades.',
    productCount: 19,
    accent: 'from-slate-400 to-slate-700',
    image: createArtwork('Office', '#0f172a', '#334155', '#cbd5e1'),
  },
]

export const products = [
  {
    id: 1,
    name: 'Aurora Smart Watch',
    brand: 'Nova Pulse',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 249.0,
    stock: 42,
    rating: 4.9,
    reviews: 184,
    status: 'In stock',
    sku: 'NP-AW-2401',
    description: 'A premium health-focused wearable with adaptive performance dashboards and all-day battery life.',
    image: createArtwork('Aurora', '#0f172a', '#1d4ed8', '#22d3ee'),
    accent: 'from-cyan-500 to-blue-600',
  },
  {
    id: 2,
    name: 'Metro Noise Buds',
    brand: 'Sound Harbor',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 159.0,
    stock: 18,
    rating: 4.7,
    reviews: 126,
    status: 'Low stock',
    sku: 'SH-MN-1577',
    description: 'Compact earbuds with rich bass, spatial audio, and rapid charging for busy customers.',
    image: createArtwork('Metro Buds', '#1e1b4b', '#4f46e5', '#a5b4fc'),
    accent: 'from-indigo-500 to-violet-600',
  },
  {
    id: 3,
    name: 'Cloud Knit Hoodie',
    brand: 'Northline',
    category: 'fashion',
    categoryName: 'Fashion',
    price: 88.0,
    stock: 97,
    rating: 4.8,
    reviews: 90,
    status: 'In stock',
    sku: 'NL-CK-8809',
    description: 'Soft-touch streetwear with a modern silhouette and elevated fit for seasonal collections.',
    image: createArtwork('Cloud Knit', '#3b0764', '#c026d3', '#f9a8d4'),
    accent: 'from-fuchsia-500 to-pink-600',
  },
  {
    id: 4,
    name: 'Velvet Desk Lamp',
    brand: 'Studio Forma',
    category: 'home',
    categoryName: 'Home & Living',
    price: 132.0,
    stock: 21,
    rating: 4.6,
    reviews: 64,
    status: 'In stock',
    sku: 'SF-VD-1203',
    description: 'A warm ambient desk lamp with sculptural lines designed for modern workspaces.',
    image: createArtwork('Velvet Lamp', '#082f49', '#0f766e', '#67e8f9'),
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    id: 5,
    name: 'Bloom Serum Set',
    brand: 'Luma Atelier',
    category: 'beauty',
    categoryName: 'Beauty',
    price: 74.0,
    stock: 64,
    rating: 4.9,
    reviews: 211,
    status: 'In stock',
    sku: 'LA-BS-7401',
    description: 'A high-conversion skincare set built for premium bundles and recurring replenishment.',
    image: createArtwork('Bloom Serum', '#450a0a', '#be123c', '#fecdd3'),
    accent: 'from-rose-500 to-amber-500',
  },
  {
    id: 6,
    name: 'Trail Runner Pack',
    brand: 'Peak Motion',
    category: 'sports',
    categoryName: 'Sports',
    price: 119.0,
    stock: 12,
    rating: 4.5,
    reviews: 58,
    status: 'Critical',
    sku: 'PM-TR-1190',
    description: 'Lightweight performance backpack for training, travel, and outdoor adventures.',
    image: createArtwork('Trail Runner', '#422006', '#c2410c', '#fdba74'),
    accent: 'from-amber-400 to-orange-600',
  },
  {
    id: 7,
    name: 'Mono Work Station',
    brand: 'Gridline',
    category: 'office',
    categoryName: 'Office',
    price: 299.0,
    stock: 33,
    rating: 4.7,
    reviews: 72,
    status: 'In stock',
    sku: 'GL-MW-2901',
    description: 'Minimal desk accessories and task lighting for elevated productivity setups.',
    image: createArtwork('Mono Work', '#0f172a', '#334155', '#cbd5e1'),
    accent: 'from-slate-400 to-slate-600',
  },
  {
    id: 8,
    name: 'Zen Storage Set',
    brand: 'Rootline',
    category: 'home',
    categoryName: 'Home & Living',
    price: 54.0,
    stock: 88,
    rating: 4.4,
    reviews: 31,
    status: 'In stock',
    sku: 'RL-ZS-5404',
    description: 'Organizational containers designed to improve basket value and room conversion.',
    image: createArtwork('Zen Storage', '#052e16', '#166534', '#86efac'),
    accent: 'from-green-500 to-emerald-600',
  },
]

export const customers = [
  { id: 1, name: 'Ava Morgan', email: 'ava@northstar.com', city: 'New York', orders: 18, revenue: 12480, status: 'VIP', lastActive: 'Today' },
  { id: 2, name: 'Daniel Reed', email: 'daniel@reed.io', city: 'Austin', orders: 11, revenue: 8670, status: 'Active', lastActive: '2 hours ago' },
  { id: 3, name: 'Sophia Patel', email: 'sophia@studio.com', city: 'San Francisco', orders: 26, revenue: 19340, status: 'VIP', lastActive: 'Today' },
  { id: 4, name: 'Marcus Lee', email: 'marcus@foundry.co', city: 'Seattle', orders: 7, revenue: 4210, status: 'Active', lastActive: 'Yesterday' },
  { id: 5, name: 'Nora Chen', email: 'nora@harbor.shop', city: 'Chicago', orders: 14, revenue: 10950, status: 'Active', lastActive: '5 min ago' },
  { id: 6, name: 'Olivia Brooks', email: 'olivia@haven.app', city: 'Los Angeles', orders: 9, revenue: 6880, status: 'At risk', lastActive: '3 days ago' },
  { id: 7, name: 'Ethan Cruz', email: 'ethan@cruz.net', city: 'Miami', orders: 5, revenue: 2980, status: 'New', lastActive: 'Today' },
  { id: 8, name: 'Mia Johnson', email: 'mia@northlight.dev', city: 'Denver', orders: 21, revenue: 16630, status: 'VIP', lastActive: '1 hour ago' },
  { id: 9, name: 'Lucas Martin', email: 'lucas@martin.co', city: 'Boston', orders: 12, revenue: 9010, status: 'Active', lastActive: 'Today' },
  { id: 10, name: 'Zoe Park', email: 'zoe@parkstudio.com', city: 'Portland', orders: 8, revenue: 4760, status: 'New', lastActive: 'Yesterday' },
]

export const orders = [
  { id: 'ORD-1048', customer: 'Ava Morgan', items: 3, total: 620, status: 'Delivered', date: 'Aug 5, 2026', channel: 'Online', payment: 'Paid' },
  { id: 'ORD-1049', customer: 'Sophia Patel', items: 1, total: 249, status: 'Processing', date: 'Aug 6, 2026', channel: 'Retail', payment: 'Authorized' },
  { id: 'ORD-1050', customer: 'Marcus Lee', items: 5, total: 1180, status: 'Shipped', date: 'Aug 6, 2026', channel: 'Online', payment: 'Paid' },
  { id: 'ORD-1051', customer: 'Olivia Brooks', items: 2, total: 392, status: 'Pending', date: 'Aug 6, 2026', channel: 'Marketplace', payment: 'Pending' },
  { id: 'ORD-1052', customer: 'Nora Chen', items: 4, total: 860, status: 'Delivered', date: 'Aug 7, 2026', channel: 'Online', payment: 'Paid' },
  { id: 'ORD-1053', customer: 'Daniel Reed', items: 2, total: 318, status: 'Cancelled', date: 'Aug 7, 2026', channel: 'Retail', payment: 'Refunded' },
  { id: 'ORD-1054', customer: 'Mia Johnson', items: 6, total: 1440, status: 'Processing', date: 'Aug 7, 2026', channel: 'Online', payment: 'Authorized' },
  { id: 'ORD-1055', customer: 'Lucas Martin', items: 1, total: 132, status: 'Shipped', date: 'Aug 7, 2026', channel: 'Marketplace', payment: 'Paid' },
]

export const stats = [
  { label: 'Monthly revenue', value: '$124.8k', detail: '+18.4% from last month' },
  { label: 'Active products', value: '1,248', detail: '94 low-stock items' },
  { label: 'Customers', value: '12.4k', detail: '821 VIP accounts' },
  { label: 'Orders today', value: '186', detail: '97.8% fulfillment rate' },
]

export const metrics = [
  { label: 'Conversion rate', value: '4.8%', detail: 'Steady across mobile and desktop', icon: 'spark' },
  { label: 'Average order value', value: '$142', detail: 'Upsells and bundles drive growth', icon: 'cart' },
  { label: 'Fulfillment SLA', value: '97.8%', detail: 'Operations stay ahead of demand', icon: 'truck' },
  { label: 'Customer satisfaction', value: '4.9/5', detail: 'Premium support experience', icon: 'shield' },
]

export const featuredProducts = products.slice(0, 4)
export const featuredCategories = categories.slice(0, 4)

export const formatCurrency = (value) => formatPrice(value)

export const getProductById = (id) => products.find((product) => String(product.id) === String(id))

export const getRelatedProducts = (product, count = 3) =>
  products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, count)
