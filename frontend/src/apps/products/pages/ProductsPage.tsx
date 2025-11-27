import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/products.api";
import type { Product } from "../types/product.types";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar productos desde API o Mock
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================================
  // 🔍 FILTRAR PRODUCTOS (nombre + descripción)
  // =====================================================
  const filteredProducts = products.filter((p) =>
    (p.name + " " + p.description).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Cargando productos...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Gestión de Productos
            </h1>
            <p className="text-slate-400">
              {filteredProducts.length} productos disponibles
            </p>
          </div>
          <Link
            to="/products/create"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40 hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo producto
          </Link>
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 max-w-md mx-auto">
              <svg
                className="w-20 h-20 text-slate-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron productos
              </h3>
              <p className="text-slate-400">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
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
    </div>
  );
}
