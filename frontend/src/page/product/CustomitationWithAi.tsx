import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { product } from "@/data/product";

// Icons & UI
import { ArrowLeft } from "lucide-react";
import { FaPen } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";

const Size = ["12", "18", "20", "24", "30", "35", "40", "45", "50", "55"];
const Variant = [
  "Coklat",
  "Vanilla",
  "Red Velvet",
  "Strawberry",
  "2 Mix",
  "3 Mix",
  "Tiramisu",
  "Blueberry",
  "Almond",
  "Black Forest",
  "Pandan",
  "Raspberry",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const CustomitationWithAi = () => {
  const navigate = useNavigate();
  const data = product[0];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [aiEnabled, setAiEnabled] = useState(false);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3"
    >
      {/* HEADER */}
      <motion.div
        variants={item}
        className="flex bg-white justify-between px-5 py-3 items-center shadow-sm"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="hover:bg-gray-300 rounded-full p-2 cursor-pointer  "
        >
          <ArrowLeft size={28} />
        </motion.button>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/cart"
            className="hover:bg-[#9555b8] rounded-full p-3 text-primary hover:text-white cursor-pointer"
          >
            <FaCartShopping size={24} />
          </Link>
        </motion.div>
      </motion.div>

      {/* AI DESIGN */}
      <motion.div
        variants={item}
        className="flex m-5 flex-col bg-linear-to-r from-[#9B7AC3] to-[#C199CA] p-5 rounded-md text-white gap-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <FaPen size={18} />
            <h6 className="text-sm font-bold">Desain dengan AI</h6>
          </div>
          <Switch
            checked={aiEnabled}
            onCheckedChange={setAiEnabled}
            className="cursor-pointer"
          />
        </div>

        {aiEnabled && (
          <>
            <p className="pl-4 text-sm">
              Deskripsikan kue impian Anda dan AI akan
              <br /> membuatkan desainnya
            </p>

            <Input
              placeholder="Contoh: Kue ulang tahun unicorn biru"
              className="bg-transparent placeholder:text-gray-300"
            />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-primary text-gray-200 w-full md:w-1/2">
                Generate Desain
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* PRODUCT IMAGE */}
      <motion.div
        variants={item}
        whileHover={{ scale: 1.05 }}
        className="flex m-5 bg-white rounded-md p-5 justify-center"
      >
        <img
          src={data?.image}
          alt={data?.title}
          className="w-40 h-40 md:w-60 md:h-60 object-contain"
        />
      </motion.div>

      {/* SIZE */}
      <motion.div variants={item} className="p-5 space-y-2">
        <h3 className="font-bold text-lg">Pilih Ukuran</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Size.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(size)}
              className={`py-2 rounded text-sm ${
                selectedSize === size
                  ? "bg-primary text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {size} cm
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* VARIANT */}
      <motion.div variants={item} className="p-5 space-y-2">
        <h3 className="font-bold text-lg">Pilih Varian Rasa</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Variant.map((variant) => (
            <motion.button
              key={variant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedVariant(variant)}
              className={`py-2 rounded text-sm ${
                selectedVariant === variant
                  ? "bg-primary text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {variant}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* TEXT */}

      <motion.div variants={item} className="p-5 space-y-3">
        <h3 className="font-bold text-lg">Tambah Ucapan</h3>
        <div className="flex p-2">
          <Input placeholder="Happy Birthday 🎉" className="border bg-white" />
        </div>
        <h3 className="font-bold text-lg">Catatan</h3>
        <div className="flex p-2">
          <Input placeholder="Catatan tambahan" className="border bg-white" />
        </div>
      </motion.div>

      {/* ACTION */}
      <motion.div
        variants={item}
        className="p-5 flex flex-col md:flex-row gap-3"
      >
        <motion.div whileTap={{ scale: 0.95 }} className="w-full">
          <Button className="w-full bg-white border text-black cursor-pointer hover:text-white ">
            Masukkan Keranjang
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.95 }} className="w-full">
          <Button className="w-full bg-primary text-white cursor-pointer">
            Beli Sekarang
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CustomitationWithAi;
