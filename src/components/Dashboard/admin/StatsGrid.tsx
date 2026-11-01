import { FaBoxOpen, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa'
import { AdminStats } from '@/lib/adminApi'
import { money } from '@/lib/format'
import StatCard from './StatCard'

interface StatsGridProps {
  stats: AdminStats | null
  loading: boolean
}

export default function StatsGrid({ stats, loading }: StatsGridProps) {
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} loading={loading} />
      ))}
    </div>
  )
}