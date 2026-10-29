'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import Button from '@/ui/Button'

type Role = 'admin' | 'user'

const navigation: Record<Role, { title: string; href: string }[]> = {
  admin: [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Products', href: '/admin/products' },
    { title: 'Orders', href: '/admin/orders' },
    { title: 'Customers', href: '/admin/customers' },
  ],
  user: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'My Orders', href: '/my-orders' },
  ],
}

export default function DashboardAside() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()
  const [open, setOpen] = useState(false) // is the mobile menu open?

  const userRole = (session?.user as { role?: Role })?.role ?? 'user'
  const navLinks = navigation[userRole]
  // const navLinks = navigation.admin
  // const navLinks = navigation.admin

  // The menu content is shared by desktop and mobile
  const menu = (
    <div className="p-6">
      <p className="mb-3 px-3 text-xs font-semibold text-gray-400">
        {userRole === 'admin' ? 'Admin Menu' : 'User Menu'}
      </p>

      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)} // close the menu after clicking
              className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              {link.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile: top bar with a menu button (hidden on desktop) */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 md:hidden">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700"
        >
          ☰ Menu
        </Button>
      </div>

      {/* Mobile: slide-in drawer (hidden on desktop) */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none' // can't be clicked while closed
          }`}
      >
        {/* dark background - fades in and out */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* the drawer - slides in from the left */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <Button onClick={() => setOpen(false)}
            className="absolute right-3 top-3 px-2 text-xl text-gray-500"
            aria-label="Close menu"
          >
            ✕
          </Button>
          {menu}
        </aside>
      </div>

      {/* Desktop: normal sidebar (hidden on mobile) */}
      <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-gray-100 bg-white md:block">
        {menu}
      </aside>
    </>
  )
}