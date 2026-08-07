import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { EditIcon, EyeIcon, MoreIcon } from '../components/Icons.jsx'
import { customers } from '../services/catalog.js'

const pageSize = 5

function Customers() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return customers.filter((customer) => {
      if (!normalizedQuery) return true

      return [customer.name, customer.email, customer.city, customer.status]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [query])

  const pageCount = Math.max(1, Math.ceil(filteredCustomers.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const paginatedCustomers = filteredCustomers.slice(start, start + pageSize)

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl sm:p-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Customers</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">A responsive customer workspace for account operations.</h1>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Browse VIP customers, review activity, and surface action-ready rows with a premium dark UI.
          </p>
        </div>
        <div className="mt-6 max-w-xl">
          <SearchBar value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="Search customers" />
        </div>
      </section>

      {paginatedCustomers.length ? (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(2,6,23,0.3)] backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.24em] text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Orders</th>
                  <th className="px-6 py-4 font-medium">Revenue</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Last active</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="transition hover:bg-white/5">
                    <td className="px-6 py-5">
                      <p className="font-medium text-white">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.email}</p>
                    </td>
                    <td className="px-6 py-5">{customer.city}</td>
                    <td className="px-6 py-5">{customer.orders}</td>
                    <td className="px-6 py-5 font-medium text-white">${customer.revenue.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">{customer.lastActive}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button type="button" className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                          <MoreIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Showing {start + 1}-{Math.min(start + pageSize, filteredCustomers.length)} of {filteredCustomers.length} customers
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
        <EmptyState title="No customers found" description="No rows matched the current search query." />
      )}
    </div>
  )
}

export default Customers
