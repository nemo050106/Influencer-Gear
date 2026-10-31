import { apiRequest } from "./api"
import { Product } from "./types"

export const getProductsByid = ({ id }: { id: string }) => {
    return apiRequest<Product>(`/api/products/${id}`)
}