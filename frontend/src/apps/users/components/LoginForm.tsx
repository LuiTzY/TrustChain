import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "../types/user.types";
import { loginUser } from "@/api/api";
import { decodeJwtPayload } from "@/helpers/jwt";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";

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
  
  const { toast } = useToast();

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
      const decodedUser = await decodeJwtPayload(response.access);
      localStorage.setItem("user", decodedUser ? JSON.stringify(decodedUser) : "");

      login(response.access);

       toast({
        title: "Inicio de sesión",
        description: "Haz iniciado sesion correctamente",
        className: "bg-green-500 text-white border-green-600",
        
      });
      // ✅ redirige a productos
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Credenciales inválidas o error de servidor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-md mx-auto w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl"
    >
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Iniciar Sesión
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1 font-['Orbitron']">
          Usuario
        </label>
        <input
          name="username"
          placeholder="Ingresa tu nombre de usuario"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 font-['Orbitron'] text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1 font-['Orbitron']">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          placeholder="Introduce tu contraseña"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 font-['Orbitron'] text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5 font-['Orbitron'] uppercase tracking-wide mt-2"
      >
        Iniciar sesión
      </button>

      {error && (
        <div className="bg-red-900/30 border border-red-800/50 rounded-xl p-3 mt-2">
          <p className="text-red-400 text-sm text-center font-['Orbitron']">
            {error}
          </p>
        </div>
      )}
    </form>
  );
}
