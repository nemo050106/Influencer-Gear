import { FaTruck, FaClock } from 'react-icons/fa'

export default function OrderStatusBadge({ isShipped }: { isShipped: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isShipped
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
          : 'bg-amber-50 text-amber-700 ring-amber-600/20'
      }`}
    >
      {isShipped ? <FaTruck /> : <FaClock />}
      {isShipped ? 'Shipped' : 'Processing'}
    </span>
  )
}