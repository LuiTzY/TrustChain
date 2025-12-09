import { Wallet } from "lucide-react";

import { UserService } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const BalanceBadge = () => {

    const {data, isLoading, error} = useQuery({
        queryKey:["userBalance"],
        queryFn:UserService.getUserBalance
    });
    // console.log(data)
    const balance = data?.data ?? null;

  return (
   <div className="animate-fade-in">
  <div className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:shadow-[0_0_30px_rgba(42,56,255,0.3)] transition-all">
    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-glow">
      <Wallet className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">Tu Balance disponible</p>
        {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : error ? (
        <p className="text-sm text-red-400">Error</p>
      ) : (
        <p className="text-xl font-bold">
          {balance} ETH
        </p>
      )}
    </div>
  </div>
</div>
  );
};
