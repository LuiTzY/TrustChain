import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
// import img from "../../../../public/Frame.png";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Columna izquierda */}
      <div className="w-1/2 flex flex-col items-center justify-center px-16">
        <div>
          <h1 className="text-[#2f45c6] text-3xl font-bold font-['Orbitron']">
            TRUSTCHAIN
          </h1>
          <div className="inline-flex flex-col justify-start items-start gap-[10px]">
            <h2 className="text-[#2f45c6] text-[1rem] font-medium font-['Orbitron']">
              ¡Bienvenido de nuevo!
            </h2>
            <h2 className="text-[#707070] text-[0.7rem] font-normal font-['Orbitron']">
              Accede para continuar donde lo dejaste
            </h2>
          </div>
          <LoginForm />
          <p className="mt-4 text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Columna derecha (imagen) */}
      <div className="w-1/2 h-screen">
        <img
          // src={img}
          alt="Fondo de TrustChain"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
