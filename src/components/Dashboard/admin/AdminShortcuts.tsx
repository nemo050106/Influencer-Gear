import Link from 'next/link'

const links = [
  { href: '/admin/products', label: 'Manage Products' },
  { href: '/admin/orders', label: 'Manage Orders' },
  { href: '/admin/users', label: 'User Roles & Access' },
  { href: '/admin/settings', label: 'Store Settings' },
]

export default function AdminShortcuts() {
  return (
    <div className="space-y-4 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-900">Admin Shortcuts</h3>

      <div className="space-y-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600"
          >
            <span>{item.label}</span>
            <span>→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}