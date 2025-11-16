import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products.api";
import ProductForm from "../components/ProductForm";

export default function ProductCreatePage() {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    await createProduct(data);
    navigate("/products");
  };

  return <ProductForm onSubmit={handleCreate} buttonLabel="Crear producto" />;
}

