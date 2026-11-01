'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { FaBoxOpen, FaTruck } from 'react-icons/fa'
import { useMyOrders } from '@/hooks/useMyOrders'
import { markOrderShipped } from '@/lib/adminApi'
import OrderRow from '@/components/Dashboard/OrderRow'
import Button from '@/ui/Button'

type Filter = 'all' | 'processing' | 'shipped'

export default function MyOrdersPage() {
    const { orders, loading, reload } = useMyOrders()
    const [filter, setFilter] = useState<Filter>('all')
    const [shippingId, setShippingId] = useState<string | null>(null)

    const handleShip = async (id: string) => {
        setShippingId(id)
        try {
            await markOrderShipped(id)
            toast.success('Order marked as shipped')
            reload()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to update order')
        } finally {
            setShippingId(null)
        }
    }

    const filtered = orders.filter((o) =>
        filter === 'all' ? true : filter === 'shipped' ? o.isShipped : !o.isShipped
    )

    const tabs: { key: Filter; label: string; count: number }[] = [
        { key: 'all', label: 'All', count: orders.length },
        { key: 'processing', label: 'Processing', count: orders.filter((o) => !o.isShipped).length },
        { key: 'shipped', label: 'Shipped', count: orders.filter((o) => o.isShipped).length },
    ]

    return (
        <div className="min-h-screen bg-[#c5b9b91d] px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My orders</h1>
                    <p className="mt-1 text-sm text-gray-500">Every order you have placed, newest first.</p>
                </div>

                <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8">
                    {/* Filter tabs */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => setFilter(t.key)}
                                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                                    filter === t.key
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {t.label}
                                <span className={`ml-1.5 text-xs ${filter === t.key ? 'text-purple-100' : 'text-gray-400'}`}>
                                    {t.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {loading && (
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
                            ))}
                        </div>
                    )}

                    {!loading && filtered.length === 0 && (
                        <div className="flex flex-col items-center gap-3 py-14 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl text-purple-300">
                                <FaBoxOpen />
                            </div>
                            <p className="text-base font-semibold text-gray-900">
                                {orders.length === 0 ? 'No orders yet' : `No ${filter} orders`}
                            </p>
                            {orders.length === 0 && (
                                <Link
                                    href="/"
                                    className="mt-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                                >
                                    Start shopping
                                </Link>
                            )}
                        </div>
                    )}

                    {!loading && filtered.length > 0 && (
                        <ul className="space-y-3">
                            {filtered.map((order) => (
                                <li key={order._id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <div className="min-w-0 flex-1">
                                        <OrderRow order={order} />
                                    </div>

                                    {!order.isShipped && (
                                        <Button
                                            onClick={() => handleShip(order._id)}
                                            disabled={shippingId === order._id}
                                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <FaTruck />
                                            {shippingId === order._id ? 'Saving...' : 'Mark shipped'}
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}