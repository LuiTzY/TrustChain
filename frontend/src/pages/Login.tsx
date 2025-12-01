import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginIllustration from "@/assets/login-illustration.png";
import { WalletDialog } from "@/components/WalletDialog";

const Login = () => {
  const navigate = useNavigate();
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleRegister = () => {
    // Generar wallet address simulado
    const mockWallet = "0x" + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setWalletAddress(mockWallet);
    setIsWalletDialogOpen(true);
  };

  return (
    <>
      <WalletDialog
        open={isWalletDialogOpen}
        onOpenChange={(open) => {
          setIsWalletDialogOpen(open);
          if (!open) navigate("/dashboard");
        }}
        walletAddress={walletAddress}
      />
      <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        
        <div className="w-full max-w-md relative z-10 glass-card p-8 rounded-3xl">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center font-bold text-2xl mb-6 animate-glow mx-auto">
              TC
            </div>
            <h1 className="text-4xl font-bold mb-2 text-center gradient-primary bg-clip-text text-transparent">
              TrustChain
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              Tu identidad digital, asegurada en blockchain
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border focus:border-primary transition-colors"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary hover:opacity-90 transition-opacity text-lg py-6"
            >
              Accede a tu espacio digital
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <button 
                onClick={handleRegister}
                className="text-primary hover:underline font-semibold"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              🔒 Protegido por tecnología blockchain descentralizada
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20"></div>
        <img
          src={loginIllustration}
          alt="Blockchain illustration"
          className="relative z-10 max-w-lg w-full object-contain animate-fade-in"
        />
      </div>
    </div>
    </>
  );
};

export default Login;
