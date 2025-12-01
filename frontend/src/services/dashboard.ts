import { apiClient } from "@/api/api";
import { APIGeneralResponse } from "@/api/types/response";
import axios from "axios";

const API_DASHBOARD_URL = "/api/marketplace/dashboard/"
interface DashboardInsigths {
    users:number;
    payments: number;
    products: number;
    sellers: number;

}
export const DashboardService = {
  getInsights: () => { 
    return apiClient<APIGeneralResponse<DashboardInsigths>>("GET", `${API_DASHBOARD_URL}insights`)
  },
  
};





