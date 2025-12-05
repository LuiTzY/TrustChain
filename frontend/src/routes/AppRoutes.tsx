import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/apps/users/pages/LoginPage";
import RegisterPage from "@/apps/users/pages/RegisterPage";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/apps/products/pages/ProductDetail";
import { User, Wallet } from "lucide-react";
import { useAuth } from "@/apps/users/context/AuthContext";
import Profile from "@/apps/users/pages/ProfilePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Transaction } from "ethers";
import Transactions from "@/apps/payments/pages/Transaction";
import UserWallet from "@/apps/users/pages/Wallet";
import WalletU from "@/pages/Wallet";
import { WalletProvider } from "@/apps/users/context/WalletContext";


const queryClient = new QueryClient();

const App = () =>  {
  //Usamos el Authprovider para proteger las rutas
  const {isAuthenticated} =  useAuth();

  return(
  <WalletProvider>

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Routes>
          <Route path="/" element={<LoginPage/> } />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage />} />
           <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
           <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />          

           {/* <Route
            path="/dashboard"
            element={<Dashboard /> }
          />     */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wallet" element={<WalletU />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
  </QueryClientProvider>
  </WalletProvider>

  )

};

export default App;
