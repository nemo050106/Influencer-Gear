import Link from 'next/link'
import { FaBoxOpen, FaTruck, FaClock } from 'react-icons/fa'
import { Order } from '@/lib/createOrder'

export default function OrderRow({ order }: { order: Order }) {
    return (
        <Link
            href={`/details/${order.productId}`}
            className="group flex items-center gap-4 rounded-2xl p-3 ring-1 ring-gray-900/5 transition hover:bg-purple-50/50 hover:shadow-sm"
        >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-50 to-purple-50 text-purple-300">
                {order.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={order.image} alt={order.name} className="h-full w-full object-cover" />
                ) : (
                    <FaBoxOpen className="text-2xl" />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                    {order.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                    {order.category} ·{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
            </div>

            <div className="flex flex-col items-end gap-1.5">
                <p className="text-sm font-bold text-gray-900">
                    ${(order.price * (order.quantity ?? 1)).toFixed(2)}
                </p>
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        order.isShipped
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                    }`}
                >
                    {order.isShipped ? <FaTruck /> : <FaClock />}
                    {order.isShipped ? 'Shipped' : 'Processing'}
                </span>
            </div>
        </Link>
    )
}