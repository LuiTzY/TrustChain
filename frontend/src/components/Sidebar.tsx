import { Home, ShoppingBag, Wallet, Activity, User, Shield } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { icon: Home, label: "Inicio", path: "/login" },
  { icon: ShoppingBag, label: "Marketplace", path: "/dashboard" },
  { icon: Wallet, label: "Mi Wallet", path: "/wallet" },
  { icon: Activity, label: "Transacciones", path: "/transactions" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export const Sidebar = () => {
  return (
    <aside className="w-20 lg:w-64 glass-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-bold text-lg gradient-text">TrustChain</h2>
            <p className="text-xs text-muted-foreground">Blockchain Market</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-muted/50"
                activeClassName="bg-gradient-primary text-white shadow-neon"
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile at bottom */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30">
          <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-bold text-background">
            JD
          </div>
          <div className="hidden lg:block flex-1">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-muted-foreground">0x1234...5678</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
