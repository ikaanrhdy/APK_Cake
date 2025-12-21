import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuFolderPen } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { useProfileStore } from "@/app/store/useProfile";
import { Button } from "@/components/ui/button";

/* ================= TYPES ================= */

type EditField =
  | "name"
  | "gender"
  | "birthdate"
  | "phone"
  | "email"
  | "avatar"
  | null;

type FieldConfig = {
  label: string;
  type: "text" | "email" | "tel" | "date" | "select";
  options?: string[];
};

/* ================= CONFIG ================= */

const fieldConfig: Record<Exclude<EditField, null>, FieldConfig> = {
  name: { label: "Nama", type: "text" },
  gender: {
    label: "Jenis Kelamin",
    type: "select",
    options: ["Laki-laki", "Perempuan", "Lainnya"],
  },
  birthdate: { label: "Tanggal Lahir", type: "date" },
  phone: { label: "No. Handphone", type: "tel" },
  email: { label: "Email", type: "email" },
  avatar: { label: "Foto Profil", type: "text" },
};

/* ================= COMPONENT ================= */

const EditProfile = () => {
  const navigate = useNavigate();

  const { name, gender, birthdate, phone, email, avatar, updateField } =
    useProfileStore();

  const [activeField, setActiveField] = useState<EditField>(null);
  const [tempValue, setTempValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openEdit = (field: EditField) => {
    if (!field) return;
    setActiveField(field);
    setTempValue(useProfileStore.getState()[field]);
  };

  const handleSave = async () => {
    if (!activeField) return;

    setIsSaving(true);

    await new Promise((r) => setTimeout(r, 800)); // simulasi API

    updateField(activeField, tempValue);

    toast.success(`${fieldConfig[activeField].label} berhasil diperbarui`);

    setIsSaving(false);
    setActiveField(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 lg:flex lg:justify-center lg:pt-10">
      <div className="w-full max-w-4xl bg-white lg:rounded-2xl lg:shadow-lg p-5 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="border rounded-lg p-2 cursor-pointer"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-primary font-serif text-lg">Profile Saya</h2>
        </div>

        {/* AVATAR */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={avatar}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <button
            onClick={() => openEdit("avatar")}
            className="flex items-center gap-1 text-primary text-sm hover:opacity-80 transition hover:scale-75 cursor-pointer"
          >
            <LuFolderPen size={16} />
            Ubah Foto
          </button>
        </div>

        {/* INFO */}
        <div className="border rounded-md divide-y">
          {[
            ["Nama", name, "name"],
            ["Jenis Kelamin", gender, "gender"],
            ["Tanggal Lahir", birthdate, "birthdate"],
            ["No. Handphone", phone, "phone"],
            ["Email", email, "email"],
          ].map(([label, value, key]) => (
            <div
              key={key}
              onClick={() => openEdit(key as EditField)}
              className="flex justify-between items-center px-3 py-3 cursor-pointer"
            >
              <span className="text-sm text-gray-400">{label}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{value}</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeField && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              className="bg-white rounded-xl p-5 w-[90%] max-w-md"
            >
              <h3 className="mb-4 text-lg font-serif text-primary">
                Edit {fieldConfig[activeField].label}
              </h3>

              {activeField === "avatar" ? (
                <div className="space-y-3">
                  <img
                    src={tempValue || avatar}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setTempValue(URL.createObjectURL(file));
                    }}
                  />

                  <input
                    type="text"
                    placeholder="https://image.url"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              ) : fieldConfig[activeField].type === "select" ? (
                <select
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  {fieldConfig[activeField].options?.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={fieldConfig[activeField].type}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              )}

              <div className="flex justify-end gap-3 mt-6 ">
                <Button
                  onClick={() => setActiveField(null)}
                  className="text-sm text-gray-500 border bg-transparent border-gray-300 cursor-pointer hover:text-white hover:bg-red-700"
                >
                  Batal
                </Button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-md text-sm text-white cursor-pointer hover:scale-75 ${
                    isSaving ? "bg-primary/60 cursor-not-allowed" : "bg-primary"
                  }`}
                >
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfile;
