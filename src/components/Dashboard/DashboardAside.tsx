'use client'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'

type Role = 'admin' | 'user'

const navigation: Record<Role, { title: string; href: string }[]> = {
  admin: [
    { title: 'Dashboard', href: '/admin/dashboard' },
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
  const { data: session } = authClient.useSession()
  const userRole = session?.user?.role as Role | undefined

  const navLinks = userRole ? navigation[userRole] ?? [] : []

  return (
    <nav className="flex flex-col gap-2">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.title}
        </Link>
      ))}
    </nav>
  )
}