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

  