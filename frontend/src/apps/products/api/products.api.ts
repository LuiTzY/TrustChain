import axios from "axios";
import type { Product } from "../types/product.types";

const API_URL = "http://localhost:8000/api/products/";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await axios.get(`${API_URL}${id}/`);
  return res.data;
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const res = await axios.put(`${API_URL}${id}/`, product);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`);
};
