import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiClient from '../services/api.js'
import EmptyState from '../components/EmptyState.jsx'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { CheckIcon, MinusIcon, PlusIcon, StarIcon } from '../components/Icons.jsx'
import { formatCurrency } from '../services/catalog.js'

function ProductDetails() {
  const { productId } = useParams()
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedMessage, setAddedMessage] = useState(false)

  useEffect(() => {
    let active = true
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        setAddedMessage(false)
        const response = await apiClient.get(`/products/${productId}`)
        if (active) {
          setProductData(response.data)
          setLoading(false)
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.error?.message || err.message || 'Product not found')
          setLoading(false)
        }
      }
    }
    fetchProduct()
    return () => {
      active = false
    }
  }, [productId])

  const handleAddToCart = () => {
    setAddedMessage(true)
    setTimeout(() => {
      setAddedMessage(false)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner label="Retrieving product details..." />
      </div>
    )
  }

  if (error || !productData || !productData.product) {
    return (
      <EmptyState
        title="Product not found"
        description={error || "The requested product does not exist in our catalog database."}
        action={
          <Link to="/products" className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-blue-700">
            Back to products
          </Link>
        }
      />
    )
  }

  const { product, relatedProducts } = productData

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* Product Images & Info */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
          <div className="relative aspect-[4/3]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent dark:from-slate-950/60" />
            <div className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-700 shadow-[0_4px_10px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:shadow-[0_4px_10px_rgba(2,6,23,0.28)]">
              {product.categoryName}
            </div>
          </div>
          <div className="grid gap-4 p-7 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Brand</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{product.brand}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Availability</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{product.stock > 0 ? `${product.stock} units` : 'Out of stock'}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">SKU</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{product.sku}</p>
            </div>
          </div>
        </div>

        {/* Purchase Info Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-blue-700 dark:text-blue-300">Product details</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">{product.name}</h1>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${
              product.stock > 20
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20'
                : product.stock > 0
                ? 'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20'
                : 'bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20'
            }`}>
              <CheckIcon className="mr-1 inline h-3.5 w-3.5" />
              {product.status}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-amber-500 dark:text-amber-300" />
              <span className="font-semibold text-slate-900 dark:text-white">{product.rating}</span>
            </div>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span>{product.reviews} reviews</span>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{product.description}</p>

          <div className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950/60">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Price</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{formatCurrency(product.price)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Category</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{product.categoryName}</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="px-4 py-3 text-slate-600 transition duration-200 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="min-w-12 px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="px-4 py-3 text-slate-600 transition duration-200 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-blue-700"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {addedMessage && (
              <span className="animate-fade-in text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Added {quantity} item(s) to cart!
              </span>
            )}
          </div>

          <div className="mt-7 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Delivery</p>
              <p className="mt-2 font-medium text-slate-900 dark:text-white">{product.stock > 0 ? 'Dispatched within 24 hours' : 'Ships when restocked'}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Assurance</p>
              <p className="mt-2 font-medium text-slate-900 dark:text-white">Full manufacturer warranty & 30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts && relatedProducts.length ? (
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-700 dark:text-blue-300">Recommendations</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Related Products</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ProductDetails
