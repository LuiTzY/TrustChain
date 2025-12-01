import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress: string;
}

export const WalletDialog = ({ open, onOpenChange, walletAddress }: WalletDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast({
      title: "Dirección copiada",
      description: "Tu wallet address ha sido copiado al portapapeles",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            ¡Bienvenido a TrustChain!
          </DialogTitle>
          <DialogDescription className="text-base">
            Este es tu wallet address generado. Será usado para todas tus transacciones.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="glass-card flex-1 px-4 py-3 rounded-lg font-mono text-sm break-all border border-primary/30">
            {walletAddress}
          </div>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCopy}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Importante:</strong> Guarda esta dirección de forma segura. La necesitarás para recibir y enviar activos digitales en la blockchain.
          </p>
        </div>
        <Button
          onClick={() => onOpenChange(false)}
          className="gradient-primary hover:opacity-90 transition-opacity w-full mt-2"
        >
          Entendido
        </Button>
      </DialogContent>
    </Dialog>
  );
};
