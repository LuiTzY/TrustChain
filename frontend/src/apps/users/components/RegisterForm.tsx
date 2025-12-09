import { useState } from "react";
import { RegisterData } from "../types/user.types";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/user";
import { useNavigate } from "react-router-dom";
import { SetSession } from "@/apps/helpers/jwt";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);
  const { toast } = useToast();
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = (await UserService.registerUser(form)).data;
      console.log("Esto es lo recibido", data)
      SetSession(data.access_token, data.refresh)
      navigate("/dashboard");
      
      console.log(data)
       toast({
        title: `Registro Exitoso`,
        description: ` Te hemos asignado una wallet address de manera automatica`,
        className: "bg-green-500 text-white border-green-600",
        
      });


    } catch(error) {
        toast({
        title: `Error al iniciar sesion`,
        description: `Ocurrio esto al hacer la solicitud: ${error.response.data.message}`,
        className: "bg-red-500 text-white border-red-600",
      });
      console.log("Este es el error", error)
      // alert("Error al registrar usuario");
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="flex flex-col gap-6 max-w-md mx-auto w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl transition-all duration-300 font-['Orbitron']"
>
  {/* Paso 1: Datos personales */}
  {step === 1 && (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Datos personales
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1">
          Nombre
        </label>
        <input
          name="first_name"
          placeholder="Ingresa tu nombre"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 text-sm"
        />
      </div>

      {/* Apellido */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1">
          Apellido
        </label>
        <input
          name="last_name"
          placeholder="Ingresa tu apellido"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 text-sm"
        />
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5 uppercase tracking-wide"
      >
        Siguiente
      </button>
    </div>
  )}

  {/* Paso 2: Datos de cuenta */}
  {step === 2 && (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Datos de cuenta
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Usuario */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1">
          Usuario
        </label>
        <input
          name="username"
          placeholder="Elige un nombre de usuario"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 text-sm"
        />
      </div>

      {/* Correo */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1">
          Correo
        </label>
        <input
          name="email"
          type="email"
          placeholder="Introduce tu correo electrónico"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 text-sm"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 bg-slate-800/50 text-slate-300 font-semibold py-3.5 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-700 hover:border-slate-600 uppercase tracking-wide"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 uppercase tracking-wide"
        >
          Siguiente
        </button>
      </div>
    </div>
  )}

  {/* Paso 3: Contraseña y envío */}
  {step === 3 && (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Seguridad
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 ml-1">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          placeholder="Crea una contraseña segura"
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 text-sm"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 bg-slate-800/50 text-slate-300 font-semibold py-3.5 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-700 hover:border-slate-600 uppercase tracking-wide"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5 uppercase tracking-wide"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  )}
</form>
  );
}
