import { apiClient } from "@/api/api";
import { APIGeneralResponse } from "@/api/types/response";
import { Pays, Product } from "@/apps/products/types/product.types";

const PRODUCTS_API_URL = "/api/marketplace/products/"
const PAYS_API_URL = "/api/marketplace/pays/"

export const ProductService = {
  getAll: () => { 
    return apiClient<APIGeneralResponse<Product[]>>("GET", PRODUCTS_API_URL)
  },
  getProductById:(id) =>apiClient<Product>("GET",`${PRODUCTS_API_URL}${id}/`),
  createProduct: (data) => apiClient<Product>("POST", PRODUCTS_API_URL, data),
  updateProduct: (data) => apiClient<Product>("PUT", PRODUCTS_API_URL, data),
  deleteProduct: (id) => apiClient("DELETE",`${PRODUCTS_API_URL}/${id}/`),
  getPayments:()=>apiClient<APIGeneralResponse<Pays[]>>("GET",`${PAYS_API_URL}`)

};





