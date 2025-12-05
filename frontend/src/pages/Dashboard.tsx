import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/components/ProductCard";
import { Search, ShoppingCart, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import { BalanceBadge } from "@/components/BalanceBadge";
import { DashboardService } from "@/services/dashboard";
import { Product } from "@/apps/products/types/product.types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/apps/users/context/WalletContext";
import { buyProductOnChain } from "@/apps/helpers/web3";



const Dashboard = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {toast} = useToast();
  const { account } = useWallet();
  const [loading, setLoading] = useState(false);

  const {data, isLoading, error} = useQuery({
    queryKey:["products"],
    queryFn: ProductService.getAll
  })

  const insightsQuery =  useQuery({
    queryKey:["insigths"],
    queryFn:DashboardService.getInsights
  })
  
  const [searchTerm, setSearchTerm] = useState("");

  
  if (isLoading) return;
  if (error) {
    console.log(error);
    return <p>Error al cargar productos </p>
  };
  
  const filteredProducts = data.data?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (id: number) => {
    const product = data.data.find(p => p.id === id);
    if (product && !cartItems.find(item => item.id === id)) {
      setCartItems([...cartItems, product]);
      toast({
        title: "Producto agregado",
        description: "Agregamos correctamente el producto al carrito",
        className: "bg-green-500 text-white border-green-600",
        
      });
    } else if (cartItems.find(item => item.id === id)) {
      toast({
        title: "Producto descartado",
        description: "No se permite la compra de mas de un producto",
        className: "bg-blue-500 text-white border-blue-600",
        
      });
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {

  if (cartItems.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  try {
    setLoading(true);

    let results = [];

    //Aqui ejecutamos la compra  iterando por cada producto del carrito
    for (const item of cartItems) {
      const { id, price } = item;

      console.log(`Comprando producto ${id} por ${price} ETH...`);

      const receipt = await buyProductOnChain(id, price);

      results.push({
        productId: id,
        txHash: receipt.hash,
      });
    }

    // Mostrar resumen final
    alert(`Checkout completado:\n${results.map(r => (
      `Producto ${r.productId} → TX: ${r.txHash}`
    )).join("\n")}`);

    // limpiar carrito
    setCartItems([]);
    setIsCartOpen(false);

  } catch (err) {
    console.error(err);
    alert("un error durante el checkout.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">
      <Loader message="Cargando productos por favor espera" loading={isLoading} />
      <Sidebar />
      
      
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        <BalanceBadge />
        
        <Button 
          variant="outline" 
          className="border-border hover:border-primary shadow-lg relative w-full"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Carrito
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </div>

      <CartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
 
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  TrustChain Marketplace 
                </h1>
                <p className="text-muted-foreground">
                  Explora activos digitales verificados en blockchain
                </p>
              </div>
              
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Volumen 24h</p>
                  <p className="text-sm font-bold">152.8 ETH</p>
                </div>
              </div>
            </div>

            {/* Search bar */}
         <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <Input
              placeholder="Buscar NFTs, tokens, licencias..."
              className="pl-12 bg-card border-border h-14 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Total de productos</p>
              
                
                {insightsQuery ? 
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {insightsQuery.data.data.products} </p>
                  :
                   <p>Cargando productos</p>
                }
              
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Usuarios registrados</p>
              
              {insightsQuery ? 
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {insightsQuery.data.data.users} </p>
                  :
                   <p>Cargando Usuarios</p>
                }
              
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Productos vendidos</p>
              {insightsQuery ? 
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {insightsQuery.data.data.sellers} </p>
                  :
                   <p>Cargando Productos vendidos</p>
                }
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Transacciones hoy</p>
            

              {insightsQuery ? 
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {insightsQuery.data.data.payments} </p>
                  :
                   <p>Cargando transacciones</p>
                }
            </div>
          </div>

          {/* Products grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Activos disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
