// app/(dashboard)/dashboard/page.tsx
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function DashboardPage() {

    
  const session = await auth.api.getSession({ headers: await headers() })
  console.log(session)

  if (!session) redirect('/login')

  if (session?.user?.role === 'admin') {
    redirect('/admin')
  }

  redirect('/user/dashboard')
}