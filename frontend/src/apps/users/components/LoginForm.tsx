import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import type { LoginCredentials } from "../types/user.types";

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // 🔹 Limpia tokens anteriores
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // 🔹 Llama al endpoint
    const response = await loginUser(form); // esto te devuelve { access, refresh }

    // 🔹 Guarda los nuevos tokens (revisa qué claves exactas te devuelve tu backend)
    localStorage.setItem("accessToken", response.access);
    localStorage.setItem("refreshToken", response.refresh);

    // Si tu backend devuelve también user data:
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    // 🔹 (opcional) Actualiza tu contexto
    login(response.user);

  } catch (error) {
    console.error(error);
    setError("Credenciales inválidas o error de servidor.");
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
      <input
        name="username"
        placeholder="Correo electrónico"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Iniciar sesión
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
