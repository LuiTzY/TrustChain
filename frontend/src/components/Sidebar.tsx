import { Home, ShoppingBag, Wallet, FileText, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { icon: Home, label: "Inicio", path: "/dashboard" },
  { icon: ShoppingBag, label: "Marketplace", path: "/dashbodard" },
  { icon: Wallet, label: "Mi Wallet", path: "/wallet" },
  { icon: FileText, label: "Transacciones", path: "/wallt" },
  { icon: User, label: "Perfil", path: "/waallet" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-card border-r border-border flex flex-col items-center py-8 z-50">
      <div className="mb-12">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center font-bold text-xl animate-glow">
          TC
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            activeClassName="text-primary bg-primary/20 glow-border"
          >
            <item.icon className="w-6 h-6" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
