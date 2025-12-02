import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductService } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { 
  Activity,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Calendar
} from "lucide-react";
import { Loader } from "@/components/ui/loader";

const Transactions = () => {
  const {data, isLoading, error} = useQuery({
    queryKey:["payments"],
    queryFn: ProductService.getPayments
  })

  if (isLoading) return;
  if (error) {
    console.log(error);
    return <p>Error al cargar productos </p>};

    const payments =  data.data;
  return (
    <div className="flex min-h-screen">
      <Loader message="Cargando Pagos por favor espera" loading={isLoading} />
      
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="glass-card border-b border-border p-6 sticky top-0 z-10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  <span className="gradient-text">Transacciones</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Historial completo de tus operaciones en blockchain
                </p>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{payments.length} transacciones</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por hash, item o dirección..."
                  className="pl-12 bg-background/50 border-border focus:border-primary"
                />
              </div>
              <Button variant="outline" className="border-border hover:border-primary">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" className="border-border hover:border-primary">
                <Calendar className="w-4 h-4 mr-2" />
                Fecha
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {payments.map((tx) => (
              <div
                key={tx.id}
                className="glass-card rounded-2xl p-6 shadow-card hover:shadow-neon transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Transaction Icon & Type */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.status === 'purchase' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-accent/20 text-accent'
                    }`}>
                      {tx.status === 'purchase' ? (
                        <ArrowUpRight className="w-6 h-6" />
                      ) : (
                        <ArrowDownLeft className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-foreground">{tx.product_info.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === 'Completado'
                            ? 'bg-accent/10 text-accent border border-accent/30'
                            : 'bg-secondary/10 text-secondary border border-secondary/30'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {tx.status === 'purchase' ? 'Compra' : 'Venta'} • 
                      </p>
                      
                      {/* Transaction Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Hash:</span>
                          <code className="font-mono text-xs text-foreground bg-muted/30 px-2 py-1 rounded">
                            {tx.tx_hash.slice(0, 10)}...{tx.tx_hash.slice(-8)}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">De:</span>
                          <code className="font-mono text-foreground">{tx.seller_address}</code>
                          <span className="text-muted-foreground">→</span>
                          <code className="font-mono text-foreground">{tx.buyer_address}</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="lg:text-right lg:ml-auto shrink-0">
                    <p className={`text-2xl font-bold mb-1 ${
                      tx.status === 'purchase' ? 'text-primary' : 'text-accent'
                    }`}>
                      {tx.status === 'purchase' ? '-' : '+'}{tx.amout}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ≈ {tx.amout}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="max-w-7xl mx-auto mt-8 text-center">
            <Button variant="outline" size="lg" className="border-border hover:border-primary">
              Cargar más transacciones
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;