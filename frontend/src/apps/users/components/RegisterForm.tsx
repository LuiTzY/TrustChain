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

  const [step, setStep] = useState(1); // 👈 controla el paso actual

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 max-w-sm mx-auto w-full transition-all duration-300"
    >
      {/* Paso 1: Datos personales */}
      {step === 1 && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <h2 className="text-[#2f45c6] text-lg font-['Orbitron'] font-semibold text-center">
            Datos personales
          </h2>

          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium font-['Orbitron']">
              Nombre
            </h3>
            <input
              name="first_name"
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
              className="text-[#8e8e8e] text-[0.75rem] w-full h-[46px] px-[19px] py-[13px] rounded-full outline outline-1 outline-[#5f5f5f]/40 focus:outline-[#2f45c6] placeholder-[#b3b3b3] transition-all duration-200"
            />
          </div>

          {/* Apellido */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium font-['Orbitron']">
              Apellido
            </h3>
            <input
              name="last_name"
              placeholder="Ingresa tu apellido"
              onChange={handleChange}
              className="text-[#8e8e8e] text-[0.75rem] w-full h-[46px] px-[19px] py-[13px] rounded-full outline outline-1 outline-[#5f5f5f]/40 focus:outline-[#2f45c6] placeholder-[#b3b3b3] transition-all duration-200"
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="mt-2 bg-[#2f45c6] text-white py-3 rounded-full font-['Orbitron'] hover:bg-[#2334a8] transition-all duration-200"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Paso 2: Datos de cuenta */}
      {step === 2 && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <h2 className="text-[#2f45c6] text-lg font-['Orbitron'] font-semibold text-center">
            Datos de cuenta
          </h2>

          {/* Usuario */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium font-['Orbitron']">
              Usuario
            </h3>
            <input
              name="username"
              placeholder="Elige un nombre de usuario"
              onChange={handleChange}
              className="text-[#8e8e8e] text-[0.75rem] w-full h-[46px] px-[19px] py-[13px] rounded-full outline outline-1 outline-[#5f5f5f]/40 focus:outline-[#2f45c6] placeholder-[#b3b3b3] transition-all duration-200"
            />
          </div>

          {/* Correo */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium font-['Orbitron']">
              Correo
            </h3>
            <input
              name="email"
              type="email"
              placeholder="Introduce tu correo electrónico"
              onChange={handleChange}
              className="text-[#8e8e8e] text-[0.75rem] w-full h-[46px] px-[19px] py-[13px] rounded-full outline outline-1 outline-[#5f5f5f]/40 focus:outline-[#2f45c6] placeholder-[#b3b3b3] transition-all duration-200"
            />
          </div>

          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-['Orbitron'] hover:bg-gray-400 transition-all duration-200"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#2f45c6] text-white px-6 py-2 rounded-full font-['Orbitron'] hover:bg-[#2334a8] transition-all duration-200"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: Contraseña y envío */}
      {step === 3 && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <h2 className="text-[#2f45c6] text-lg font-['Orbitron'] font-semibold text-center">
            Seguridad
          </h2>

          <div className="flex flex-col gap-2">
            <h3 className="text-[#5f5f5f] text-[0.8rem] font-medium font-['Orbitron']">
              Contraseña
            </h3>
            <input
              name="password"
              type="password"
              placeholder="Crea una contraseña segura"
              onChange={handleChange}
              className="text-[#8e8e8e] text-[0.75rem] w-full h-[46px] px-[19px] py-[13px] rounded-full outline outline-1 outline-[#5f5f5f]/40 focus:outline-[#2f45c6] placeholder-[#b3b3b3] transition-all duration-200"
            />
          </div>

          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-['Orbitron'] hover:bg-gray-400 transition-all duration-200"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="bg-[#2f45c6] text-white px-8 py-3 rounded-full font-['Orbitron'] hover:bg-[#2334a8] transition-all duration-200"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
