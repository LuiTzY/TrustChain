import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProductService } from "@/services/product";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export const EditProductModal = ({ open, onOpenChange, product }: EditProductModalProps) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image_url,
  });

  // ctualizar formData cuando cambie el producto
  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
    });
  }, [product]);

  // Mutation para actualizar usando ProductService
  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Usa ProductService.update que devuelve la data del producto
      const response = await ProductService.updateProduct(product.id, data);
      return response;
    },
    onSuccess: (data) => {
      toast.success('Producto actualizado exitosamente');
      // Refrescar la lista de productos
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Cerrar el modal
      onOpenChange(false);
      
      // Opcional: hacer algo con la data devuelta
      console.log('Producto actualizado:', data);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Actualiza la información del producto "{product.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del producto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: NFT Digital Art"
              required
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe tu producto..."
              rows={3}
              required
            />
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price">Precio (en Wei)</Label>
            <Input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              placeholder="1000000000000000000"
              required
            />
            <p className="text-xs text-muted-foreground">
              Precio en Wei (1 ETH = 10^18 Wei)
            </p>
          </div>


          {/* URL de imagen */}
          <div className="space-y-2">
            <Label htmlFor="image_url">URL de imagen</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Preview de imagen */}
          {formData.image_url && (
            <div className="space-y-2">
              <Label>Vista previa</Label>
              <div className="relative h-32 rounded-lg overflow-hidden border">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 
                      'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
                  }}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};