import { useState } from "react";
import { registerUser } from "../api/auth.api";
import type { RegisterData } from "../types/user.types";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Usuario registrado correctamente");
    } catch {
      alert("Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
      <input name="first_name" placeholder="Nombre" onChange={handleChange} />
      <input name="last_name" placeholder="Apellido" onChange={handleChange} />
      <input name="username" placeholder="Usuario" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Crear cuenta
      </button>
    </form>
  );
}
