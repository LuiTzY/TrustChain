import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';
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

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProductModal = ({ open, onOpenChange }: CreateProductModalProps) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    image_url: '',
  });

  // Mutation para crear producto
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await ProductService.createProduct(data);
      return response;
    },
    onSuccess: () => {
      toast.success('Producto creado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onOpenChange(false);
      // Limpiar formulario
      setFormData({
        name: '',
        description: '',
        price: '',
        type: '',
        image_url: '',
      });
    },
    onError: (error: Error) => {
      toast.error(`Error al crear: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Crear Nuevo Producto
          </DialogTitle>
          <DialogDescription>
            Completa la información para publicar tu producto en el marketplace
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nombre del producto *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: NFT Digital Art Collection"
              className="bg-background/50"
              required
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Descripción *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe tu producto, sus características y beneficios..."
              rows={4}
              className="bg-background/50 resize-none"
              required
            />
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground">
              Precio (en Wei) *
            </Label>
            <Input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              placeholder="1000000000000000000"
              className="bg-background/50 font-mono"
              required
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                💡 Tip
              </span>
              <span>1 ETH = 1,000,000,000,000,000,000 Wei (10^18)</span>
            </div>
          </div>

          {/* URL de imagen */}
          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-foreground">
              URL de imagen
            </Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="bg-background/50"
            />
          </div>

          {/* Preview de imagen */}
          {formData.image_url && (
            <div className="space-y-2">
              <Label className="text-foreground">Vista previa</Label>
              <div className="relative h-40 rounded-xl overflow-hidden border border-border">
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

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="btn-gradient text-white"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Producto
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};