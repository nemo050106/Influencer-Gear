'use client'

import Link from 'next/link'
import {
    FaBoxOpen,
    FaShoppingBag,
    FaTruck,
    FaClock,
    FaDollarSign,
    FaArrowRight,
} from 'react-icons/fa'
import { useMyOrders } from '@/hooks/useMyOrders'
import OrderRow from '@/components/Dashboard/OrderRow'

export default function UserHome() {
    const { user, orders, loading } = useMyOrders()

    const shipped = orders.filter((o) => o.isShipped).length
    const pending = orders.length - shipped
    const spent = orders.reduce((sum, o) => sum + o.price * (o.quantity ?? 1), 0)

    const stats = [
        { label: 'Total orders', value: orders.length, icon: FaShoppingBag, tone: 'bg-indigo-50 text-indigo-600' },
        { label: 'Shipped', value: shipped, icon: FaTruck, tone: 'bg-emerald-50 text-emerald-600' },
        { label: 'Pending', value: pending, icon: FaClock, tone: 'bg-amber-50 text-amber-600' },
        { label: 'Total spent', value: `$${spent.toFixed(2)}`, icon: FaDollarSign, tone: 'bg-purple-50 text-purple-600' },
    ]

    return (
        <div className="min-h-screen bg-[#c5b9b91d] px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-8">

                {/* Welcome banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-white shadow-sm sm:p-10">
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
                    <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/10" />

                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-100">Welcome back</p>
                            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                                {loading ? 'Loading...' : user?.name ?? 'there'}
                            </h1>
                            <p className="mt-2 text-sm text-purple-100">
                                Track your orders and discover new products.
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            Browse products <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {stats.map(({ label, value, icon: Icon, tone }) => (
                        <div
                            key={label}
                            className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm"
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                                <Icon />
                            </div>
                            <p className="mt-4 text-xs font-medium text-gray-400">{label}</p>
                            {loading ? (
                                <div className="mt-1 h-7 w-16 animate-pulse rounded bg-gray-100" />
                            ) : (
                                <p className="mt-1 text-2xl font-extrabold text-gray-900">{value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Recent orders */}
                <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Recent orders</h2>
                        {orders.length > 3 && (
                            <Link href="/my-orders" className="text-sm font-semibold text-purple-600 hover:text-purple-500">
                                View all ({orders.length}) →
                            </Link>
                        )}
                    </div>

                    {loading && (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
                            ))}
                        </div>
                    )}

                    {!loading && orders.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl text-purple-300">
                                <FaBoxOpen />
                            </div>
                            <p className="text-base font-semibold text-gray-900">No orders yet</p>
                            <p className="max-w-xs text-sm text-gray-500">
                                When you buy something, it will show up here so you can track it.
                            </p>
                            <Link
                                href="/"
                                className="mt-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                            >
                                Start shopping
                            </Link>
                        </div>
                    )}

                    {!loading && orders.length > 0 && (
                        <ul className="space-y-3">
                            {orders.slice(0, 3).map((order) => (
                                <li key={order._id}>
                                    <OrderRow order={order} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}