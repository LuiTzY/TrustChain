import { useState } from "react";
import type { Product } from "../types/product.types";


interface Props {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, "id">) => void;
  buttonLabel: string;
}

export default function ProductForm({ initialData = {}, onSubmit, buttonLabel }: Props) {
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || 0,
    stock: initialData.stock || 0,
    image_url: initialData.image_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" || name === "stock" ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {buttonLabel}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-5">
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Nombre del producto
            </label>
            <input
              name="name"
              placeholder="Ej: Abstract Cube NFT"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600"
              required
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Descripción
            </label>
            <textarea
              name="description"
              placeholder="Describe tu producto..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                Stock disponible
              </label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                value={form.stock}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              URL de la imagen
            </label>
            <input
              name="image"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={form.image_url}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600"
            />
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/60 hover:-translate-y-0.5 active:translate-y-0"
          >
            {buttonLabel}
          </button>
          
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="w-full bg-slate-800/50 text-slate-300 font-semibold py-4 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-700 hover:border-slate-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}