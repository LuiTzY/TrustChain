import { apiClient } from "@/api/api";
import { APIGeneralResponse } from "@/api/types/response";
import { Pays, Product } from "@/apps/products/types/product.types";

const PRODUCTS_API_URL = "/api/marketplace/products/"
const PAYS_API_URL = "/api/marketplace/pays/"
const USER_BUY_PRODUCTS = "/api/user/products/me?list_type=buyer";
const USER_SELLER_PRODUCTS = "/api/user/products/me?list_type=seller";

export const ProductService = {
  getAll: () => { 
    return apiClient<APIGeneralResponse<Product[]>>("GET", PRODUCTS_API_URL)
  },
  getAllUserProducts: () => { 
    return apiClient<APIGeneralResponse<Product[]>>("GET", USER_SELLER_PRODUCTS)
  },
  getProductById:(id) =>apiClient<Product>("GET",`${PRODUCTS_API_URL}${id}/`),
  createProduct: (data) => apiClient<Product>("POST", PRODUCTS_API_URL, data),
  updateProduct: (id,data) => apiClient<Product>("PUT", `${PRODUCTS_API_URL}${id}/`, data),
  deleteProduct: (id) => apiClient("DELETE",`${PRODUCTS_API_URL}${id}/`),
  getPayments:()=>apiClient<APIGeneralResponse<Pays[]>>("GET",`${PAYS_API_URL}`)

};





