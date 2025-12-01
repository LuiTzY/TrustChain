import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Mail, Wallet, Save, UserCircle2 } from "lucide-react";
import type { User as UserType } from "../types/user.types";

interface UserEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: UserType;
  onSubmit: (updatedUser: Partial<UserType>) => void;
}

export const UserEditModal = ({
  open,
  onOpenChange,
  userData,
  onSubmit,
}: UserEditModalProps) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    wallet_address: "",
  });

  // ------------------------------------------------------
  // ✔ Cargar datos iniciales cuando abra el modal
  // ------------------------------------------------------
  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        wallet_address: userData.wallet_address ?? "",
      });
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error("Debes completar tu nombre y apellido");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Email inválido");
      return;
    }

    onSubmit(formData);

    toast.success("Perfil actualizado correctamente");

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
            <User className="w-6 h-6" />
            Editar Perfil
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Actualiza tu información personal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* FIRST NAME */}
          <div className="space-y-2">
            <Label htmlFor="first_name" className="font-semibold">
              Nombre
            </Label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="pl-10 bg-background/50 border-border"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          {/* LAST NAME */}
          <div className="space-y-2">
            <Label htmlFor="last_name" className="font-semibold">
              Apellido
            </Label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="pl-10 bg-background/50 border-border"
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-10 bg-background/50 border-border"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* WALLET */}
          <div className="space-y-2">
            <Label htmlFor="wallet_address" className="font-semibold">
              Wallet (opcional)
            </Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="wallet_address"
                value={formData.wallet_address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wallet_address: e.target.value,
                  })
                }
                className="pl-10 bg-background/50 border-border font-mono text-sm"
                placeholder="0x..."
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Ethereum / Polygon wallet address
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 btn-gradient text-white font-semibold py-6"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border hover:border-primary"
            >
              Cancelar
            </Button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            🔒 Tus datos están protegidos con encriptación de extremo a extremo
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
