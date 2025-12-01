import { Sidebar } from "@/components/Sidebar";
import { Wallet as WalletIcon, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import nft1 from "@/assets/nft-1.png";
import nft2 from "@/assets/nft-2.png";

const transactions = [
  {
    id: 1,
    type: "buy",
    name: "Cyberpunk Cityscape NFT",
    amount: "2.5 ETH",
    date: "Hace 2 horas",
    status: "Completado"
  },
  {
    id: 2,
    type: "sell",
    name: "Digital Asset #4523",
    amount: "1.8 ETH",
    date: "Ayer",
    status: "Completado"
  },
  {
    id: 3,
    type: "buy",
    name: "Software License Pro",
    amount: "0.9 ETH",
    date: "Hace 3 días",
    status: "Completado"
  }
];

const ownedAssets = [
  { id: 1, image: nft1, name: "Cyberpunk Cityscape", value: "2.5 ETH" },
  { id: 2, image: nft2, name: "Holographic Genesis", value: "1.8 ETH" }
];

const Wallet = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Mi <span className="gradient-primary bg-clip-text text-transparent">Wallet</span>
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
                    <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                      15.8 ETH
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-semibold">+12.5%</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="gradient-primary hover:opacity-90">
                  Depositar
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Retirar
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transactions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Transacciones recientes</h2>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="glass-card rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(42,56,255,0.2)] transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.type === 'buy' ? 'bg-primary/20' : 'bg-accent/20'
                      }`}>
                        {tx.type === 'buy' ? (
                          <ArrowDownLeft className="w-5 h-5 text-primary" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-semibold">{tx.name}</p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold ${tx.type === 'buy' ? 'text-primary' : 'text-accent'}`}>
                          {tx.type === 'buy' ? '-' : '+'}{tx.amount}
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
              <div className="space-y-4">
                {ownedAssets.map((asset) => (
                  <div key={asset.id} className="glass-card rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(42,56,255,0.2)] transition-all">
                    <div className="flex items-center gap-4">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{asset.name}</p>
                        <p className="text-muted-foreground">Valorado en</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                          {asset.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-8 mt-6 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-glow flex items-center justify-center mx-auto mb-4 animate-glow">
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

export default Wallet;
