import { apiClient } from "@/api/api";
import { APIGeneralResponse } from "@/api/types/response";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const USER_API_URL_BALANCE = "/api/users/balance/"
const USER_API_TOKEN_URL = "/api/auth/token/"


export const UserService = {
  getUserBalance: () => {
    console.log("Estaremos solicitando la llamada del balance del wallet")
    return apiClient<APIGeneralResponse<number>>("GET", USER_API_URL_BALANCE)
  },
  validateToken:(token)=>{
    return apiClient<APIGeneralResponse<string>>("POST",`${USER_API_TOKEN_URL}verify/`,{"token":token})
  },
  setSession:()=>{

  },
  logout: ()=>{
      //Borramos la sesion
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
  }
};





