import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bitcoin, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/apps/users/context/WalletContext";
import { useCart } from "@/apps/users/context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout?: () => void | Promise<void>; 
  isLoading?: boolean; 
}

export const CartDrawer = ({ 
  open, 
  onOpenChange,
  onCheckout,
  isLoading = false 
}: CartDrawerProps) => {
  // Obtener datos del carrito desde el contexto
  const { cartItems, removeFromCart, cartTotal, cartCount } = useCart();
  const { account, connect } = useWallet();

  // funcio de checkout por defecto si no se proporciona una
  const handleCheckout = async () => {
    // Validar wallet conectada
    if (!account) {
      toast.error("Conecta tu wallet primero");
      return;
    }

    // Validar carrito no vacío
    if (cartItems.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    // Si se proporciona onCheckout desde el padre, usarla
    if (onCheckout) {
      await onCheckout();
    } else {
      // Comportamiento por defecto
      toast.success("Procesando compra...");
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast.success("Producto eliminado del carrito");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-l border-border/50 w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl gradient-text">
            <ShoppingBag className="w-6 h-6" />
            Mi Carrito
            {cartCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Agrega productos del marketplace
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => onOpenChange(false)}
            >
              Explorar Productos
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
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
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mt-2">
                        <Bitcoin className="w-4 h-4 text-accent" />
                        <span className="font-bold gradient-text">{item.price} ETH</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-4">
              {/* Resumen del carrito */}
              <div className="glass-card rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Productos</span>
                  <span className="font-medium">{cartCount}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <div className="flex items-baseline gap-2">
                    <Bitcoin className="w-5 h-5 text-accent" />
                    <span className="text-xl font-bold gradient-text">
                      {cartTotal.toFixed(4)} ETH
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de accion */}
              {!account ? (
                <SheetFooter>
                  <Button
                    className="w-full btn-gradient text-white font-semibold h-12"
                    onClick={connect}
                    disabled={isLoading}
                  >
                    <Bitcoin className="w-5 h-5 mr-2" />
                    Conectar Wallet
                  </Button>
                </SheetFooter>
              ) : (
                <SheetFooter className="flex-col gap-2">
                  <Button
                    className="w-full btn-gradient text-white font-semibold h-12"
                    onClick={handleCheckout}
                    disabled={isLoading || cartItems.length === 0}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Procesando Transacciones...
                      </>
                    ) : (
                      <>
                        <Bitcoin className="w-5 h-5 mr-2" />
                        Proceder al Pago
                      </>
                    )}
                  </Button>
                  
                  {/* Informacion adicional */}
                  <p className="text-xs text-center text-muted-foreground">
                    Wallet conectada: {account?.slice(0, 6)}...{account?.slice(-4)}
                  </p>
                </SheetFooter>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};