import { apiClient } from "@/api/api";
import { APIGeneralResponse, LoginResponse, RegisterResponse } from "@/api/types/response";
import { SetSession } from "@/apps/helpers/jwt";
import { Product } from "@/apps/products/types/product.types";
import { LoginCredentials, RegisterData, User } from "@/apps/users/types/user.types";
import { register } from "module";


const USER_API_URL_BALANCE = "/api/users/balance/"
const USER_API_AUTH_URL = "/api/auth/"
const USER_BASE_API = "/api/user/"

const USER_PRODUCTS_URL_API = "/api/user/products/me";
export const UserService = {
  getUserBalance: async () => {
    const data =   await apiClient<APIGeneralResponse<number>>("GET", USER_API_URL_BALANCE)
    console.log("Esto dice:", data)
    return data
  },
  validateToken:(token)=>{
    return apiClient<APIGeneralResponse<string>>("POST",`${USER_API_AUTH_URL}token/verify/`,{"token":token})
  },
  getUserInfo:(id: number)=>{
    return apiClient<User>("GET",`${USER_BASE_API}/${id}`)
  },
  getMyBuys:()=>{
    return apiClient<APIGeneralResponse<Product[]>>("GET",`${USER_PRODUCTS_URL_API}?list_type=buyer`)
  },
  login:(data:LoginCredentials)=>{
       return apiClient<LoginResponse>("POST",`${USER_API_AUTH_URL}login/`, data)
  },
  registerUser:(data:RegisterData)=>{
    const register_data = apiClient<APIGeneralResponse<RegisterResponse>>("POST",`${USER_BASE_API}`, data)
    return register_data
  },
  getUserById: async (id:number)=>{
      const data =  apiClient<APIGeneralResponse<User>>("GET",`${USER_BASE_API}${id}/`)
      console.log("DESDE USER BY ID: ",data)
      return data;

  },
  updateUser:(id:number, data)=>{
      return apiClient<APIGeneralResponse<User>>("PUT",`${USER_BASE_API}${id}/`,data)

  }
};





