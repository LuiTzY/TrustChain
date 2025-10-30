import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-3xl font-semibold mb-6">Crear una cuenta</h1>
      <RegisterForm />
      <p className="mt-4 text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
