import React from 'react'
import Link from 'next/link'
import { 
  FaBoxOpen, 
  FaShoppingCart, 
  FaUsers, 
  FaDollarSign, 
  FaPlus, 
  FaArrowUp, 
  FaEllipsisH 
} from 'react-icons/fa'

export default function AdminHome() {
  // Sample analytics stats matching your dashboard style
  const stats = [
    { title: 'Total Revenue', value: '$12,450', change: '+12.5%', icon: FaDollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Orders', value: '1,280', change: '+8.2%', icon: FaShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Active Products', value: '540', change: '+4.1%', icon: FaBoxOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Total Creators', value: '10,420', change: '+18.7%', icon: FaUsers, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  // Recent orders overview
  const recentOrders = [
    { id: '#ORD-9921', user: 'Sarah Jenkins', product: 'Sony Alpha A7 IV', price: '$2,498.00', status: 'Completed' },
    { id: '#ORD-9920', user: 'Alex Rivera', product: 'Shure SM7B Mic', price: '$399.00', status: 'Processing' },
    { id: '#ORD-9919', user: 'Michael Chen', product: 'Elgato Key Light', price: '$199.99', status: 'Completed' },
    { id: '#ORD-9918', user: 'Emma Watson', product: 'DJI RS 3 Gimbal', price: '$549.00', status: 'Pending' },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-gray-100/60 to-slate-200/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-purple-600 ring-1 ring-inset ring-purple-500/10 shadow-sm mb-2">
              ⚡ Admin Control Center
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dashboard <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Overview</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <Link 
              href="/admin/products/add" 
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-purple-500 hover:shadow-md hover:-translate-y-0.5"
            >
              <FaPlus /> Add New Product
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div 
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{stat.title}</span>
                  <div className={`rounded-xl p-2.5 ${stat.bg} ${stat.color}`}>
                    <Icon className="text-lg" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                    <FaArrowUp className="text-[10px]" />
                    {stat.change}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid: Table & Quick Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Orders Table (2 Columns) */}
          <div className="lg:col-span-2 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                <p className="text-xs text-gray-500">Latest customer purchases across products</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FaEllipsisH />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs font-semibold uppercase text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-2">Order ID</th>
                    <th className="py-3 px-2">Customer</th>
                    <th className="py-3 px-2">Product</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-2 font-semibold text-gray-900">{order.id}</td>
                      <td className="py-3.5 px-2">{order.user}</td>
                      <td className="py-3.5 px-2 font-medium text-gray-700">{order.product}</td>
                      <td className="py-3.5 px-2 font-bold text-gray-900">{order.price}</td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          order.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
                            : order.status === 'Processing'
                            ? 'bg-purple-50 text-purple-700 ring-purple-600/20'
                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Management Panel (1 Column) */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Admin Shortcuts</h3>
              
              <div className="space-y-2">
                <Link 
                  href="/admin/products"
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600"
                >
                  <span> Manage Products</span>
                  <span>→</span>
                </Link>

                <Link 
                  href="/admin/users"
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600"
                >
                  <span> User Roles & Access</span>
                  <span>→</span>
                </Link>

                <Link 
                  href="/admin/settings"
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600"
                >
                  <span> Store Settings</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}