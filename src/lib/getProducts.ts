import { apiRequest } from "./api";
import { PaginatedProducts, Product } from "./types";

export const getProducts = () => {
  return apiRequest<Product[]>("/api/products");
};



export const getPaginatedProducts = (page = 1, limit = 10) => {
  return apiRequest<PaginatedProducts>(
    `/api/products/paginated?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
};