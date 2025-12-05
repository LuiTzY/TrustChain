import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
    toast({
      title: "Cierre de sesión",
      description: "Haz iniciado sesion correctamente",
      className: "bg-green-500 text-white border-green-600",
      
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full lg:w-auto flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:block font-medium">Cerrar sesión</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="glass-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            ¿Cerrar sesión?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Estás a punto de cerrar tu sesión. Tendrás que volver a iniciar sesión para acceder a tu wallet y activos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border hover:bg-muted">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Cerrar sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
