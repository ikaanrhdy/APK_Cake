import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import type { productsAdmin } from "@/types/data";
import { X } from "lucide-react";

interface ProductModalProps {
  initialData: productsAdmin | null;
  onClose: () => void;
  onSave: (
    data: Omit<productsAdmin, "id" | "rating" | "reviews">,
    id?: string
  ) => void;
}

export const ProductModal = ({
  initialData,
  onClose,
  onSave,
}: ProductModalProps) => {
  const [form, setForm] = useState<
    Omit<productsAdmin, "id" | "rating" | "reviews">
  >({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    image: initialData?.image ?? "",
    price: initialData?.price ?? 0,
    category: initialData?.category ?? "",
    size: initialData?.size ?? [],
    variant: initialData?.variant ?? [],
    stock: initialData?.stock ?? 0,
    note: initialData?.note ?? "",
  });

  const [imageType, setImageType] = useState<"url" | "file">("url");

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateField("image", reader.result); // tetap pakai base64 untuk FE
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-2 md:px-4"
      >
        <div
          className="
            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
            rounded-xl shadow-xl
            w-full sm:w-11/12 md:w-4/5 lg:w-3/5
            max-h-[90vh] overflow-y-auto
            p-4 sm:p-6 md:p-8
            flex flex-col gap-4
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
              {initialData ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-sm md:text-base lg:text-base">
            {/* Judul */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Judul Produk
              </label>
              <input
                placeholder="Judul Produk"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Harga */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Harga
              </label>
              <input
                type="number"
                placeholder="Harga"
                value={form.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Kategori */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Kategori
              </label>
              <input
                placeholder="Kategori"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col md:col-span-3">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Deskripsi Produk
              </label>
              <textarea
                placeholder="Deskripsi Produk"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
              />
            </div>

            {/* Ukuran */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Ukuran (pisahkan koma)
              </label>
              <input
                placeholder="Ukuran"
                value={form.size.join(", ")}
                onChange={(e) =>
                  updateField(
                    "size",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Varian */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Varian
              </label>
              <input
                placeholder="Varian"
                value={form.variant.join(", ")}
                onChange={(e) =>
                  updateField(
                    "variant",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Stok */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Stok
              </label>
              <input
                type="number"
                placeholder="Stok"
                value={form.stock}
                onChange={(e) => updateField("stock", Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Gambar Produk
              </label>
              <div className="flex gap-2">
                <select
                  value={imageType}
                  onChange={(e) =>
                    setImageType(e.target.value as "url" | "file")
                  }
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                  <option value="url">URL</option>
                  <option value="file">File</option>
                </select>
              </div>
              {imageType === "url" ? (
                <input
                  placeholder="URL Gambar"
                  value={form.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary mt-2 transition"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary mt-2 transition"
                />
              )}
            </div>

            {/* Note */}
            <div className="flex flex-col md:col-span-3">
              <label className="mb-1 font-medium text-xs sm:text-sm md:text-base lg:text-base">
                Note
              </label>
              <textarea
                placeholder="Note"
                value={form.note}
                onChange={(e) => updateField("note", e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={() => {
                if (form.variant.length < 3) {
                  alert("Minimal ada 3 varian");
                  return;
                }
                onSave(form, initialData?.id);
              }}
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
