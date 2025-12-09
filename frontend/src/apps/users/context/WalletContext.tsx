import { checkNetwork, getProvider } from "@/apps/helpers/web3";
import { blockchain_service } from "@/services/blockchain";
import { BrowserProvider, Contract } from "ethers";
import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  // console.log("INICIALIZAMOS EL CONTEXTO DEL WALLET")
  const [account, setAccount] = useState(null);
  const [config, setConfig] = useState(null);
  const [contract,setContract] =  useState(null);


  /* === Carga la configuracion de la blockchain obtenida por el API === */
  const loadBlockchainConfig = async () => {
    // console.log("Obteniendo configuración de la blockchain desde el backend...");

      const info = await blockchain_service.getBlockchainInfo();

    const cfg = {
      CONTRACT_ADDRESS: info.data.marketplace_address,
      EXPECTED_CHAIN_ID: info.data.chain_id,
      ABI: info.data.abi,
    };

    console.log("Config Blockchain:", cfg);
    setConfig(cfg);

    return cfg;
  };




  /* === Se encarga de gestionar la conexion del wallet, verificando la red y haciendo la solicitud al provider de las wallets === */
  const connect = async () => {
    try {

      console.log("Intentando conectar wallet...");

      //En caso de no tener la configuracion solicitada la cargamos
      let cfg = config;

      if (!cfg) {
        console.log("Config no cargada, cargándola...");
        cfg = await loadBlockchainConfig();   // <- retorna la config correcta
      }


      //Validamos si nos encontramos dentro de la misma red
      await checkNetwork(cfg.EXPECTED_CHAIN_ID);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

    } catch (e) {
      console.error("Error al conectar:", e);
      throw e;
    }
  };
  
  useEffect(() => {
      const setupContract = async () => {
        if (!config || !account) return;

        const provider = getProvider();
        const signer = await provider.getSigner();
        const c = new Contract(config.CONTRACT_ADDRESS, config.ABI, signer);

        console.log("Contrato instanciado:", c);
        setContract(c);
      };

      setupContract();
    }, [config, account]);

  // detectar cambios de cuenta
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0] || null);
    });
  }, []);

  return (
    <WalletContext.Provider value={{
       account, connect, contract, config
        }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
