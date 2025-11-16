import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/products.api";
import type { Product } from "../types/product.types";
import ProductForm from "../components/ProductForm";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) getProductById(Number(id)).then(setProduct);
  }, [id]);

  const handleUpdate = async (data: any) => {
    if (id) {
      await updateProduct(Number(id), data);
      navigate("/products");
    }
  };

  if (!product) return <p className="text-center mt-10">Cargando producto...</p>;

  return (
    <ProductForm
      initialData={product}
      onSubmit={handleUpdate}
      buttonLabel="Actualizar producto"
    />
  );
}
