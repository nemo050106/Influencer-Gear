import { IconType } from 'react-icons'

interface StatCardProps {
  title: string
  value: string
  hint: string
  icon: IconType
  color: string
  bg: string
  loading?: boolean
}

export default function StatCard({ title, value, hint, icon: Icon, color, bg, loading }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 text-black ring-gray-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-black">{title}</span>
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
  )
}