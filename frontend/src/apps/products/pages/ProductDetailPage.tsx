import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api/products.api";
import type { Product } from "../types/product.types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) getProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
  <div className="max-w-2xl w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
    <img 
      src={product.image} 
      alt={product.name} 
      className="w-full h-80 object-cover" 
    />
    <div className="p-8 space-y-4">
      <h2 className="text-3xl font-bold text-white tracking-tight">
        {product.name}
      </h2>
      <p className="text-slate-300 text-base leading-relaxed">
        {product.description}
      </p>
      <div className="flex items-center justify-between pt-4 pb-2">
        <div>
          <p className="text-sm text-slate-400 mb-1">Precio</p>
          <p className="text-3xl font-bold text-white">
            ${product.price}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400 mb-1">Stock disponible</p>
          <p className="text-2xl font-semibold text-slate-300">
            {product.stock}
          </p>
        </div>
      </div>
      <Link
        to="/products"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 inline-flex items-center justify-center gap-2 mt-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al listado
      </Link>
    </div>
  </div>
</div>
  );
}
