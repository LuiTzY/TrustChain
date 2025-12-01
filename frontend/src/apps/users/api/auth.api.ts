import axios from "axios";
import type { LoginCredentials, RegisterData, User } from "../types/user.types.ts";

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

export const registerUser = async (formData: RegisterData) => {
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

export const getUserById = async (id: number): Promise<User> => {
  const res = await axios.get(`${API_URL}${id}/user/`);
  return res.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const res = await axios.put(`${API_URL}${id}/user/`, user);
  return res.data;
};





