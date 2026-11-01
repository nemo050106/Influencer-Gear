import { apiRequest } from './api'
import { Order } from './createOrder'

export interface AdminStats {
    revenue: number
    totalOrders: number
    pendingOrders: number
    activeProducts: number
    customers: number
}

export const getAdminStats = () =>
    apiRequest<AdminStats>('/api/admin/stats', { cache: 'no-store' })

export const getAdminOrders = (limit = 5) =>
    apiRequest<Order[]>(`/api/admin/orders?limit=${limit}`, { cache: 'no-store' })

export const markOrderShipped = (id: string) =>
    apiRequest<Order>(`/api/orders/${id}/ship`, { method: 'PATCH' })