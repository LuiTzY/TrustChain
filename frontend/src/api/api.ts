import axios, { AxiosRequestConfig, Method } from "axios";

const BASE_URL = "http://localhost:8000"

export const apiClient = async <T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const token = localStorage.getItem("accessToken") || "null";
  console.log("Este es el token", token)
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
    console.error("API ERROR →", error.response || error);
    throw error.response?.data || error;
  }
};