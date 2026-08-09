const { supabase } = require('../config/supabaseClient')
const { createHttpError } = require('../utils/httpError')

const createArtwork = (label, from = '#082f49', to = '#0f766e', accent = '#67e8f9') => {
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

const safeNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const normalizeCategory = (category, products = []) => {
  const catId = category.category_id ?? category.id
  const name = category.category_name ?? category.name ?? 'Category'
  const count = products.filter((p) => String(p.category_id ?? p.category) === String(catId)).length

  const accents = {
    'Electronics': 'from-cyan-400 to-sky-600',
    'Fashion': 'from-fuchsia-500 to-violet-600',
    'Home & Living': 'from-emerald-500 to-teal-600',
    'Beauty': 'from-rose-500 to-orange-500',
    'Sports': 'from-amber-400 to-orange-500',
    'Office': 'from-slate-400 to-slate-700'
  }
  const accent = accents[name] ?? 'from-blue-500 to-indigo-600'

  return {
    category_id: catId,
    category_name: name,
    product_count: count,
    
    // Frontend compatibility
    id: catId,
    name,
    description: `Premium selection of ${name} items for everyday lifestyle.`,
    accent,
    image: category.category_image ?? category.image ?? createArtwork(name, '#0f766e', '#1d4ed8', '#22d3ee'),
    productCount: count,
  }
}

const normalizeProduct = (product, categoryMap = new Map()) => {
  const prodId = product.product_id ?? product.id
  const name = product.product_name ?? product.name ?? 'Product'
  const brand = product.brand ?? 'Brand'
  const price = safeNumber(product.price)
  const categoryId = product.category_id ?? null
  const category = categoryMap.get(String(categoryId))
  const stock = safeNumber(product.stock_quantity ?? product.stock)
  
  const rating = Number((4.3 + (prodId % 7) * 0.1).toFixed(1))
  const reviews = 25 + (prodId % 200) * 3
  const sku = `${brand.slice(0, 3).toUpperCase()}-${name.slice(0, 3).toUpperCase()}-${prodId}`
  const description = `Premium ${name} by ${brand}. Masterfully designed with high quality materials for high performance and everyday usage.`
  const image = product.image_url ?? createArtwork(name)
  const categoryName = category?.name ?? 'Collection'

  return {
    product_id: prodId,
    product_name: name,
    brand,
    price,
    stock_quantity: stock,
    category_name: categoryName,
    category_id: categoryId,
    image_url: image,
    description,
    rating,
    reviews,
    sku,

    // Frontend compatibility
    id: prodId,
    name,
    image,
    stock,
    // The UI's category filters use the database category id.
    category: categoryId,
    categoryName,
    status: stock > 20 ? 'In stock' : stock > 0 ? 'Low stock' : 'Out of stock'
  }
}

const normalizeCustomer = (customer, customerOrders = []) => {
  const custId = customer.customer_id ?? customer.id
  const firstName = customer.first_name ?? 'Guest'
  const lastName = customer.last_name ?? 'User'
  const fullName = `${firstName} ${lastName}`
  const email = customer.email ?? ''
  const city = customer.city ?? ''
  
  const ordersCount = customerOrders.length
  const totalSpend = customerOrders.reduce((sum, o) => sum + safeNumber(o.total_amount), 0)

  return {
    customer_id: custId,
    first_name: firstName,
    last_name: lastName,
    email,
    city,
    phone: customer.phone ?? '',
    created_at: customer.created_at ?? '',

    // Frontend compatibility
    id: custId,
    name: fullName,
    orders: ordersCount,
    revenue: totalSpend,
    status: totalSpend > 500 ? 'VIP' : 'Active',
    lastActive: customer.created_at ?? '',
  }
}

const normalizeOrders = (orders, customersMap, productsMap, orderDetails) => {
  return orders.map((order) => {
    const orderId = order.order_id ?? order.id
    const details = orderDetails.filter((detail) => String(detail.order_id) === String(orderId))
    const enrichedDetails = details.map((detail) => {
      const productId = detail.product_id
      return {
        id: detail.order_detail_id ?? detail.id,
        orderId: detail.order_id,
        productId,
        quantity: safeNumber(detail.quantity, 1),
        unitPrice: safeNumber(detail.unit_price),
        product: productsMap.get(String(productId)) ?? null,
      }
    })

    const customerId = order.customer_id
    const customer = customersMap.get(String(customerId))
    const itemsCount = enrichedDetails.reduce((sum, item) => sum + safeNumber(item.quantity, 1), 0)
    const computedTotal = enrichedDetails.reduce((sum, item) => sum + safeNumber(item.unitPrice) * safeNumber(item.quantity, 1), 0)

    return {
      order_id: orderId,
      customer_id: customerId,
      order_date: order.order_date ?? order.created_at ?? '',
      total_amount: safeNumber(order.total_amount ?? computedTotal, computedTotal),
      status: order.status ?? 'Pending',

      // Frontend compatibility
      id: orderId,
      customer: customer?.name ?? 'Guest',
      customerName: customer?.name ?? 'Guest',
      items: itemsCount,
      itemsCount,
      total: safeNumber(order.total_amount ?? computedTotal, computedTotal),
      payment: order.status === 'Cancelled' ? 'Refunded' : 'Paid',
      date: order.order_date ?? order.created_at ?? '',
      channel: 'Online',
      details: enrichedDetails,
    }
  })
}

async function fetchRows(table, options = {}) {
  let query = supabase.from(table).select('*')

  if (options.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? true })
  }

  if (options.eq) {
    Object.entries(options.eq).forEach(([column, value]) => {
      query = query.eq(column, value)
    })
  }

  if (options.in) {
    Object.entries(options.in).forEach(([column, values]) => {
      query = query.in(column, values)
    })
  }

  const { data, error } = await query

  if (error) {
    throw createHttpError(500, `Failed to load ${table}: ${error.message}`)
  }

  return data ?? []
}

async function getCategories() {
  const [categories, products] = await Promise.all([
    fetchRows('categories', { orderBy: 'category_name' }),
    fetchRows('products'),
  ])
  return categories.map((cat) => normalizeCategory(cat, products))
}

async function getCustomers() {
  const [customers, orders] = await Promise.all([
    fetchRows('customers', { orderBy: 'first_name' }),
    fetchRows('orders'),
  ])
  
  return customers.map((cust) => {
    const custOrders = orders.filter((o) => String(o.customer_id) === String(cust.customer_id))
    return normalizeCustomer(cust, custOrders)
  })
}

async function getProducts() {
  const [categories, products] = await Promise.all([
    fetchRows('categories', { orderBy: 'category_name' }),
    fetchRows('products', { orderBy: 'product_name' }),
  ])

  const categoryMap = new Map(categories.map((category) => [String(category.category_id), normalizeCategory(category)]))

  return products.map((product) => normalizeProduct(product, categoryMap))
}

async function getProductById(id) {
  const [categories, products] = await Promise.all([
    fetchRows('categories', { orderBy: 'category_name' }),
    fetchRows('products', { eq: { product_id: id } }),
  ])

  const categoryMap = new Map(categories.map((category) => [String(category.category_id), normalizeCategory(category)]))
  const product = products[0]

  if (!product) {
    throw createHttpError(404, 'Product not found')
  }

  const normalizedProduct = normalizeProduct(product, categoryMap)
  const allProducts = await fetchRows('products', { orderBy: 'product_name' })
  const relatedProducts = allProducts
    .map((item) => normalizeProduct(item, categoryMap))
    .filter((item) => String(item.id) !== String(normalizedProduct.id) && String(item.category) === String(normalizedProduct.category))
    .slice(0, 3)

  return {
    product: normalizedProduct,
    relatedProducts,
  }
}

async function getOrders() {
  const [customers, products, orders, orderDetails] = await Promise.all([
    fetchRows('customers', { orderBy: 'first_name' }),
    fetchRows('products', { orderBy: 'product_name' }),
    fetchRows('orders', { orderBy: 'order_date', ascending: false }),
    fetchRows('order_details'),
  ])

  const customerMap = new Map(customers.map((customer) => [String(customer.customer_id), normalizeCustomer(customer)]))
  const productMap = new Map(products.map((product) => [String(product.product_id), normalizeProduct(product)]))

  return normalizeOrders(orders, customerMap, productMap, orderDetails)
}

async function getOrderById(id) {
  const [customers, products, orders, orderDetails] = await Promise.all([
    fetchRows('customers', { orderBy: 'first_name' }),
    fetchRows('products', { orderBy: 'product_name' }),
    fetchRows('orders', { eq: { order_id: id } }),
    fetchRows('order_details', { eq: { order_id: id } }),
  ])

  const order = orders[0]

  if (!order) {
    throw createHttpError(404, 'Order not found')
  }

  const customerMap = new Map(customers.map((customer) => [String(customer.customer_id), normalizeCustomer(customer)]))
  const productMap = new Map(products.map((product) => [String(product.product_id), normalizeProduct(product)]))
  const [normalizedOrder] = normalizeOrders([order], customerMap, productMap, orderDetails)

  return normalizedOrder
}

module.exports = {
  getCategories,
  getCustomers,
  getProducts,
  getProductById,
  getOrders,
  getOrderById,
}
