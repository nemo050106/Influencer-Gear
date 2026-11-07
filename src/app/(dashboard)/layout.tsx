import DashboardNav from '@/components/Dashboard/DashboardNav'
import DashboardAside from '@/components/Dashboard/DashboardAside'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNav />

            <div className="flex flex-col md:flex-row">
                <DashboardAside />

                <main className="relative min-h-[calc(100vh-4rem)] min-w-0 flex-1 overflow-x-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-gray-100/60 to-slate-100">
                    {/* Soft decorative glow */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}