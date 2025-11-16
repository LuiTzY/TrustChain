import axios from "axios";
import type { LoginCredentials, RegisterData } from "../types/user.types.ts";
import usersData from "../Prueba/users.json";

const API_URL = "/api";

export const loginUser = async (credentials: LoginCredentials) => {
  // const { data } = await axios.post(`${API_URL}/auth/login/`, credentials);
  // return data;
  const user = usersData.find(
    (u) =>
      u.username === credentials.username &&
      u.password === credentials.password
  );

  if (!user) throw new Error("Credenciales inválidas");

  // Simular token
  return {
    access: "mock-access-token-" + user.id,
    refresh: "mock-refresh-token-" + user.id,
    user,
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


