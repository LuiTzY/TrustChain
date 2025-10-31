export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  wallet_address?: string;
  last_login?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  wallet_address?: string;
}
