import { ChevronLeft, CircleUser, ChevronRight } from "lucide-react";
import { LuFolderPen } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= TYPES ================= */

type EditField = "name" | "gender" | "birth" | "phone" | "email" | null;

type TextFieldConfig = {
  label: string;
  type: "text" | "email" | "tel" | "date";
  placeholder?: string;
};

type SelectFieldConfig = {
  label: string;
  type: "select";
  options: string[];
};

type FieldConfig = TextFieldConfig | SelectFieldConfig;

/* ================= CONFIG ================= */

const fieldConfig: Record<Exclude<EditField, null>, FieldConfig> = {
  name: {
    label: "Nama",
    type: "text",
    placeholder: "Masukkan nama",
  },
  gender: {
    label: "Jenis Kelamin",
    type: "select",
    options: ["Laki-laki", "Perempuan", "Lainnya"],
  },
  birth: {
    label: "Tanggal Lahir",
    type: "date",
  },
  phone: {
    label: "No. Handphone",
    type: "tel",
    placeholder: "08xxxxxxxxxx",
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "example@email.com",
  },
};

/* ================= MOTION ================= */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

/* ================= COMPONENT ================= */

const EditProfile = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState<EditField>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        min-h-screen bg-gray-100
        lg:flex lg:justify-center lg:pt-10
      "
    >
      {/* ===== DESKTOP CARD WRAPPER ===== */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="
          flex flex-col space-y-4
          md:max-w-3xl md:mx-auto
          lg:w-full lg:max-w-4xl
          lg:bg-white lg:rounded-2xl lg:shadow-lg
          lg:p-6
        "
      >
        {/* ===== HEADER ===== */}
        <motion.div
          variants={item}
          className="flex flex-col bg-white w-full p-5 space-y-8 lg:bg-transparent lg:p-0"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-white border rounded-lg border-gray-300 p-2 cursor-pointer"
            >
              <ChevronLeft />
            </button>
            <h2 className="text-primary font-serif text-lg">Profile Saya</h2>
          </div>

          <div className="flex flex-col items-center">
            <CircleUser className="w-20 h-20 text-primary" />
            <div className="flex items-center space-x-2 mt-2">
              <LuFolderPen className="w-4 h-4 text-primary" />
              <h4 className="text-primary text-sm">Ubah</h4>
            </div>
          </div>
        </motion.div>

        {/* ===== BASIC INFO ===== */}
        <motion.div
          variants={item}
          className="flex flex-col m-5 bg-white rounded-md border border-gray-300 lg:m-0"
        >
          <div className="flex flex-col px-3 py-2">
            {[
              ["Nama", "Ika Nur Hidayati", "name"],
              ["Jenis Kelamin", "Lainnya", "gender"],
              ["Tanggal Lahir", "**/**/2004", "birth"],
            ].map(([label, value, key]) => (
              <div
                key={key}
                onClick={() => setActiveField(key as EditField)}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-400 text-sm font-serif">{label}</h4>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-xs font-serif">
                      {value}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
                <div className="border-b border-border my-3" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== CONTACT INFO ===== */}
        <motion.div
          variants={item}
          className="flex flex-col m-5 bg-white rounded-md border border-gray-300 lg:m-0"
        >
          <div className="flex flex-col px-3 py-2">
            {[
              ["No. Handphone", "08******84", "phone"],
              ["Email", "i**********@gmail.com", "email"],
            ].map(([label, value, key]) => (
              <div
                key={key}
                onClick={() => setActiveField(key as EditField)}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-400 text-sm font-serif">{label}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs font-serif">
                      {value}
                    </span>
                    {key === "email" && (
                      <span className="text-[#F34E4E]/60 text-xs">
                        Verifikasi
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
                <div className="border-b border-border my-3" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ===== EDIT DIALOG ===== */}
      <AnimatePresence>
        {activeField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="bg-white rounded-xl p-5 w-[90%] md:max-w-md"
            >
              <h3 className="text-lg font-serif text-[#5F2C7A] mb-4">
                Edit {fieldConfig[activeField].label}
              </h3>

              {fieldConfig[activeField].type === "select" ? (
                <select className="w-full border rounded-md p-2">
                  {fieldConfig[activeField].options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={fieldConfig[activeField].type}
                  placeholder={fieldConfig[activeField].placeholder}
                  className="w-full border rounded-md p-2"
                />
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setActiveField(null)}
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  Batal
                </button>
                <button className="px-4 py-2 bg-primary text-white text-sm rounded-md cursor-pointer">
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditProfile;
