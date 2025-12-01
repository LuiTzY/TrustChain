import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PurchaseDialog } from "@/components/PurchaseDialog";
import { ChatDialog } from "@/components/ChatDialog";
import { formatEther } from "ethers";

interface ProductCardProps {
  id: number;
  image_url?: string;
  name: string;
  description?: string;
  price: string;
  type?: string;
}

export const ProductCard = ({ id, image_url, name, description, price, type }: ProductCardProps) => {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <PurchaseDialog
        open={isPurchaseOpen}
        onOpenChange={setIsPurchaseOpen}
        productTitle={name}
        productPrice={price}
      />
      <ChatDialog
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        productTitle={name}
      />
    <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(42,56,255,0.3)]">
      <Link to={`/product/${id}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image_url ? image_url : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80"} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {type}
            </span>
          </div>
        </div>
      </Link>
      
      {/*Seccion de botones */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
            <Button
              size="sm"
              onClick={() => setIsPurchaseOpen(true)}
              className="gradient-primary hover:opacity-90 transition-opacity"
            >
              Comprar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsChatOpen(true)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingCart className="w-4 h-4" />
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
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Precio</p>
            <p className="text-xl font-bold">
              {formatEther(price)}ETH
            </p>
          </div>
          
          
        </div>
      </div>
    </div>
    </>
  );
};
