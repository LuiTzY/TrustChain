import { apiClient } from "@/api/api"
import { BlockchainInfo } from "@/api/types/blockchain";
import { APIGeneralResponse } from "@/api/types/response";


const BLOCKCHAIN_API_URL = "/api/marketplace/blockchain/";
export const blockchain_service = {
    getBlockchainInfo: ()=>{
        return apiClient<APIGeneralResponse<BlockchainInfo>>("GET",`${BLOCKCHAIN_API_URL}blockchain-info/`)
    }
}