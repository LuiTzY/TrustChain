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
import { Wallet, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productPrice: string;
}

export const PurchaseDialog = ({ open, onOpenChange, productTitle, productPrice }: PurchaseDialogProps) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const handleMetaMaskConnect = () => {
    // Simulación de conexión con MetaMask
    const mockAddress = "0x" + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setWalletAddress(mockAddress);
    toast({
      title: "MetaMask conectado",
      description: "Wallet conectada exitosamente",
    });
  };

  const handlePurchase = () => {
    if (!walletAddress) {
      toast({
        title: "Error",
        description: "Por favor conecta tu wallet primero",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulación de compra
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);
      toast({
        title: "¡Compra exitosa!",
        description: `Has adquirido ${productTitle}`,
      });
      
      setTimeout(() => {
        setIsPurchased(false);
        setWalletAddress("");
        onOpenChange(false);
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        {!isPurchased ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
                Comprar Activo Digital
              </DialogTitle>
              <DialogDescription className="text-base">
                {productTitle}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="glass-card p-4 rounded-lg border border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Precio</p>
                <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  {productPrice}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="wallet"
                    placeholder="0x..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMetaMaskConnect}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Wallet className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Wallet className="w-3 h-3" />
                  Conecta con MetaMask para autollenar
                </p>
              </div>

              <Button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="gradient-primary hover:opacity-90 transition-opacity w-full"
              >
                {isProcessing ? "Procesando..." : "Confirmar compra"}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
            <h3 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              ¡Compra exitosa!
            </h3>
            <p className="text-muted-foreground">
              El activo ha sido transferido a tu wallet
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};