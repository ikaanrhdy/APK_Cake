import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useCakeCustomization } from "@/hooks/useCakeCustomization";
import PreviewCake from "@/components/user/Custom/PreviewCake";
import UkuranSelector from "@/components/user/Custom/UkuranSelector";
import LayerSelector from "@/components/user/Custom/LayerSelector";
import DropdownPilihan from "@/components/user/Custom/DropdownPilihan";
import ReferensiCake from "@/components/user/Custom/ReferensiCake";
import DekorasiSection from "@/components/user/Custom/DekorasiSection";
import UcapanCatatan from "@/components/user/Custom/UcapanCatatan";
import TotalSummary from "@/components/user/Custom/TotalSummary";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const CustomitationWithAi = () => {
  const navigate = useNavigate();
  const state = useCakeCustomization();

  const handleSubmit = (action: "cart" | "buy") => {
    if (!state.isValid) {
      toast.error(
        "Lengkapi semua pilihan kustomisasi (ukuran, layer, base cake, tipe & warna cream)",
      );
      return;
    }

    toast.success(
      action === "cart" ? "Ditambahkan ke keranjang" : "Lanjut ke pembelian",
    );
    if (action === "buy") navigate("/checkout");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3 bg-gray-50 min-h-screen"
    >
      {/* ================= HEADER ================= */}
      <motion.div
        variants={item}
        className="flex bg-white justify-between px-5 py-3 items-center shadow-sm sticky top-0 z-10"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100 rounded-full p-2 cursor-pointer"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h2 className="font-medium text-sm">Custom Cake</h2>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/cart"
            className="hover:bg-primary/10 rounded-full p-2 text-primary cursor-pointer"
          >
            <FaCartShopping size={20} />
          </Link>
        </motion.div>
      </motion.div>

      <div className="px-4 space-y-4 max-w-2xl mx-auto w-full pb-6">
        <motion.div variants={item}>
          <PreviewCake state={state} />
        </motion.div>
        <motion.div variants={item}>
          <UkuranSelector state={state} />
        </motion.div>
        <motion.div variants={item}>
          <LayerSelector state={state} />
        </motion.div>
        <motion.div variants={item}>
          <DropdownPilihan state={state} />
        </motion.div>
        <motion.div variants={item}>
          <ReferensiCake state={state} />
        </motion.div>
        <motion.div variants={item}>
          <DekorasiSection state={state} />
        </motion.div>
        <motion.div variants={item}>
          <UcapanCatatan state={state} />
        </motion.div>
        <motion.div variants={item}>
          <TotalSummary state={state} />
        </motion.div>
      </div>

      {/* ================= FOOTER ACTION ================= */}
      <motion.div
        variants={item}
        className="sticky bottom-0 bg-white border-t p-4 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto w-full"
      >
        <Button
          onClick={() => handleSubmit("cart")}
          className="w-full bg-white border text-black cursor-pointer hover:text-white"
        >
          Masukkan Keranjang
        </Button>
        <Button
          onClick={() => handleSubmit("buy")}
          className="w-full bg-primary text-white cursor-pointer"
        >
          Beli Sekarang
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CustomitationWithAi;
