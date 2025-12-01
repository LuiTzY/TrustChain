import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { User } from "../types/user.types";
import { UserService } from "@/services/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // importante
  const navigate = useNavigate();
  const {toast} =  useToast();

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

     toast({
        title: "Cierre de sesión",
        description: "Haz cerrado sesion correctamente",
        className: "bg-green-500 text-white border-green-600",
        
      });

      navigate("/login");

  };


  //Maneja el estado de cuando se hace un reload en la pagina para validar la sesion del usuario
   useEffect(() => {
    const token = localStorage.getItem("accessToken");

    //Caso en el que no tengamos token
    if (!token) {
      
      toast({
        title: "Sesion No encontrada",
        description: "No hemos podido encontrar tu sesión, lo sentimos",
        className: "bg-red-500 text-white border-red-600",
        
      });

      // setLoading(false);
      return;
    }

    // Validamos el token actual, para saber si mantendremos la sesion
    UserService.validateToken(token)
      .then((data) => {
        console.log("Esto es lo que recibimos", data)
        if (data) {
          console.log("Es true")
          navigate("/dashboard");
          //se vuelve a asignar la data del usuario
          setUser(token)
          return;
        }
        //Finalizamos la sesion en caso de quel token no sea el correcto
        logout();
      })
      .catch(() => {
        //en caso de error igualmente deslogueamos al usuario
        logout()
      })

  }, []);

  console.log("Verifiquemos el estatus de autenticacion", user)

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
