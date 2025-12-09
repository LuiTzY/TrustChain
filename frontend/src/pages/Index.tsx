import { Sidebar } from "@/components/Sidebar";
import { Search, Plus, Package, TrendingUp, DollarSign, Eye, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import { BalanceBadge } from "@/components/BalanceBadge";
import { formatEther } from "ethers";
import { ProductCard } from "@/apps/products/components/ProductCard";
import { CreateProductModal } from "@/apps/products/components/CreateModal";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/apps/users/context/CartContext";
import { useCheckout } from "@/hooks/checkout";
import { CartDrawer } from "@/components/CartDrawer";


const Index = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, addToCart, cartCount } = useCart();
  const { handleCheckout, isCheckingOut } = useCheckout();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCheckout = async () => {
    await handleCheckout(() => {
      setIsCartOpen(false);
    });
  };
  // Query para obtener productos propios
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-products"],
    queryFn: ProductService.getAllUserProducts,
  });

  if (isLoading) {
    return <Loader message="Cargando tus productos..." loading={isLoading} />;
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

  const products = data?.data || [];

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estadísticas
  const totalProducts = products.length;
  const totalValue = products.reduce((sum: number, p: any) => {
    try {
      return sum + parseFloat(formatEther(p.price));
    } catch {
      return sum;
    }
  }, 0);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {/* Modal para crear producto */}
      <CreateProductModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
      

      {/* Balance Badge flotante */}
      <div className="fixed top-6 right-6 z-50">
        <BalanceBadge />
         <div className="fixed top-6 right-6 z-50">
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
      </div>

      <main className="flex-1 ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 gradient-text">
                  Mis Productos
                </h1>
                <p className="text-muted-foreground">
                  Administra y publica tus productos en el marketplace
                </p>
              </div>

              <Button
                onClick={() => setIsCreateOpen(true)}
                className="btn-gradient text-white h-12 px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Crear Producto
              </Button>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar en mis productos..."
                className="pl-12 bg-card border-border h-14 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm">Total de productos</p>
                <Package className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold gradient-text">
                {totalProducts}
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm">Valor total</p>
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {totalValue.toFixed(4)} ETH
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm">Promedio precio</p>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {totalProducts > 0 ? (totalValue / totalProducts).toFixed(4) : '0.0000'} ETH
              </p>
            </div>
          </div>

          {/* Products grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {searchTerm ? 'Resultados de búsqueda' : 'Todos mis productos'}
              </h2>
              {searchTerm && (
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} resultados para "{searchTerm}"
                </p>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                {searchTerm ? (
                  <>
                    <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-2">
                      No se encontraron productos para "{searchTerm}"
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchTerm('')}
                    >
                      Limpiar búsqueda
                    </Button>
                  </>
                ) : (
                  <>
                    <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-2">
                      Aún no tienes productos
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Crea tu primer producto y comienza a vender en el marketplace
                    </p>
                    <Button
                      onClick={() => setIsCreateOpen(true)}
                      className="btn-gradient text-white"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Crear mi primer producto
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    {...product}
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

export default Index;