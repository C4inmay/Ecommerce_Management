import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { FilterIcon, MoreIcon } from '../components/Icons.jsx'
import { orders } from '../services/catalog.js'

const pageSize = 5

const statusClasses = {
  Delivered: 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20',
  Shipped: 'bg-sky-400/10 text-sky-300 ring-1 ring-sky-300/20',
  Processing: 'bg-violet-400/10 text-violet-300 ring-1 ring-violet-300/20',
  Pending: 'bg-amber-400/10 text-amber-300 ring-1 ring-amber-300/20',
  Cancelled: 'bg-rose-400/10 text-rose-300 ring-1 ring-rose-300/20',
}

function Orders() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter

      if (!matchesStatus) return false
      if (!normalizedQuery) return true

      return [order.id, order.customer, order.channel, order.payment, order.status]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [query, statusFilter])

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const paginatedOrders = filteredOrders.slice(start, start + pageSize)

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl sm:p-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Orders</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">A premium order console with status-first design.</h1>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Use search, status filters, and pagination UI to explore fulfillment data without any live backend wiring.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <SearchBar value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="Search orders" />
          <label className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
            <FilterIcon className="mr-3 h-4 w-4 text-sky-300" />
            <span className="mr-3 text-slate-400">Status</span>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setPage(1)
              }}
              className="w-full bg-transparent text-sm text-white outline-none"
            >
              <option value="all">All statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>
      </section>

      {paginatedOrders.length ? (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.24em] text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Order</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Payment</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-white/5">
                    <td className="px-6 py-5 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-5">{order.customer}</td>
                    <td className="px-6 py-5">{order.items}</td>
                    <td className="px-6 py-5 font-medium text-white">${order.total.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[order.status] ?? 'bg-white/5 text-slate-200 ring-1 ring-white/10'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">{order.payment}</td>
                    <td className="px-6 py-5">{order.date}</td>
                    <td className="px-6 py-5">
                      <button type="button" className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                        <MoreIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Showing {start + 1}-{Math.min(start + pageSize, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                    number === currentPage ? 'bg-sky-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                disabled={currentPage === pageCount}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState title="No orders found" description="The selected filters do not match any order rows." />
      )}
    </div>
  )
}

export default Orders
