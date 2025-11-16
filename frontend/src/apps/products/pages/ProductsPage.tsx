import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/products.api";
import type { Product } from "../types/product.types";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar este producto?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gestión de Productos</h1>
        <Link
          to="/products/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nuevo producto
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} role="seller" onDelete={() => handleDelete(p.id)} />
        ))}
      </div>
    </div>
  );
}
