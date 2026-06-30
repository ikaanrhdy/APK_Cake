import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditProfileForm {
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
}

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<EditProfileForm>({
    name: "Ika Nur Hidayati",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    address: "",
  });

  const handleChange = (key: keyof EditProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Save profile:", form);
    // TODO: panggil API update profile
    navigate("/profile");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-2 bg-white p-3 md:p-5 md:px-8 border-b sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-200 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-serif font-bold text-base md:text-xl">
          Edit Profil
        </h2>
      </div>

      {/* ================= CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-4 md:p-8 md:max-w-2xl md:mx-auto w-full"
      >
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* === HEADER CARD === */}
          <div className="bg-linear-to-r from-[#5F2C7A] to-[#825a97] px-5 py-6 flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <User size={32} className="text-[#5F2C7A]" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center border-2 border-white cursor-pointer hover:bg-gray-600 transition">
                <Camera size={12} className="text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ganti nama anda...."
                className="bg-white/20 placeholder:text-white/70 text-white text-sm font-medium rounded-lg px-3 py-2 outline-none focus:bg-white/30 transition w-full max-w-55"
              />
              <p className="text-xs text-white/80">Member since 24/2/2026</p>
            </div>
          </div>

          {/* === FORM === */}
          <div className="flex flex-col gap-4 p-5">
            <Field
              icon={<Mail size={16} />}
              label="Email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              placeholder="Cantumkan alamat email yang aktif"
            />

            <Field
              icon={<Phone size={16} />}
              label="Nomor Telepon"
              value={form.phone}
              onChange={(v) => handleChange("phone", v)}
              placeholder="Contoh : 089..."
            />

            <Field
              icon={<User size={16} />}
              label="Jenis Kelamin"
              value={form.gender}
              onChange={(v) => handleChange("gender", v)}
              placeholder="Wanita/Laki-laki"
            />

            <Field
              icon={<Calendar size={16} />}
              label="Tanggal Lahir"
              type="date"
              value={form.birthDate}
              onChange={(v) => handleChange("birthDate", v)}
              placeholder="mm / dd / yyyy"
            />

            {/* Alamat - textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={16} />
                Alamat
              </label>
              <textarea
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSave}
                className="bg-[#5F2C7A] hover:bg-[#4d2363] text-white px-8 cursor-pointer"
              >
                Simpan
              </Button>
              <Button
                onClick={() => navigate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 cursor-pointer"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ================= REUSABLE FIELD ================= */
const Field = ({
  icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-2 text-xs text-gray-500">
      {icon}
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  </div>
);

export default EditProfile;
