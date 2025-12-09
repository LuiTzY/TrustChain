import { BrowserProvider, Contract, ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}


// verificamos si metamask esta dispoinble
const checkMetaMask = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask no está instalado. Por favor instálalo para continuar.");
  }
};


//  verifica que estamos en la red correcta
export const checkNetwork = async (EXPECTED_CHAIN_ID) => {
  checkMetaMask();
  
  const chainHex = await window.ethereum.request({ method: "eth_chainId" });
  const currentChainId = parseInt(chainHex, 16);

  console.log("CHAIN ID", currentChainId)
  if (EXPECTED_CHAIN_ID && currentChainId !== EXPECTED_CHAIN_ID) {
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



// comprar producto en blockchain
export const buyProductOnChain = async (
  contract: Contract,
  productId: number | string,
  priceInEth: string
) => {


  try {


    const tx = await contract.buyItem(productId, {
      value: priceInEth,
    });

    console.log("Transaccion enviada:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaccion confirmada:", receipt);

    return {success: true, data: receipt};
  } catch (error) {

   console.error("Error al procesar compra:", error);

    const message =
      error?.info.error.message || //Devolvemos la razon del error
      "Ocurrió un error inesperado al realizar la compra.";
    console.log("Ocurrio esto", error)
    return {success: false, data: message};
  }
};

// escuchar cambios de cuenta
export const onAccountsChanged = (callback: (accounts: string[]) => void) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", callback);
  }
};

