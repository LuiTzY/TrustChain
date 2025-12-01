import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/marketplace";

export const buyProductWithCrypto = async (productId: number) => {
  const response = await axios.post(`${API_URL}/buy/${productId}/`);
  return response.data; 
};

