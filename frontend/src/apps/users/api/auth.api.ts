import axios from "axios";
import type { LoginCredentials, RegisterData } from "../types/user.types.ts";

const API_URL = "/api";

export const loginUser = async (credentials: LoginCredentials) => {
  const { data } = await axios.post(`${API_URL}/auth/login/`, credentials);
  return data;
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


