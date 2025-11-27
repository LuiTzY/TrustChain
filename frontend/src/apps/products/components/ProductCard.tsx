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
    <div className="group relative z-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 p-5">

  {/* 🔹 Controles CRUD arriba a la derecha */}
  {role === "seller" && (
    <div className="absolute z-20 top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link
        to={`/products/edit/${id}`}
        className="p-2.5 bg-slate-900/80 backdrop-blur-sm rounded-full hover:bg-amber-500 transition-all duration-200 border border-slate-700/50 text-white"
        title="Editar producto"
      >
        <Edit size={16} />
      </Link>
      <button
        onClick={() => onDelete?.(id)}
        className="p-2.5 bg-slate-900/80 backdrop-blur-sm rounded-full hover:bg-red-600 transition-all duration-200 border border-slate-700/50 text-white"
        title="Eliminar producto"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )}

  {/* 🔸 Imagen */}
  <img
    src={image || "https://via.placeholder.com/200x200?text=Producto"}
    alt={name}
    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-500 relative z-0"
  />

  {/* 🔸 Información */}
  <div className="flex gap-2 items-start mb-4">
    <div className="w-1/2">
      <h3 className="text-white text-base font-semibold leading-tight mb-2 group-hover:text-blue-400 transition-colors">
        {name}
      </h3>
      <p className="text-slate-300 text-lg font-bold">
        ${price.toFixed(2)}
      </p>
    </div>

    <Link
      to={`/products/${id}`}
      className="text-sm text-blue-400 hover:text-blue-300 underline w-1/2 text-right transition-colors"
    >
      Ver más
    </Link>
  </div>

  {/* 🔹 Botones de compra */}
  <div className="flex flex-col w-full gap-2">
    <button
      onClick={() => onBuy?.(id)}
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 text-xs rounded-xl font-['Orbitron'] hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 uppercase tracking-wide"
    >
      COMPRAR CON CRIPTO
    </button>

    <button
      onClick={() => onAddToCart?.(id)}
      className="bg-slate-800/50 border border-slate-700 text-slate-300 px-8 py-3 text-xs rounded-xl font-['Orbitron'] hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 uppercase tracking-wide"
    >
      AGREGAR AL CARRITO
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
