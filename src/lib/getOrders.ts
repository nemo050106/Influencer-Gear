import { apiRequest } from './api'
import { Order } from './createOrder'

export const getOrders = (email: string) => {
    return apiRequest<Order[]>(`/api/orders?email=${encodeURIComponent(email)}`, {
        cache: 'no-store',
    })
}