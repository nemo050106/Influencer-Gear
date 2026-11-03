'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaPlus,
  FaTruck,
  FaClock,
} from 'react-icons/fa'
import { AdminStats, getAdminOrders, getAdminStats, markOrderShipped } from '@/lib/adminApi'
import { Order } from '@/lib/createOrder'

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function AdminHome() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shippingId, setShippingId] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const [s, o] = await Promise.allSettled([getAdminStats(), getAdminOrders(5)])
      if (cancelled) return

      if (s.status === 'fulfilled') setStats(s.value)
      else console.error('Stats failed:', s.reason)

      if (o.status === 'fulfilled') setOrders(o.value)
      else console.error('Orders failed:', o.reason)

      const failed: string[] = []
      if (s.status === 'rejected') failed.push('stats')
      if (o.status === 'rejected') failed.push('orders')

      setError(failed.length ? `Failed to load ${failed.join(' and ')}.` : null)
      setLoading(false)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const handleShip = async (id: string) => {
    setShippingId(id)
    try {
      await markOrderShipped(id)
      toast.success('Order marked as shipped')
      setReloadKey((k) => k + 1) // refetch stats and orders
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update order')
    } finally {
      setShippingId(null)
    }
  }

  const handleRetry = () => {
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  const cards = [
    {
      title: 'Total Revenue',
      value: stats ? money(stats.revenue) : '—',
      hint: 'From all orders',
      icon: FaDollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Total Orders',
      value: stats ? stats.totalOrders.toLocaleString() : '—',
      hint: stats ? `${stats.pendingOrders} awaiting shipment` : 'Unavailable',
      icon: FaShoppingCart,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Active Products',
      value: stats ? stats.activeProducts.toLocaleString() : '—',
      hint: 'Visible in the store',
      icon: FaBoxOpen,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Customers',
      value: stats ? stats.customers.toLocaleString() : '—',
      hint: 'Have placed an order',
      icon: FaUsers,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-gray-100/60 to-slate-200/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-600 shadow-sm ring-1 ring-inset ring-purple-500/10 backdrop-blur-sm">
               Admin Control Center
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dashboard{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Overview
              </span>
            </h1>
          </div>

          <Link
            href="/admin/products/add"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-md"
          >
            <FaPlus /> Add New Product
          </Link>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-rose-50 px-5 py-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
            <span>{error} Check the browser console and your server logs.</span>
            <button
              type="button"
              onClick={handleRetry}
              className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm ring-1 ring-rose-600/20 transition hover:bg-rose-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, value, hint, icon: Icon, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{title}</span>
                <div className={`rounded-xl p-2.5 ${bg} ${color}`}>
                  <Icon className="text-lg" />
                </div>
              </div>

              {loading ? (
                <div className="mt-4 space-y-2">
                  <div className="h-7 w-24 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
                </div>
              ) : (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
                  <p className="mt-1 text-xs text-gray-400">{hint}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent orders (full width) */}
        <div className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
              <p className="text-xs text-gray-500">Latest customer purchases across products</p>
            </div>
            <Link href="/admin/orders" className="text-sm font-semibold text-purple-600 hover:text-purple-500">
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="px-2 py-3">Order ID</th>
                  <th className="px-2 py-3">Customer</th>
                  <th className="px-2 py-3">Product</th>
                  <th className="px-2 py-3">Amount</th>
                  <th className="px-2 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {loading &&
                  [1, 2, 3, 4].map((i) => (
                    <tr key={i}>
                      <td colSpan={6} className="py-2">
                        <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
                      </td>
                    </tr>
                  ))}

                {!loading && orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                      No orders yet
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
                      <td className="px-2 py-3.5 font-medium text-gray-700">{order.name}</td>
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
                      <td className="px-2 py-3.5 text-right">
                        {/* {!order.isShipped && (
                          <button
                            type="button"
                            onClick={() => handleShip(order._id)}
                            disabled={shippingId === order._id}
                            className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
                          >
                            {shippingId === order._id ? 'Saving...' : 'Mark shipped'}
                          </button>
                        )} */}
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