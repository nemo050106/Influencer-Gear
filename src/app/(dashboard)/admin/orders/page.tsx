'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { FaBoxOpen, FaClock, FaSearch, FaTruck } from 'react-icons/fa'
import { getAdminOrdersPage, markOrderShipped } from '@/lib/adminApi'
import { Order } from '@/lib/createOrder'
import Button from '@/ui/Button'

const LIMIT = 10

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function OrdersContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get('q') ?? ''
  const status = searchParams.get('status') ?? 'all'
  const sort = searchParams.get('sort') ?? 'newest'
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shippingId, setShippingId] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const query = searchParams.toString()

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        const params = new URLSearchParams(query)
        params.set('limit', String(LIMIT))
        const data = await getAdminOrdersPage(params.toString())
        if (cancelled) return
        setOrders(data.orders)
        setTotal(data.total)
        setError(null)
      } catch (err) {
        console.error(err)
        if (!cancelled) setError('Failed to load orders.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [query, reloadKey])

  // Update one URL param; changing any filter goes back to page 1
  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all' && !(key === 'sort' && value === 'newest')) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    if (key !== 'page') params.delete('page')
    setLoading(true)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = new FormData(e.currentTarget).get('q')
    setParam('q', String(value ?? '').trim())
  }

  const handleShip = async (id: string) => {
    setShippingId(id)
    try {
      await markOrderShipped(id)
      toast.success('Order marked as shipped')
      setReloadKey((k) => k + 1)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update order')
    } finally {
      setShippingId(null)
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  const from = total === 0 ? 0 : (page - 1) * LIMIT + 1
  const to = Math.min(page * LIMIT, total)

  const selectClass =
    'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-600 shadow-sm ring-1 ring-inset ring-purple-500/10 backdrop-blur-sm">
          ⚡ Admin Control Center
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Manage{' '}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Orders
          </span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">Search, filter and ship customer orders.</p>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-rose-50 px-5 py-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
          <span>{error} Check your server logs.</span>
          <button
            type="button"
            onClick={() => {
              setLoading(true)
              setReloadKey((k) => k + 1)
            }}
            className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm ring-1 ring-rose-600/20 hover:bg-rose-100"
          >
            Retry
          </button>
        </div>
      )}

      <div className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8">
        {/* Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="relative w-full lg:max-w-sm" role="search">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
            <input
              key={q}
              type="search"
              name="q"
              defaultValue={q}
              aria-label="Search orders by product or customer email"
              placeholder="Search product or email, then press Enter"
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </form>

          <div className="flex flex-wrap gap-3">
            <select
              aria-label="Filter by status"
              value={status}
              onChange={(e) => setParam('status', e.target.value)}
              className={selectClass}
            >
              <option value="all">All statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
            </select>

            <select
              aria-label="Sort orders"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
              className={selectClass}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-gray-500" aria-live="polite">
          {loading ? 'Loading...' : total === 0 ? 'No orders found' : `Showing ${from}–${to} of ${total} orders`}
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm text-gray-600">
            <thead className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3">Order ID</th>
                <th scope="col" className="px-2 py-3">Customer</th>
                <th scope="col" className="px-2 py-3">Product</th>
                <th scope="col" className="px-2 py-3">Date</th>
                <th scope="col" className="px-2 py-3">Amount</th>
                <th scope="col" className="px-2 py-3">Status</th>
                {/* <th scope="col" className="px-2 py-3 text-right">Action</th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading &&
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td colSpan={7} className="py-2">
                      <div className="h-11 animate-pulse rounded-lg bg-gray-100" />
                    </td>
                  </tr>
                ))}

              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl text-purple-300">
                      <FaBoxOpen />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-900">No orders found</p>
                    <p className="text-xs text-gray-500">Try a different search or filter.</p>
                  </td>
                </tr>
              )}

              {!loading &&
                orders.map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-2 py-3.5 font-semibold text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-2 py-3.5">
                      <span className="block max-w-[200px] truncate" title={order.userEmail}>
                        {order.userEmail}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 font-medium text-gray-700">
                      <Link href={`/details/${order.productId}`} className="hover:text-purple-600">
                        {order.name}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-2 py-3.5 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-2 py-3.5 font-bold text-gray-900">
                      {money(order.price * (order.quantity ?? 1))}
                    </td>
                    <td className="px-2 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          order.isShipped
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                        }`}
                      >
                        {order.isShipped ? <FaTruck /> : <FaClock />}
                        {order.isShipped ? 'Shipped' : 'Processing'}
                      </span>
                    </td>
                    {/* <td className="px-2 py-3.5 text-right">
                      {!order.isShipped && (
                        <Button
                          type="button"
                          onClick={() => handleShip(order._id)}
                          disabled={shippingId === order._id}
                          className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
                        >
                          {shippingId === order._id ? 'Saving...' : 'Mark shipped'}
                        </Button>
                      )}
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex items-center justify-between border-t border-gray-100 pt-4">
            <Button
              type="button"
              onClick={() => setParam('page', String(page - 1))}
              disabled={page <= 1}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </Button>
            <span className="text-xs font-medium text-gray-500">
              Page {page} of {totalPages}
            </span>
            <Button
              type="button"
              onClick={() => setParam('page', String(page + 1))}
              disabled={page >= totalPages}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </Button>
          </nav>
        )}
      </div>
    </div>
  )
}

// useSearchParams must sit inside a Suspense boundary, or the production build fails
export default function AdminOrder() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-white/60" />}>
      <OrdersContent />
    </Suspense>
  )
}