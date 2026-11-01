import { apiRequest } from "./api"

export interface CreateOrderPayload {
    productId: string
    userEmail: string
}

export interface Order {
    _id: string
    productId: string
    name: string
    price: number
    category: string
    image?: string
    quantity: number
    userEmail: string
    isShipped: boolean
    createdAt: string
}

export const createOrder = (data: CreateOrderPayload) => {
    return apiRequest<Order>('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}