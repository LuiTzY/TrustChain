import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/apps/products/types/product.types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  cartCount: number;
  cartTotal: number;
  handleCheckout: (contract: any, onSuccess?: () => void) => Promise<void>;
  isCheckingOut: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'trustchain_cart';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    };

    loadCartFromStorage();
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    if (isInCart(product.id)) {
      toast({
        title: "Producto descartado",
        description: "No se permite la compra de más de un producto",
        className: "bg-blue-500 text-white border-blue-600",
      });
      return;
    }

    setCartItems(prevItems => [...prevItems, product]);
    toast({
      title: "Producto agregado",
      description: "Agregamos correctamente el producto al carrito",
      className: "bg-green-500 text-white border-green-600",
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Producto eliminado",
      description: "Se ha eliminado el producto del carrito",
      className: "bg-gray-500 text-white border-gray-600",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrito vaciado",
      description: "Se han eliminado todos los productos del carrito",
      className: "bg-gray-500 text-white border-gray-600",
    });
  };

  const isInCart = (id: number): boolean => {
    return cartItems.some(item => item.id === id);
  };

  const handleCheckout = async (contract: any, onSuccess?: () => void) => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Tu carrito está vacío.",
        className: "bg-yellow-500 text-white border-yellow-600",
      });
      return;
    }

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
      let results = [];

      // Importar dinámicamente la función buyProductOnChain
      const { buyProductOnChain } = await import('@/apps/helpers/web3');

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
          });
        } else {
          toast({
            title: "Error en compra",
            description: `Ha ocurrido esto al momento de comprar: ${receipt.data}`,
            className: "bg-red-500 text-white border-red-600",
          });
        }
      }

      // Mostrar resumen final si hay transacciones exitosas
      if (results.length > 0) {
        const summary = results
          .map(r => `Producto ${r.productId} → TX: ${r.txHash}`)
          .join('\n');

        toast({
          title: "Checkout completado",
          description: `Se procesaron ${results.length} transacciones exitosamente`,
          className: "bg-green-500 text-white border-green-600",
        });

        console.log('Resumen de transacciones:', summary);

        // Limpiar carrito solo si hubo éxito
        clearCart();

        // Callback de éxito (para cerrar drawers, etc)
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error('Error durante el checkout:', err);
      toast({
        title: "Error",
        description: "Ocurrió un error durante el checkout.",
        className: "bg-red-500 text-white border-red-600",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartCount = cartItems.length;

  const cartTotal = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    cartCount,
    cartTotal,
    handleCheckout,
    isCheckingOut,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para usar el carrito
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
