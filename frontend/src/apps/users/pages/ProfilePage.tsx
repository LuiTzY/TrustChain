import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { UserEditModal } from "../pages/UserEditModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Mail,
  Wallet,
  Edit,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

import type { User } from "../types/user.types";
import { UserService } from "@/services/user";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

  // ---------------------------------------------------------
  // Cargar perfil del usuario
  // ---------------------------------------------------------
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // decodificamos el token
        const decoded: any = jwtDecode(token);
        const userId = decoded.user_id || decoded.id || decoded.sub;

        console.log(userId)
        console.log(decoded);
        if (!userId) {
          toast.error("Token inválido");
          // navigate("/login");
          return;
        }

        // 3. Obtener datos del usuario
        const data = await UserService.getUserById(userId);
        
        console.log("Servicio de data", data)
        // 4. Validar que tiene los campos necesarios
        if (!data || !data.first_name || !data.last_name) {
          throw new Error("Datos de usuario incompletos");
        }

        // 5. Guardar en estado
        setUserData(data);
        
      } catch (error: any) {
        console.error("Error al cargar perfil:", error);
        toast.error(error.message || "Error al cargar el perfil");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []); // Solo se ejecuta una vez al montar

  // ---------------------------------------------------------
  // Actualizar perfil
  // ---------------------------------------------------------
  const handleUpdateUser = async (updatedFields: Partial<User>) => {
    if (!userData) return;

    try {
      console.log("Esta es la data del user", userData)
      console.log("Estos son los campos a actualizar", updatedFields)
      const updatedUser = await UserService.updateUser(userData.id, updatedFields);
      // Actualizar estado local
      setUserData(updatedUser.data);
      
      // Actualizar localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast.success("Perfil actualizado correctamente");
      setIsEditModalOpen(false);
      
    } catch (error: any) {
      console.error("Error al actualizar perfil:", error);
      toast.error(error.message || "Error al actualizar el perfil");
    }
  };

  // ---------------------------------------------------------
  // Estados de carga y error
  // ---------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground">Cargando perfil...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">
            No se pudo cargar el perfil
          </p>
          <Button onClick={() => navigate("/login")}>
            Volver al login
          </Button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // Preparar datos para mostrar
  // ---------------------------------------------------------
  const initials = `${userData.first_name[0]}${userData.last_name[0]}`.toUpperCase();
  const fullName = `${userData.first_name} ${userData.last_name}`;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="glass-card border-b border-border p-6 sticky top-0 z-10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-1">
              Mi <span className="gradient-text">Perfil</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestiona tu identidad digital
            </p>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Profile Card */}
            <div className="glass-card rounded-2xl p-8 shadow-card">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-primary flex items-center justify-center text-5xl font-bold text-white shadow-neon">
                    {initials}
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-accent">
                      Verificado
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{fullName}</h2>
                      <p className="text-muted-foreground">
                        @{userData.username}
                      </p>
                    </div>

                    <Button
                      onClick={() => setIsEditModalOpen(true)}
                      className="btn-gradient text-white font-semibold"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span>{userData.email}</span>
                    </div>

                    {userData.wallet_address && (
                      <div className="flex items-start gap-3">
                        <Wallet className="w-5 h-5 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-mono text-sm break-all">
                            {userData.wallet_address}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Wallet conectada
                          </p>
                        </div>
                      </div>
                    )}

                    {userData.last_login && (
                      <div className="flex items-start gap-3">
                        <UserIcon className="w-5 h-5 text-muted-foreground mt-1" />
                        <p className="text-muted-foreground text-sm">
                          Último acceso:{" "}
                          {new Date(userData.last_login).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <UserEditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        userData={userData}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
};

export default Profile;