import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

export default function DashboardHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-600 shadow-sm ring-1 ring-inset ring-purple-500/10 backdrop-blur-sm">
          ⚡ Admin Control Center
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
  )
}