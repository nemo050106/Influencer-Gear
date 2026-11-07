'use client'

import { useEffect, useMemo, useState } from 'react'
import { FaUsers, FaShoppingBag, FaDollarSign, FaSearch } from 'react-icons/fa'
import { Customer, getAdminCustomers } from '@/lib/adminApi'

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function AdminCustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        const data = await getAdminCustomers()
        if (cancelled) return
        setCustomers(data)
        setError(null)
      } catch (err) {
        console.error(err)
        if (!cancelled) setError('Failed to load customers.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const filtered = useMemo(
    () => customers.filter((c) => c.email.toLowerCase().includes(query.trim().toLowerCase())),
    [customers, query]
  )

  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0)
  const totalSpent = customers.reduce((sum, c) => sum + c.spent, 0)
  const avgSpend = customers.length ? totalSpent / customers.length : 0

  const cards = [
    { title: 'Customers', value: customers.length.toLocaleString(), icon: FaUsers, tone: 'bg-amber-50 text-amber-600' },
    { title: 'Total orders', value: totalOrders.toLocaleString(), icon: FaShoppingBag, tone: 'bg-purple-50 text-purple-600' },
    { title: 'Avg. spend / customer', value: money(avgSpend), icon: FaDollarSign, tone: 'bg-emerald-50 text-emerald-600' },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-gray-100/60 to-slate-200/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-600 shadow-sm ring-1 ring-inset ring-purple-500/10 backdrop-blur-sm">
            ⚡ Admin Control Center
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Customers
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Everyone who has placed an order, biggest spenders first.</p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-rose-50 px-5 py-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
            <span>{error} Check your server logs.</span>
            <button
              type="button"
              onClick={() => {
                setLoading(true)
                setReloadKey((k) => k + 1)
              }}
              className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm ring-1 ring-rose-600/20 transition hover:bg-rose-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map(({ title, value, icon: Icon, tone }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{title}</span>
                <div className={`rounded-xl p-2.5 ${tone}`}>
                  <Icon className="text-lg" />
                </div>
              </div>
              {loading ? (
                <div className="mt-4 h-8 w-24 animate-pulse rounded bg-gray-100" />
              ) : (
                <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Customers table */}
        <div className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">All customers</h3>
              <p className="text-xs text-gray-500">
                {loading ? 'Loading...' : `${filtered.length} of ${customers.length} shown`}
              </p>
            </div>

            {/* <div className="relative w-full sm:w-72">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by email"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div> */}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="px-2 py-3">Customer</th>
                  <th className="px-2 py-3">Orders</th>
                  <th className="px-2 py-3">Pending</th>
                  <th className="px-2 py-3">Total spent</th>
                  <th className="px-2 py-3">Last order</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {loading &&
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td colSpan={5} className="py-2">
                        <div className="h-12 animate-pulse rounded-lg bg-gray-100" />
                      </td>
                    </tr>
                  ))}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-14 text-center text-sm text-gray-400">
                      {customers.length === 0 ? 'No customers yet' : 'No customers match your search'}
                    </td>
                  </tr>
                )}

                {!loading &&
                  filtered.map((c) => (
                    <tr key={c.email} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-2 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-xs font-bold uppercase text-white">
                            {c.email.slice(0, 2)}
                          </div>
                          <span className="block max-w-[240px] truncate font-medium text-gray-900" title={c.email}>
                            {c.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-3.5 font-semibold text-gray-900">{c.orders}</td>
                      <td className="px-2 py-3.5">
                        {c.pending > 0 ? (
                          <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                            {c.pending} pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            All shipped
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-3.5 font-bold text-gray-900">{money(c.spent)}</td>
                      <td className="px-2 py-3.5 text-gray-500">
                        {c.lastOrderAt
                          ? new Date(c.lastOrderAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}