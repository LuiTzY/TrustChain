import { apiClient } from "@/api/api"
import { BlockchainInfo } from "@/api/types/blockchain";
import { APIGeneralResponse } from "@/api/types/response";


const BLOCKCHAIN_API_URL = "/api/marketplace/blockchain/";
export const blockchain_service = {
    getBlockchainInfo: ()=>{
        return apiClient<APIGeneralResponse<BlockchainInfo>>("GET",`${BLOCKCHAIN_API_URL}blockchain-info/`)
    }
}

export async function getEthRates() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,dop"
  );
  const data = await res.json();

  return {
    priceUSD: data.ethereum.usd,
    priceDOP: data.ethereum.dop
  };
}
