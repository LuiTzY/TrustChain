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
    image: initialData.image || "",
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <input
        name="name"
        placeholder="Nombre del producto"
        value={form.name}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock disponible"
        value={form.stock}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        name="image"
        placeholder="URL de la imagen"
        value={form.image}
        onChange={handleChange}
        className="border rounded p-2"
      />
      <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {buttonLabel}
      </button>
    </form>
  );
}
