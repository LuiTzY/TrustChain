import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "../types/product.types";

interface ProductCardProps extends Product {
  role?: "seller" | "buyer"; // 👈 Determina si se muestran los iconos CRUD
  onDelete?: (id: number) => void;
  onBuy?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  role = "buyer",
  onDelete,
  onBuy,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* 🔹 Controles de CRUD arriba a la derecha */}
      {role === "seller" && (
        <div className="absolute top-3 right-3 flex gap-2">
          <Link
            to={`/products/edit/${id}`}
            className="bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500 transition"
            title="Editar producto"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={() => onDelete?.(id)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            title="Eliminar producto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* 🔸 Imagen del producto */}
      <img
        src={image || "https://via.placeholder.com/200x200?text=Producto"}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      {/* 🔸 Información */}
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
      <p className="text-blue-600 font-bold mb-4">${price.toFixed(2)}</p>

      {/* 🔹 Botones de acción para comprador */}
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart?.(id)}
          className="bg-gray-800 text-white px-3 py-2 text-sm rounded hover:bg-gray-900 transition"
        >
          Guardar
        </button>
        <button
          onClick={() => onBuy?.(id)}
          className="bg-blue-600 text-white px-3 py-2 text-sm rounded hover:bg-blue-700 transition"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}



// export default function ProductCard({
//   id,
//   name,
//   description,
//   price,
//   image,
//   onSave,
//   onBuy,
// }: ProductCardProps) {
//   return (
//     <div className="border rounded-4xl shadow-md p-4 flex flex-col items-left bg-white hover:shadow-lg transition">
//       {image && (
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-40 object-cover rounded-lg mb-3"
//         />
//       )}
//       <div className="flex flex-col gap-1">
//         <h3 className="self-stretch h-[16.89px] justify-start text-black text-xs font-normal font-['Orbitron'] leading-[13.40px]">
//           {name}
//         </h3>
//         <p className="text-gray-500 text-xs font-['Orbitron'] text-left mb-3">
//           ${price.toFixed(2)}
//         </p>
//       </div>
//       <div className="flex flex-col w-[100%] gap-2">
//         <button
//           onClick={() => onBuy?.(id)}
//           className="bg-[#2f45c6] text-white px-8 py-3 text-[0.7rem] rounded-full font-['Orbitron'] hover:bg-[#2334a8] transition-all duration-200"
//         >
//           COMPRAR CON CRIPTO
//         </button>
//         <button
//           onClick={() => onSave?.(id)}
//           className="outline-1 outline-black text-black px-8 py-3 text-[0.7rem] rounded-full font-['Orbitron'] hover:bg-[#ECECEC] hover:text-black transition-all duration-200"
//         >
//           AGREGAR AL CARRITO
//         </button>
//       </div>
//     </div>
//   );
// }
