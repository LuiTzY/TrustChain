import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { User } from "../types/user.types";
import { UserService } from "@/services/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // ---------------------------------------------------------
  // Login - Redirige a donde el usuario quería ir
  // ---------------------------------------------------------
  const login = (userData: any) => {
    setUser(userData);
    
    // Obtener la ruta de origen o ir al dashboard
    const from = location.state?.from?.pathname || "/dashboard";
    
    toast({
      title: "Bienvenido",
      description: "Has iniciado sesión correctamente",
      className: "bg-green-500 text-white border-green-600",
    });
    
    // Redirigir
    navigate(from, { replace: true });
  };

  // ---------------------------------------------------------
  // Logout - Limpiar sesión
  // ---------------------------------------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    toast({
      title: "Cierre de sesión",
      description: "Has cerrado sesión correctamente",
      className: "bg-green-500 text-white border-green-600",
    });

    navigate("/login", { replace: true });
  };

  // ---------------------------------------------------------
  // Validar sesión al cargar la app
  // ---------------------------------------------------------
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("accessToken");

      // Si no hay token, terminar loading
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Validar token con el backend
        const data = await UserService.validateToken(token);
        
        if (data) {
          // Token válido - mantener sesión
          setUser(token);
        } else {
          // Token inválido - limpiar
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        // Error al validar - limpiar sesión
        console.error("Error validando token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  // ---------------------------------------------------------
  // Mostrar loader mientras valida la sesión
  // ---------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};