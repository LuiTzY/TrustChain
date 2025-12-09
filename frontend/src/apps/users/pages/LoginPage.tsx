import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import img from "../../../../public/Frame.png";

export default function LoginPage() {
  return (
 <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-['Orbitron']">
  {/* Columna izquierda */}
  <div className="w-1/2 flex flex-col items-center justify-center px-16 relative">
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-['Orbitron'] tracking-tight">
          TRUSTCHAIN
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-3"></div>
      </div>

      {/* Bienvenida */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-white text-2xl font-semibold font-['Orbitron']">
          ¡Bienvenido de nuevo!
        </h2>
        <p className="text-slate-400 text-sm font-['Orbitron']">
          Accede para continuar donde lo dejaste
        </p>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Link registro */}
      <p className="text-center text-sm text-slate-400">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
          Regístrate aquí
        </Link>
      </p>
    </div>
  </div>

  {/* Columna derecha (imagen) */}
  <div className="w-1/2 h-screen relative overflow-hidden">
    <img
      src={img}
      alt="Fondo de TrustChain"
      className="w-full h-full object-cover"
    />
    {/* Overlay degradado para mejor integración */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent"></div>
  </div>
</div>
  );
}
