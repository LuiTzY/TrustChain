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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <img src={product.image} alt={product.name} className="w-full rounded mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-4">Precio: ${product.price}</p>
      <p className="text-sm text-gray-500">Stock disponible: {product.stock}</p>
      <Link
        to="/products"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 inline-block"
      >
        Volver al listado
      </Link>
    </div>
  );
}
