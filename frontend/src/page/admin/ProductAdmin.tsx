import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import type { products } from "@/types/data";
import { product } from "@/data/product";

const ProductAdmin = () => {
  const [products, setProducts] = useState<products[]>(product);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<products | null>(null);

  /* ================= FILTER ================= */
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= DELETE ================= */
  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <h1 className="text-lg font-semibold">Produk Kue</h1>

        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
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
          className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm"
        />
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3">Produk</th>
              <th>Ukuran</th>
              <th>Varian</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Note</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-10 h-10 rounded object-cover"
                  />
                  {item.title}
                </td>
                <td>{item.size}</td>
                <td>{item.variant}</td>
                <td>{item.stock}</td>
                <td>Rp {item.price.toLocaleString("id-ID")}</td>
                <td>{item.note}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setModalOpen(true);
                    }}
                    className="p-2 rounded hover:bg-muted"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded hover:bg-muted text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filteredProducts.map((item) => (
          <div key={item.id} className="border rounded-lg p-3 flex gap-3">
            <img src={item.image} className="w-16 h-16 rounded object-cover" />

            <div className="flex-1 space-y-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.variant} • {item.size}
              </p>
              <p className="text-xs">Stok: {item.stock}</p>
              <p className="text-sm font-semibold">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  setEditing(item);
                  setModalOpen(true);
                }}
                className="p-2 rounded hover:bg-muted"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded hover:bg-muted text-red-500"
              >
                <Trash2 className="w-4 h-4" />
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
                setProducts((prev) =>
                  prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p))
                );
              } else {
                setProducts((prev) => [...prev, { id: Date.now(), ...data }]);
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

/* ================= MODAL ================= */

const ProductModal = ({
  initialData,
  onClose,
  onSave,
}: {
  initialData: Product | null;
  onClose: () => void;
  onSave: (data: ProductForm) => void;
}) => {
  const [form, setForm] = useState<ProductForm>({
    name: initialData?.name ?? "",
    image: initialData?.image ?? "",
    size: initialData?.size ?? "",
    variant: initialData?.variant ?? "",
    stock: initialData?.stock ?? 0,
    price: initialData?.price ?? 0,
    note: initialData?.note ?? "",
  });

  const updateField = <K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="
          fixed z-50 inset-x-4 top-1/2 -translate-y-1/2
          max-w-lg mx-auto bg-card rounded-lg p-4 space-y-3
        "
      >
        <h2 className="font-semibold">
          {initialData ? "Edit Produk" : "Tambah Produk"}
        </h2>

        <input
          placeholder="Nama Kue"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="input"
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => updateField("image", e.target.value)}
          className="input"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="Ukuran"
            value={form.size}
            onChange={(e) => updateField("size", e.target.value)}
            className="input"
          />
          <input
            placeholder="Varian"
            value={form.variant}
            onChange={(e) => updateField("variant", e.target.value)}
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Stok"
            value={form.stock}
            onChange={(e) => updateField("stock", Number(e.target.value))}
            className="input"
          />
          <input
            type="number"
            placeholder="Harga"
            value={form.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            className="input"
          />
        </div>

        <textarea
          placeholder="Note"
          value={form.note}
          onChange={(e) => updateField("note", e.target.value)}
          className="input resize-none"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded hover:bg-muted"
          >
            Batal
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 text-sm rounded bg-primary text-primary-foreground"
          >
            Simpan
          </button>
        </div>
      </motion.div>
    </>
  );
};
