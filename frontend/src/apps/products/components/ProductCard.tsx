import { ShoppingCart, MessageCircle, Trash2, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChatDialog } from "@/apps/products/components/ChatDialog";
import { formatEther } from "ethers";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { useCart } from "@/apps/users/context/CartContext";
import { EditProductModal } from "@/apps/products/components/EditModal";
import { ProductService } from "@/services/product";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { User, User as UserType } from "@/apps/users/types/user.types";


interface ProductCardProps {
  id: number;
  image_url?: string;
  name: string;
  description?: string;
  price: string;
  user_buyer?: User;
  user_seller?: User;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onAddToCart?: (id: number) => void;
}

export const ProductCard = ({ 
  id, 
  image_url, 
  name, 
  description, 
  price, 
  user_seller, 
  user_buyer,
  onEdit, 
  onDelete, 
  onAddToCart 
}: ProductCardProps) => {
  
  const token =  localStorage.getItem("accessToken");
  console.log("Este es el token", token)
  //obtenemos la wallet para validar que el buyer no pueda editar un producto que no le pertenece
  const user:UserType = jwtDecode(token);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();
  
  console.log(user_seller)
  // Hook del carrito
  const { addToCart, isInCart } = useCart();
  
  // Estado para saber si el producto estado en el carrito
  const inCart = isInCart(id);
  
  // Producto completo para pasar al modal
  const product = {
    id,
    name,
    description: description || '',
    price,
    image_url: image_url || '',
    seller: user_seller
  };

  // Mutation para eliminar producto
  const deleteMutation = useMutation({
  mutationFn: async () => {
      try {
        await ProductService.deleteProduct(id);
        return { success: true };
      } catch (error) {
        throw new Error('Error al eliminar el producto');
      }
    },
    onSuccess: () => {
      toast.success('Producto eliminado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onDelete?.(id);
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });

  // funcion para agregar al carrito
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
    } else {
      addToCart(product);
    }
  };

  // Función para editar - abre el modal
  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    } else {
      setIsEditOpen(true);
    }
  };

  // Función para eliminar
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      {/* Chat Dialog */}
      <ChatDialog
        productId={id}
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        productTitle={name}
      />

      {/* Edit Modal */}
      <EditProductModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        product={product}
      />

      {/* Product Card */}
      <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(42,56,255,0.3)]">
        <Link to={`/product/${id}`}>
          <div className="relative h-64 overflow-hidden">
            <img 
              src={image_url || "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80"} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            

            {/* Badge si está en el carrito */}
            {inCart && (
              <div className="absolute bottom-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white flex items-center gap-1 shadow-lg">
                  <Check className="w-3 h-3" />
                  En carrito
                </span>
              </div>
            )}
          </div>
        </Link>
        
        {/* Botones de acción rápida - Chat y Carrito */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsChatOpen(true)}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background/90 backdrop-blur-sm"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className={`${
              inCart 
                ? 'border-green-500 text-green-500 bg-green-500/20' 
                : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
            } bg-background/90 backdrop-blur-sm`}
            onClick={handleAddToCart}
            disabled={inCart}
          >
            {inCart ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="p-6">
          <Link to={`/product/${id}`}>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {description}
            </p>
          </Link>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              Vendedor: {product.seller.username}
          </p>
          {/* Precio */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Precio</p>
            <p className="text-2xl font-bold gradient-text">
              {formatEther(price)} ETH
            </p>
          </div>

           

          {/* Botones de editar y eliminar */}

          {user.wallet_address === product.seller.wallet_address && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="flex-1"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};