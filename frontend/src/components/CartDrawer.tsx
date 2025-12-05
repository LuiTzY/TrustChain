import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bitcoin, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/apps/products/types/product.types";
import { useWallet } from "@/apps/users/context/WalletContext";

interface CartItem {
  id: number;
  title: string;
  price: string;
  priceUsd?: string;
  image: string;
  category?: string;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Product[];
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export const CartDrawer = ({ open, onOpenChange, items, onRemoveItem, onCheckout }: CartDrawerProps) => {

  const {account, connect} = useWallet();

  
  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(4);

  const handleCheckout = () => {

    if (!account) {
     alert("Conecta tu wallet primero.");
      return;
    }

    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }
    onCheckout();
    toast.success("Procesando compra...");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-l border-border/50 w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl gradient-text">
            <ShoppingBag className="w-6 h-6" />
            Mi Carrito
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Agrega productos del marketplace
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-xl p-4 flex gap-4 card-hover"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover bg-gradient-to-br from-primary/20 to-secondary/20"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            onRemoveItem(item.id);
                            toast.success("Producto eliminado del carrito");
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mt-2">
                        <Bitcoin className="w-4 h-4 text-accent" />
                        <span className="font-bold gradient-text">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

           <div className="space-y-4">
            <div className="glass-card rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <div className="flex items-baseline gap-2">
                  <Bitcoin className="w-4 h-4 text-accent" />
                  <span className="font-bold gradient-text">{total}</span>
                </div>
              </div>
            </div>

          {/*Validamos que boton mostrar si no tiene una wallet conectada */}
            {!account ? (
              <SheetFooter>
                <Button
                  className="w-full btn-gradient text-white font-semibold h-12"
                  onClick={connect}
                >
                  Conectar Wallet
                </Button>
              </SheetFooter>
            ) : (
              <SheetFooter>
                <Button
                  className="w-full btn-gradient text-white font-semibold h-12"
                  onClick={handleCheckout}
                >
                  Proceder al Pago
                </Button>
              </SheetFooter>
            )}
          </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
