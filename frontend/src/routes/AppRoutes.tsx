import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/apps/users/pages/LoginPage";
import RegisterPage from "@/apps/users/pages/RegisterPage";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/apps/products/pages/ProductDetail";
import { Wallet } from "lucide-react";
import { useAuth } from "@/apps/users/context/AuthContext";


const queryClient = new QueryClient();

const App = () =>  {
  //Usamos el Authprovider para proteger las rutas
  const {isAuthenticated} =  useAuth();

  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Routes>
          <Route path="/" element={<Login/> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />          

           {/* <Route
            path="/dashboard"
            element={<Dashboard /> }
          />     */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
  </QueryClientProvider>
  )

};

export default App;
