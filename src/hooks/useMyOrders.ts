'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/lib/getUser'
import { getOrders } from '@/lib/getOrders'
import { Order } from '@/lib/createOrder'
import { UserProps } from '@/lib/types'

export function useMyOrders() {
    const [user, setUser] = useState<UserProps | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        let cancelled = false

        const run = async () => {
            try {
                const u = (await getUser()) as UserProps | null
                if (cancelled) return
                setUser(u)

                if (u?.email) {
                    const data = await getOrders(u.email)
                    if (!cancelled) setOrders(data)
                }
            } catch (err) {
                console.error(err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        run()
        return () => {
            cancelled = true
        }
    }, [reloadKey])

    const reload = () => setReloadKey((k) => k + 1)

    return { user, orders, loading, reload }
}