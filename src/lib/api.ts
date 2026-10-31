import { API_ERROR_MESSAGE } from "./constants";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const apiRequest = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(API_ERROR_MESSAGE);
    }

    return response.json() as Promise<T>
}