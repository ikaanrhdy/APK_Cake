import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import type { productsAdmin } from "@/types/data";
import { useProductStore } from "@/app/store/admin/productStoreAdmin";
import { ProductModal } from "@/components/admin/ProductModal";

const ProductAdmin = () => {
  const products = useProductStore((state) => state.products);
  const search = useProductStore((state) => state.search);
  const setSearch = useProductStore((state) => state.setSearch);
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<productsAdmin | null>(null);

  // ================= FILTER =================
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <h1 className="text-lg sm:text-xl font-semibold">Produk Kue</h1>

        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama kue..."
          className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm sm:text-base"
        />
      </div>

      {/* ================= TABLE (DESKTOP & TABLET) ================= */}
      <div className="hidden sm:block overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm sm:text-[14px] md:text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Produk</th>
              <th className="p-3 text-left">Ukuran</th>
              <th className="p-3 text-left">Varian</th>
              <th className="p-3 text-left">Stok</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-12 h-12 sm:w-10 sm:h-10 rounded object-cover"
                  />
                  <span className="font-medium text-sm sm:text-[13px] md:text-sm">
                    {item.title}
                  </span>
                </td>
                <td className="p-3 text-sm sm:text-[12px] md:text-sm">
                  {item.size.join(", ")}
                </td>
                <td className="p-3 text-sm sm:text-[12px] md:text-sm">
                  {item.variant.join(", ")}
                </td>
                <td className="p-3 text-sm sm:text-[12px] md:text-sm">
                  {item.stock}
                </td>
                <td className="p-3 font-semibold text-sm sm:text-[12px] md:text-sm">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>
                <td className="p-3 text-sm sm:text-[12px] md:text-sm">
                  {item.note}
                </td>
                <td className="p-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-900"
          >
            {/* Gambar */}
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 sm:w-14 sm:h-14 rounded-lg object-cover shrink-0"
            />

            {/* Info Produk */}
            <div className="flex-1 flex flex-col gap-0.5">
              <p className="font-semibold text-sm sm:text-[13px]">
                {item.title}
              </p>
              <p className="text-xs sm:text-[11px] text-muted-foreground">
                Varian: {item.variant.join(", ")}
              </p>
              <p className="text-xs sm:text-[11px] text-muted-foreground">
                Ukuran: {item.size.join(", ")}
              </p>
              <p className="text-xs sm:text-[11px]">Stok: {item.stock}</p>
              <p className="text-sm sm:text-[13px] font-semibold">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setEditing(item);
                  setModalOpen(true);
                }}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => deleteProduct(item.id)}
                className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-700 transition"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {modalOpen && (
          <ProductModal
            initialData={editing}
            onClose={() => setModalOpen(false)}
            onSave={(data) => {
              if (editing) {
                updateProduct(editing.id, data);
              } else {
                addProduct({
                  id: Date.now().toString(),
                  ...data,
                  rating: 0, // default value
                  reviews: 0, // default value
                });
              }
              setModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductAdmin;
