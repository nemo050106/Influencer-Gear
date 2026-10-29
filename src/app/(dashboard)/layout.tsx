import DashboardNav from '@/components/Dashboard/DashboardNav'; // Corrected import path
import DashboardAside from '@/components/Dashboard/DashboardAside';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <DashboardNav />
            <div className='flex flex-col md:flex-row'>
                <DashboardAside />
                <main className='flex-1 p-8'>
                    {children}
                </main>
            </div>
        </div>
    );
}