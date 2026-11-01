import Link from 'next/link'
import { Order } from '@/lib/createOrder'
import { money } from '@/lib/format'
import OrderStatusBadge from './OrderStatusBadge'

interface RecentOrdersTableProps {
  orders: Order[]
  loading: boolean
  shippingId: string | null
  onShip: (id: string) => void
}

export default function RecentOrdersTable({ orders, loading, shippingId, onShip }: RecentOrdersTableProps) {
  return (
    <div className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8 lg:col-span-2">
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
              <th className="px-2 py-3 text-right">Action</th>
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
                    <span className="block max-w-[160px] truncate" title={order.userEmail}>
                      {order.userEmail}
                    </span>
                  </td>
                  <td className="px-2 py-3.5 font-medium text-gray-700">{order.name}</td>
                  <td className="px-2 py-3.5 font-bold text-gray-900">
                    {money(order.price * (order.quantity ?? 1))}
                  </td>
                  <td className="px-2 py-3.5">
                    <OrderStatusBadge isShipped={order.isShipped} />
                  </td>
                  <td className="px-2 py-3.5 text-right">
                    {!order.isShipped && (
                      <button
                        type="button"
                        onClick={() => onShip(order._id)}
                        disabled={shippingId === order._id}
                        className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
                      >
                        {shippingId === order._id ? 'Saving...' : 'Mark shipped'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}