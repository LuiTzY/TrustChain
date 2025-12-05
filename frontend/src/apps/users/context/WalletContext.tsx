import { connectWallet } from "@/apps/helpers/web3";
import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  console.log("INICIALIZAMOS EL CONTEXTO DEL WALLET")
  const [account, setAccount] = useState(null);

  const connect = async () => {
    console.log("INCIAMOS EL INTENTO DE CONEXION DESDE EL WALLET PROVIDER")
    const acc = await connectWallet();
    setAccount(acc);
  };

  // detectar cambios de cuenta
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0] || null);
    });
  }, []);

  return (
    <WalletContext.Provider value={{ account, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
