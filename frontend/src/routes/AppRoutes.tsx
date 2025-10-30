import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../apps/users/pages/LoginPage";
import RegisterPage from "../apps/users/pages/RegisterPage";
import { useAuth } from "../apps/users/context/AuthContext";
import type { JSX } from "react";

// 👇 Componente para proteger rutas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Público */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Ejemplo de ruta protegida */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <h1 className="text-2xl text-center mt-20">Bienvenido al Dashboard 🚀</h1>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}