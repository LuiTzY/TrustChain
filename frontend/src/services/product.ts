import { apiClient } from "@/api/api";
import { APIGeneralResponse } from "@/api/types/response";
import { Product } from "@/apps/products/types/product.types";
import axios from "axios";

const PRODUCTS_API_URL = "/api/marketplace/products/"

export const ProductService = {
  getAll: () => { 
    console.log("Se esta ejecutando GETALL")
    return apiClient<APIGeneralResponse<Product[]>>("GET", PRODUCTS_API_URL)
  },
  getProductById:(id) =>apiClient<Product>("GET",`${PRODUCTS_API_URL}/${id}/`),
  createProduct: (data) => apiClient<Product>("POST", PRODUCTS_API_URL, data),
  updateProduct: (data) => apiClient<Product>("PUT", PRODUCTS_API_URL, data),
  deleteProduct: (id) => apiClient("DELETE",`${PRODUCTS_API_URL}/${id}/`)
};





