import { useState } from 'react';
import { useWallet } from '@/apps/users/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/apps/users/context/CartContext';
import { buyProductOnChain } from '@/apps/helpers/web3';

interface CheckoutResult {
  productId: number;
  txHash: string;
}

interface UseCheckoutReturn {
  handleCheckout: (onSuccess?: () => void) => Promise<void>;
  isCheckingOut: boolean;
  checkoutResults: CheckoutResult[];
}


export const useCheckout = (): UseCheckoutReturn => {
  const { cartItems, clearCart } = useCart();
  const { contract } = useWallet();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutResults, setCheckoutResults] = useState<CheckoutResult[]>([]);

  const handleCheckout = async (onSuccess?: () => void) => {
    // Validación: Carrito vacío
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Tu carrito está vacío.",
        className: "bg-yellow-500 text-white border-yellow-600",
      });
      return;
    }

    // Validación: Wallet conectada
    if (!contract) {
      toast({
        title: "Error de conexión",
        description: "No hay contrato conectado. Por favor, conecta tu wallet.",
        className: "bg-red-500 text-white border-red-600",
      });
      return;
    }

    try {
      setIsCheckingOut(true);
      const results: CheckoutResult[] = [];

      // Ejecutar la compra iterando por cada producto del carrito
      for (const item of cartItems) {
        const { id, price } = item;

        console.log(`Comprando producto ${id} por ${price} ETH...`);

        const receipt = await buyProductOnChain(contract, id, price);

        if (receipt.success) {
          results.push({
            productId: id,
            txHash: receipt.data.hash,
          });

          toast({
            title: "Transacción Procesada",
            description: `Tu Hash de compra: ${receipt.data.hash}`,
            className: "bg-green-500 text-white border-green-600",
            duration: 5000,
          });
        } else {
          toast({
            title: "Error en compra",
            description: `Ha ocurrido un error al comprar el producto ${item.name}: ${receipt.data}`,
            className: "bg-red-500 text-white border-red-600",
            duration: 7000,
          });
        }
      }

      // Guardar resultados
      setCheckoutResults(results);

      // Mostrar resumen final si hay transacciones exitosas
      if (results.length > 0) {
        const summary = results
          .map(r => `Producto ${r.productId} → TX: ${r.txHash}`)
          .join('\n');

        toast({
          title: "✅ Checkout completado",
          description: `Se procesaron ${results.length} de ${cartItems.length} transacciones exitosamente`,
          className: "bg-green-500 text-white border-green-600",
          duration: 5000,
        });

        console.log('Resumen de transacciones:', summary);

        // Limpiar carrito solo si hubo al menos una compra exitosa
        clearCart();

        // Callback de éxito (útil para cerrar drawers, navegar, etc)
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // Si ninguna transacción fue exitosa
        toast({
          title: "❌ Checkout fallido",
          description: "No se pudo procesar ninguna transacción. Intenta nuevamente.",
          className: "bg-red-500 text-white border-red-600",
          duration: 7000,
        });
      }
    } catch (err) {
      console.error('Error durante el checkout:', err);
      toast({
        title: "Error crítico",
        description: err instanceof Error ? err.message : "Ocurrió un error durante el checkout.",
        className: "bg-red-500 text-white border-red-600",
        duration: 7000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    handleCheckout,
    isCheckingOut,
    checkoutResults,
  };
};