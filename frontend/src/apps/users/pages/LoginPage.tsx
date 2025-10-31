import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-3xl font-semibold mb-6">Iniciar sesión</h1>
      <LoginForm />
      <p className="mt-4 text-sm text-gray-600">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
