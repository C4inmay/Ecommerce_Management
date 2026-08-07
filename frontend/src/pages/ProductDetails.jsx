import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { CheckIcon, MinusIcon, PlusIcon, StarIcon } from '../components/Icons.jsx'
import { formatCurrency, getProductById, getRelatedProducts } from '../services/catalog.js'

function ProductDetails() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="The requested product does not exist in the static catalog used by this frontend skeleton."
        action={
          <Link to="/products" className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
            Back to products
          </Link>
        }
      />
    )
  }

  const relatedProducts = getRelatedProducts(product)

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(2,6,23,0.35)] backdrop-blur-2xl">
          <div className="relative aspect-[4/3]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {product.categoryName}
            </div>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Brand</p>
              <p className="mt-2 text-sm font-semibold text-white">{product.brand}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Stock quantity</p>
              <p className="mt-2 text-sm font-semibold text-white">{product.stock} units</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">SKU</p>
              <p className="mt-2 text-sm font-semibold text-white">{product.sku}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Product details</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">{product.name}</h1>
            </div>
            <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-300/20">
              <CheckIcon className="mr-1 inline h-3.5 w-3.5" />
              {product.status}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-amber-300" />
              <span className="font-semibold text-white">{product.rating}</span>
            </div>
            <span className="text-slate-500">•</span>
            <span>{product.reviews} reviews</span>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-300">{product.description}</p>

          <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/40 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Price</p>
              <p className="mt-1 text-3xl font-semibold text-white">{formatCurrency(product.price)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Category</p>
              <p className="mt-1 text-lg font-semibold text-white">{product.categoryName}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="px-4 py-3 text-slate-200 transition hover:bg-white/5"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="min-w-12 px-4 py-3 text-center text-sm font-semibold text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="px-4 py-3 text-slate-200 transition hover:bg-white/5"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Add to catalog
            </button>
          </div>

          <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Availability</p>
              <p className="mt-2 font-medium text-white">{product.stock > 20 ? 'Ready for promotion' : 'Monitor replenishment'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Operations note</p>
              <p className="mt-2 font-medium text-white">Premium placeholder view for merchandising workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Related products</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Cross-sell opportunities</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
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
