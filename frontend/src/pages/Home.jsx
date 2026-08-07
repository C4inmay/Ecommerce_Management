import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import { ArrowRightIcon, PackageIcon, SparklesIcon, TruckIcon, UsersIcon } from '../components/Icons.jsx'
import { featuredCategories, featuredProducts, metrics, stats } from '../services/catalog.js'

function Home() {
  return (
    <div className="space-y-10 lg:space-y-14">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.35)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-sky-200">
            <SparklesIcon className="h-4 w-4" />
            Premium commerce command center
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Manage products, customers, and orders from one polished workspace.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Built for a premium SaaS feel with glassmorphism surfaces, responsive layout, and static product operations data.
            </p>
          </div>

          <SearchBar value="" onChange={() => {}} placeholder="Search the catalog" />

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300"
            >
              Explore products <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              View orders
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <PackageIcon className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 text-sm text-slate-400">Curated inventory</p>
              <p className="mt-1 text-2xl font-semibold text-white">1,248</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <UsersIcon className="h-5 w-5 text-violet-300" />
              <p className="mt-3 text-sm text-slate-400">Active customers</p>
              <p className="mt-1 text-2xl font-semibold text-white">12.4k</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <TruckIcon className="h-5 w-5 text-emerald-300" />
              <p className="mt-3 text-sm text-slate-400">Daily fulfillment</p>
              <p className="mt-1 text-2xl font-semibold text-white">186</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-sky-300/80">Operations snapshot</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">This week's performance</h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
                Healthy
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">{metric.label}</p>
                      <p className="mt-1 text-xl font-semibold text-white">{metric.value}</p>
                    </div>
                    <div className="h-11 w-11 rounded-2xl bg-white/5 ring-1 ring-white/10" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-emerald-500/15 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.25)] backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Recommended next action</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Review low-stock products before the next campaign.</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              The merchandising board surfaces fast-moving inventory, customer trends, and delivery health in a dashboard-ready format.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Featured categories</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Merchandising clusters</h2>
          </div>
          <Link to="/categories" className="text-sm font-medium text-sky-300 transition hover:text-sky-200">
            View all categories
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Featured products</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">High-intent inventory</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-sky-300 transition hover:text-sky-200">
            Browse full catalog
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.22)] backdrop-blur-xl">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home
