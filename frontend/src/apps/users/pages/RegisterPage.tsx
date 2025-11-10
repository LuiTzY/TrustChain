import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
// import img from "../../../../public/Frame.png";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Columna izquierda */}
      <div className="w-1/2 flex flex-col items-center justify-center px-16">
        <div className="flex flex-col gap-6 w-full max-w-sm">
          <h1 className="text-[#2f45c6] text-3xl font-bold font-['Orbitron']">
            TRUSTCHAIN
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-[#2f45c6] text-[1rem] font-medium font-['Orbitron']">
              Crear una cuenta
            </h2>
            <h2 className="text-[#707070] text-[0.7rem] font-normal font-['Orbitron']">
              Regístrate para comenzar a usar la plataforma
            </h2>
          </div>

          <RegisterForm />

          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Columna derecha (imagen) */}
      <div className="w-1/2 h-screen relative">
        <img
          // src={img}
          alt="Fondo de registro TrustChain"
          className="w-full h-full object-cover"
        />

        {/* Overlay azul degradado opcional */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2f45c6]/60 to-transparent"></div>
      </div>
    </div>
  );
}
