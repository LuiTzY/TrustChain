import { apiClient } from "@/api/api";
import { APIGeneralResponse } from "@/api/types/response";
import { Product } from "@/apps/products/types/product.types";
import { User } from "@/apps/users/types/user.types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const USER_API_URL_BALANCE = "/api/users/balance/"
const USER_API_TOKEN_URL = "/api/auth/token/"
const USER_BASE_API = "/api/user/"

const USER_PRODUCTS_URL_API = "/api/user/products/me";
export const UserService = {
  getUserBalance: () => {
    return apiClient<APIGeneralResponse<number>>("GET", USER_API_URL_BALANCE)
  },
  validateToken:(token)=>{
    return apiClient<APIGeneralResponse<string>>("POST",`${USER_API_TOKEN_URL}verify/`,{"token":token})
  },
  getUserInfo:(id: number)=>{
    return apiClient<User>("GET",`${USER_BASE_API}/${id}`)
  },
  getMyBuys:()=>{
    return apiClient<APIGeneralResponse<Product[]>>("GET",`${USER_PRODUCTS_URL_API}?list_type=seller`)
  }
};





