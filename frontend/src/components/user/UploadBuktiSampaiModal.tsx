// components/user/UploadBuktiSampaiModal.tsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onSubmit: (data: { orderId: string; file: File; note: string }) => void;
};

const UploadBuktiSampaiModal = ({
  isOpen,
  onClose,
  orderId,
  onSubmit,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(f.type)) return;
    if (f.size > 5 * 1024 * 1024) return; // 5MB
    setFile(f);
  };

  const handleSubmit = () => {
    if (!file) return;
    onSubmit({ orderId, file, note });
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setNote("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
            bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-lg">Upload Bukti Sampai</h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* ID Pesanan */}
            <div className="mb-4">
              <label className="text-sm font-medium block mb-1.5">
                ID Pesanan
              </label>
              <input
                value={orderId}
                disabled
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 text-sm"
              />
            </div>

            {/* Upload Area */}
            <div className="mb-4">
              <label className="text-sm font-medium block mb-1.5">
                Foto Bukti Sampai <span className="text-red-500">*</span>
              </label>

              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
                className={`flex flex-col items-center justify-center gap-2 py-8 rounded-lg border-2 border-dashed cursor-pointer transition
                  ${isDragging ? "border-primary bg-purple-50" : "border-gray-300 hover:border-gray-400"}
                `}
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <>
                    <Upload className="text-gray-400" size={26} />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Klik untuk upload</span>{" "}
                      atau drag & drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, JPEG (Max 5MB)
                    </p>
                  </>
                )}

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <p className="text-xs text-orange-500 mt-2">
                💡 Upload foto produk yang sudah diterima pelanggan sebagai
                bukti pengiriman
              </p>
            </div>

            {/* Catatan */}
            <div className="mb-5">
              <label className="text-sm font-medium block mb-1.5">
                Catatan (Opsional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: Diterima oleh Ibu Siti, kondisi produk baik"
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleClose}
                className="bg-white text-gray-800 border border-gray-300 hover:text-white cursor-pointer"
              >
                Batal
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!file}
                className="bg-primary text-white px-6 cursor-pointer disabled:opacity-50"
              >
                Upload
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UploadBuktiSampaiModal;
