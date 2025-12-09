import { Sidebar } from "@/components/Sidebar";
import { Wallet as WalletIcon, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user";
import { ProductService } from "@/services/product";
import { getEthRates } from "@/services/blockchain";



const WalletU = () => {
  const balanceQuery = useQuery({
    queryKey: ["userBalance"],
    queryFn: UserService.getUserBalance
  });

  const productsQuery = useQuery({
    queryKey: ["payments"],
    queryFn: UserService.getMyBuys
  });

   const {data, isLoading, error} = useQuery({
      queryKey:["payments"],
      queryFn: ProductService.getPayments,
      refetchInterval: 3000000, // actualiza cada 30s

    })

    const { data: rates } = useQuery({
      queryKey: ["eth-rates"],
      queryFn: getEthRates,
      refetchInterval: 30000, // actualiza cada 30s
    });

    if (!rates) return null;

    const { usd, dop, formattedUSD, formattedDOP } = convertEthBalance(
      10000,
      rates.priceUSD,
      rates.priceDOP
    );

  const transactions = data?.data;
  

  // Extraer datos de forma segura
  const balance = balanceQuery?.data?.data || 0;
  const myAssets = productsQuery?.data?.data || [];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Mi <span className="gradient-text">Wallet</span>
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus activos y transacciones en blockchain
            </p>
          </div>

          {/* Balance card */}
          <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <WalletIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance total</p>
                    {balanceQuery.isLoading ? (
                      <p className="text-2xl font-bold text-muted-foreground">
                        Cargando...
                      </p>
                    ) : balanceQuery.isError ? (
                      <p className="text-2xl font-bold text-red-500">
                        Error al cargar
                      </p>
                    ) : (
                      <>
                        <p className="text-4xl font-bold">
                          {balance} ETH
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          DOP: {formattedDOP}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          USD: {formattedUSD}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-semibold">+12.5%</span>
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transactions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Transacciones recientes</h2>
              <div className="space-y-4">
                {transactions?.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="glass-card rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(42,56,255,0.2)] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/20">
                      
                          <ArrowDownLeft className="w-5 h-5 text-primary" />
                          <ArrowUpRight className="w-5 h-5 text-accent" />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-semibold">{tx.tx_hash}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold ${tx.buyer_address === 'buy' ? 'text-primary' : 'text-accent'}`}>
                          {tx.amout}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owned Assets */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Mis activos</h2>
              
              {productsQuery.isLoading ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <p className="text-muted-foreground">Cargando activos...</p>
                </div>
              ) : productsQuery.isError ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <p className="text-red-500">Error al cargar activos</p>
                </div>
              ) : myAssets.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    📦
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No tienes activos</h3>
                  <p className="text-sm text-muted-foreground">
                    Aún no has adquirido ningún activo digital
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myAssets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className="glass-card rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(42,56,255,0.2)] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={asset.image_url}
                          alt={asset.name || "Activo"}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{asset.name || "Sin nombre"}</p>
                          <p className="text-muted-foreground text-sm">Valorado en</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold gradient-text">
                            {asset.price || "0"} ETH
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="glass-card rounded-2xl p-8 mt-6 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-glow flex items-center justify-center mx-auto mb-4 text-3xl">
                  🔒
                </div>
                <h3 className="font-semibold text-lg mb-2">Seguridad garantizada</h3>
                <p className="text-sm text-muted-foreground">
                  Todos tus activos están protegidos por la tecnología blockchain y criptografía de última generación
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletU;

export function convertEthBalance(balanceEth: number, priceUSD: number, priceDOP: number) {
  const usd = Number(balanceEth) * Number(priceUSD);
  const dop = Number(balanceEth) * Number(priceDOP);

  const formattedUSD = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(usd);

  const formattedDOP = new Intl.NumberFormat("es-DO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(dop);

  return { usd, dop, formattedUSD, formattedDOP };
}
