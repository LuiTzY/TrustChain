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
      console.log("Productos cargados:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Producto eliminado correctamente ");
      fetchProducts(); // recarga la lista
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("No se pudo eliminar el producto ");
    }
  };

  // 🔹 Acciones de botones
  const handleBuy = (id: number) => {
    alert(`🛒 Comprar producto con ID ${id}`);
  };

  const handleAddToCart = (id: number) => {
    alert(`💾 Producto ${id} guardado en carrito`);
  };

  // 🔹 Ejecutar al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Cargando productos...</p>;
  }

  return (
    <div className="p-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestión de Productos</h1>
        <Link
          to="/products/create"
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Grid de productos */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No hay productos registrados aún.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              role="seller"
              onDelete={handleDelete}
              onBuy={handleBuy}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
