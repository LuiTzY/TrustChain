import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { LoginCredentials } from "../types/user.types";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate(); // 👈 para redirigir
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
      // limpiar datos previos
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // login simulado (usa users.json)
      const response = await loginUser(form);

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      localStorage.setItem("user", JSON.stringify(response.user));

      login(response.user);

      // ✅ redirige a productos
      navigate("/products");
    } catch (error) {
      console.error(error);
      setError("Credenciales inválidas o error de servidor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-sm mx-auto w-full"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium">Usuario</h3>
        <input
          name="username"
          placeholder="Ingresa tu nombre de usuario"
          onChange={handleChange}
          className="text-[#8e8e8e] text-[0.7rem] self-stretch w-full h-[46px] px-[19px] py-[13px] rounded-full outline-1 outline-offset-[-1px] outline-[#5f5f5f]/50 inline-flex justify-start items-center gap-2.5"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium">Contraseña</h3>
        <input
          name="password"
          type="password"
          placeholder="Introduce tu contraseña"
          onChange={handleChange}
          className="text-[#8e8e8e] text-[0.7rem] self-stretch w-full h-[46px] px-[19px] py-[13px] rounded-full outline-1 outline-offset-[-1px] outline-[#5f5f5f]/50 inline-flex justify-start items-center gap-2.5"
        />
      </div>

      <button
        type="submit"
        className="bg-[#2f45c6] text-white px-8 py-3 rounded-full font-['Orbitron'] hover:bg-[#2334a8] transition-all duration-200"
      >
        Iniciar sesión
      </button>

      {error && <p className="text-red-500 text-[0.7rem]">{error}</p>}
    </form>
  );
}
