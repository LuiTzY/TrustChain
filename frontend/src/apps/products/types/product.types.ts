import type { User } from "../../users/types/user.types";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  user_seller: User
}

  

export interface Pays {
  id: number;
  tx_hash: string;
  buyer_address: string;
  seller_address: string;
  amout: number;
  status: string;
  confirmed_at?: Date
  product_info: Product 
  created_at: Date
}