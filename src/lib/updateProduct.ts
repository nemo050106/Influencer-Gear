import { apiRequest } from "./api"
import { UpdateProductPayload } from "./types"

export const updateProduct = async <T = unknown>(
    id: string,
    data: UpdateProductPayload
): Promise<T> => {
    return apiRequest<T>(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}