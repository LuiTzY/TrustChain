import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, FileText, ExternalLink, MessageCircle } from "lucide-react";
import { useState } from "react";
import nft1 from "@/assets/nft-1.png";
import { PurchaseDialog } from "@/components/PurchaseDialog";
import { ChatDialog } from "@/components/ChatDialog";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import { Loader } from "@/components/ui/loader";
import { formatEther } from "ethers";
import { blockchain_service } from "@/services/blockchain";
import { useAuth } from "@/apps/users/context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductService.getProductById(id),
  });


  const blockchainQuery = useQuery({
    queryKey:["blockchain-info"],
    queryFn: blockchain_service.getBlockchainInfo
  })

  const {user} = useAuth();

  if (isLoading) return <Loader loading={isLoading} message="Cargando producto..." />;

  return (
    <>
      <PurchaseDialog
        open={isPurchaseOpen}
        onOpenChange={setIsPurchaseOpen}
        productTitle={data.name}
        productPrice={data.price}
      />
      <ChatDialog
        productId={data.id}
        userId="1"
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        productTitle={data.name}
      />
      <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al marketplace
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="glass-card rounded-3xl overflow-hidden p-8">
              <img
                src={data.image_url ? data.image_url : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80"} 
                alt="Product"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  Producto {data.id}
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">
                  {data.name}
                </h1>
                <p className="text-muted-foreground">
                  {data.description}
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Precio actual</p>
                <p className="text-4xl font-bold mb-4">
                  {formatEther(data.price)}
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setIsPurchaseOpen(true)}
                    className="flex-1 gradient-primary hover:opacity-90 transition-opacity text-lg py-6"
                  >
                    Comprar ahora
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsChatOpen(true)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 px-6"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 px-6"
                  >
                    Agregar al carrito
                  </Button>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Información de blockchain
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contrato</span>
                    <span className="font-mono text-primary">
                      { blockchainQuery ?
                      blockchainQuery.data.data.marketplace_address
                      : "Cargando informacion del contrato"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estatus</span>
                    <span className="font-mono">Sincronizado</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain</span>
                    <span>Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estándar</span>
                    <span>ERC-721</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 border-border hover:border-primary"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver en Etherscan
                </Button>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  Descripción
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                 {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default ProductDetail;
