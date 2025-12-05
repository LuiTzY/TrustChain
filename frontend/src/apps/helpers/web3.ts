import { BrowserProvider, Contract, ethers } from "ethers";
import MarketplaceArtifact from "@/../../hardart/artifacts/contracts/Marketplace.sol/Marketplace.json";

const ABI = MarketplaceArtifact.abi;
console.log(`Este es el ABI`, ABI)
declare global {
  interface Window {
    ethereum?: any;
  }
}
//variables de entorno, ajustar a las del archivo (Ver luego ajuste desde docker)
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const EXPECTED_CHAIN_ID = import.meta.env.VITE_CHAIN_ID;

// verificamos si metamask esta dispoinble
const checkMetaMask = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask no está instalado. Por favor instálalo para continuar.");
  }
};

//metodo para conectarnos a la wallet
export const connectWallet = async (): Promise<string> => {
  console.log("INICIAMOS LA CONEXION A METAMASK")
  checkMetaMask();
  
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
    // Verificar la red
    await checkNetwork();
    
    return accounts[0];
  } catch (error) {
    console.error("Error al conectar wallet:", error);
    throw error;
  }
};

//  verifica que estamos en la red correcta
export const checkNetwork = async () => {
  checkMetaMask();
  
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  
  if (EXPECTED_CHAIN_ID && chainId !== EXPECTED_CHAIN_ID) {
    throw new Error(
      `Red incorrecta. Por favor cambia a la red con Chain ID: ${EXPECTED_CHAIN_ID}`
    );
  }
};

// obtener provider, en este caso metamask
export const getProvider = (): BrowserProvider => {
  checkMetaMask();
  return new BrowserProvider(window.ethereum);
};

// obtener signer
export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

// obtener contrato del marketplace
export const getMarketplaceContract = async (): Promise<Contract> => {
  if (!CONTRACT_ADDRESS) {
    throw new Error("CONTRACT_ADDRESS no está definido en las variables de entorno");
  }
  
  const signer = await getSigner();
  return new Contract(CONTRACT_ADDRESS, ABI, signer);
};

// comprar producto en blockchain
export const buyProductOnChain = async (
  productId: number | string,
  priceInEth: string
) => {
  try {
    const contract = await getMarketplaceContract();

    const tx = await contract.buyProduct(productId, {
      value: ethers.parseEther(priceInEth),
    });

    console.log("Transaccion enviada:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaccion confirmada:", receipt);

    return receipt;
  } catch (error) {
    console.error("Error al comprar producto:", error);
    throw error;
  }
};

// obtener producto
export const getProductOnChain = async (id: number | string) => {
  try {
    const contract = await getMarketplaceContract();
    return await contract.getProduct(id);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

// escuchar cambios de cuenta
export const onAccountsChanged = (callback: (accounts: string[]) => void) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", callback);
  }
};

