import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Wallet as WalletIcon, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Bitcoin
} from "lucide-react";

const UserWallet = () => {
  const balance = {
    eth: "5.245",
    usd: "8,916.50"
  };

  const assets = [
    { symbol: "ETH", name: "Ethereum", amount: "5.245", value: "$8,916.50", change: "+5.2%" },
    { symbol: "MATIC", name: "Polygon", amount: "1,250", value: "$1,125.00", change: "+2.8%" },
    { symbol: "BTC", name: "Bitcoin", amount: "0.125", value: "$5,375.00", change: "-1.5%" }
  ];

  const transactions = [
    {
      type: "received",
      amount: "+2.5 ETH",
      from: "Compra NFT",
      date: "Hace 2 horas",
      hash: "0x1234...5678"
    },
    {
      type: "sent",
      amount: "-0.8 ETH",
      from: "Compra License",
      date: "Hace 5 horas",
      hash: "0xabcd...efgh"
    },
    {
      type: "received",
      amount: "+1.2 ETH",
      from: "Venta Collectible",
      date: "Hace 1 día",
      hash: "0x9876...5432"
    }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="glass-card border-b border-border p-6 sticky top-0 z-10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-1">
              Mi <span className="gradient-text">Wallet</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestiona tus criptomonedas y activos digitales
            </p>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Balance Card */}
            <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/30 neon-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Balance Total</p>
                  <p className="text-4xl font-bold gradient-text">{balance.eth} ETH</p>
                </div>
              </div>
              <p className="text-2xl text-foreground mb-6">≈ ${balance.usd} USD</p>
              
              <div className="flex gap-3">
                <Button className="btn-gradient text-white font-semibold flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Depositar
                </Button>
                <Button variant="outline" className="border-border hover:border-primary flex-1">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>

            {/* Assets Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Mis Activos</h2>
              <div className="grid gap-4">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-2xl p-6 shadow-card card-hover"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                          <Bitcoin className="w-6 h-6 text-background" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-foreground">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">{asset.amount}</p>
                        <p className="text-sm text-muted-foreground">{asset.value}</p>
                      </div>
                      
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        asset.change.startsWith('+') 
                          ? 'bg-accent/10 text-accent border border-accent/30' 
                          : 'bg-destructive/10 text-destructive border border-destructive/30'
                      }`}>
                        {asset.change.startsWith('+') ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-semibold">{asset.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Transacciones Recientes</h2>
              <div className="glass-card rounded-2xl p-6 shadow-card">
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.type === 'received' 
                            ? 'bg-accent/20 text-accent' 
                            : 'bg-primary/20 text-primary'
                        }`}>
                          {tx.type === 'received' ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{tx.from}</p>
                          <p className="text-sm text-muted-foreground font-mono">{tx.hash}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          tx.type === 'received' ? 'text-accent' : 'text-primary'
                        }`}>
                          {tx.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserWallet;