// app/(dashboard)/dashboard/page.tsx
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function DashboardPage() {
  // 1. get the logged-in user
  const session = await auth.api.getSession({ headers: await headers() })
  console.log(session)

  // 2. not logged in -> go to login
  if (!session) redirect('/login')

  // 3. send each role to its own dashboard
  if (session?.user?.role === 'admin') {
    redirect('/admin')
  }

  redirect('/user/dashboard')
}