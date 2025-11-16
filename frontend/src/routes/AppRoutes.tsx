import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../apps/users/pages/LoginPage";
import RegisterPage from "../apps/users/pages/RegisterPage";
import { useAuth } from "../apps/users/context/AuthContext";
import ProductsPage from "../apps/products/pages/ProductsPage";
import type { JSX } from "react";
import ProductDetailPage from "../apps/products/pages/ProductDetailPage";
import ProductCreatePage from "../apps/products/pages/ProductCreatePage";
import ProductEditPage from "../apps/products/pages/ProductEditPage";

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
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/create" element={<ProductCreatePage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/edit/:id" element={<ProductEditPage />} />
    </Routes>
  );
}
