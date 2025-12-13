import axios, { AxiosRequestConfig, Method } from "axios";

/*
  Cambiar a localhost en caso de no tener docker: const BASE_URL = "http://localhost:8000";
*/
const BASE_URL = "http://host.docker.internal:8000";


export const apiClient = async <T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {

  const token = localStorage.getItem("accessToken");

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const skipAuth =
    url === "/api/user/" && method.toUpperCase() === "POST";

  if (skipAuth) {
    console.log("No setearemos el token", url);
    headers = {}; // permitido porque 
  }

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers,
      ...config,
    });

    return response.data as T;

  } catch (error: any) {
    console.error("API ERROR →", error.response || error);
    throw error.response?.data || error;
  }
};
