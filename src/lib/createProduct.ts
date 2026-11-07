import { apiRequest } from './api'

export interface CreateProductPayload {
    name: string
    price: number
    stock: number
    category: string
    image?: string
    isActive?: boolean
}

export const createProduct = <T = unknown>(data: CreateProductPayload) => {
    return apiRequest<T>('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}