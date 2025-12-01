import { LoginCredentials, RegisterData, User } from "@/apps/users/types/user.types";
import axios, { AxiosRequestConfig, Method } from "axios";

const API_URL = "http://localhost:8000/api";

export const loginUser = async (credentials: LoginCredentials) => {
  const { data } : any = await axios.post(`${API_URL}/auth/login/`, credentials);
  
  

  if (!data) throw new Error("Credenciales inválidas");

  // Simular token
  return {
    access: data.access,
    refresh: data.refresh
  };
};


//arreglar para mapear a una respuesta correcta 
export const registerUser = async (formData: RegisterData): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/user/`, formData);
  return data;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};




const BASE_URL = "http://localhost:8000"

export const apiClient = async <T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const token = localStorage.getItem("accessToken") || "null";
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      ...config,
    });
    return response.data as T;
  } catch (error: any) {
    // console.error("API ERROR →", error.response || error);
    throw error.response?.data || error;
  }
};