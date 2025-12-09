import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/apps/products/components/ProductCard";
import { Search, ShoppingCart, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import { BalanceBadge } from "@/components/BalanceBadge";
import { DashboardService } from "@/services/dashboard";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/apps/users/context/CartContext";
import { useCheckout } from "@/hooks/checkout";


const Dashboard = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { cartItems, addToCart, cartCount } = useCart();
  const { handleCheckout, isCheckingOut } = useCheckout();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  });

  const insightsQuery = useQuery({
    queryKey: ["insights"],
    queryFn: DashboardService.getInsights
  });

  if (isLoading) {
    return <Loader message="Cargando productos por favor espera" loading={isLoading} />;
  }
  
  if (error) {
    console.error('Error al cargar productos:', error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error al cargar productos</h2>
          <p className="text-muted-foreground">Por favor, intenta recargar la página</p>
        </div>
      </div>
    );
  }

  const filteredProducts = data?.data?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddToCart = (id: number) => {
    const product = data.data.find(p => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  const onCheckout = async () => {
    await handleCheckout(() => {
      setIsCartOpen(false);
    });
  };

  return (
    <div className="min-h-screen flex">
      <Loader 
        message="Procesando transacciones en blockchain..." 
        loading={isCheckingOut} 
      />
      
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
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>

      <CartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        onCheckout={onCheckout}
        isLoading={isCheckingOut}
      />

      <main className="flex-1 ml-20 p-8">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Total de productos</p>
              {insightsQuery.data ? (
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {insightsQuery.data.data.products}
                </p>
              ) : (
                <div className="h-9 bg-muted animate-pulse rounded" />
              )}
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Usuarios registrados</p>
              {insightsQuery.data ? (
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {insightsQuery.data.data.users}
                </p>
              ) : (
                <div className="h-9 bg-muted animate-pulse rounded" />
              )}
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Productos vendidos</p>
              {insightsQuery.data ? (
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {insightsQuery.data.data.sellers}
                </p>
              ) : (
                <div className="h-9 bg-muted animate-pulse rounded" />
              )}
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm mb-2">Transacciones hoy</p>
              {insightsQuery.data ? (
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {insightsQuery.data.data.payments}
                </p>
              ) : (
                <div className="h-9 bg-muted animate-pulse rounded" />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Activos disponibles</h2>
              {searchTerm && (
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} resultados para "{searchTerm}"
                </p>
              )}
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-2">
                  {searchTerm 
                    ? `No se encontraron productos para "${searchTerm}"`
                    : 'No hay productos disponibles'
                  }
                </p>
                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    {...product} 
                    onAddToCart={handleAddToCart} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;