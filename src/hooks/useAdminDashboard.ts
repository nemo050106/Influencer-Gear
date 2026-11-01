'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AdminStats, getAdminOrders, getAdminStats, markOrderShipped } from '@/lib/adminApi'
import { Order } from '@/lib/createOrder'

export function useAdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [shippingId, setShippingId] = useState<string | null>(null)

    const load = useCallback(async () => {
        const [s, o] = await Promise.allSettled([getAdminStats(), getAdminOrders(5)])

        if (s.status === 'fulfilled') setStats(s.value)
        else console.error('Stats failed:', s.reason)

        if (o.status === 'fulfilled') setOrders(o.value)
        else console.error('Orders failed:', o.reason)

        const failed: string[] = []
        if (s.status === 'rejected') failed.push('stats')
        if (o.status === 'rejected') failed.push('orders')

        setError(failed.length ? `Failed to load ${failed.join(' and ')}.` : null)
        setLoading(false)
    }, [])

    useEffect(() => {
        let cancelled = false

        const run = async () => {
            const [s, o] = await Promise.allSettled([getAdminStats(), getAdminOrders(5)])
            if (cancelled) return
            // ...same setStats / setOrders / setError / setLoading logic as in load()
        }

        run()
        return () => { cancelled = true }
    }, [])

    const shipOrder = async (id: string) => {
        setShippingId(id)
        try {
            await markOrderShipped(id)
            toast.success('Order marked as shipped')
            await load()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to update order')
        } finally {
            setShippingId(null)
        }
    }

    const retry = () => {
        setLoading(true)
        load()
    }

    return { stats, orders, loading, error, shippingId, shipOrder, retry }
}