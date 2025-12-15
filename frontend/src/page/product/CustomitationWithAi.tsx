import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { product } from "@/data/product";
import type { products } from "@/types/data";

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

const CustomitationWithAi = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = product.find((item: products) => item.id === id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [aiEnabled, setAiEnabled] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3">
      {/* HEADER */}
      <div className="flex bg-white justify-between px-5 py-3 items-center shadow-sm ">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-300 hover:rounded-full p-2 cursor-pointer"
        >
          <ArrowLeft size={30} />
        </button>
        <Link
          to={"/cart"}
          className="hover:bg-[#9555b8]  hover:rounded-full p-3 cursor-pointer text-[#5F2C7A] hover:text-white"
        >
          <FaCartShopping size={25} />
        </Link>
      </div>

      {/* AI DESIGN */}
      <div className="flex m-5 flex-col bg-linear-to-r from-[#9B7AC3] to-[#C199CA] p-5 rounded-md text-white gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-3 items-center">
            <FaPen size={18} />
            <h6 className="text-sm font-inter font-bold">Desain dengan AI</h6>
          </div>
          <Switch
            checked={aiEnabled}
            onCheckedChange={(val) => setAiEnabled(val)}
          />
        </div>
        <p className="pl-4 text-sm md:text-base">
          Deskripsikan kue impian Anda dan AI akan <br />
          membuatkan desainya
        </p>
        <Input
          placeholder="Contoh: Kue ulang tahun unicorn dengan warna biru"
          className="bg-transparent placeholder:text-gray-300 placeholder:text-[13px]"
        />
        <Button className="bg-[#5F2C7A] text-gray-300 w-full md:w-1/2">
          Generate Desain
        </Button>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="flex m-5 bg-white overflow-hidden rounded-md p-5 justify-center items-center">
        <img
          src={data?.image}
          alt={data?.title}
          className="w-40 h-40 md:w-60 md:h-60 rounded-md object-contain"
        />
      </div>

      {/* SIZE SELECTION */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-bold text-lg">Pilih Ukuran</h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Size.map((size) => (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              whileTap={{ scale: 0.95 }}
              className={`text-sm py-2 px-3 rounded shadow-md transition-colors cursor-pointer ${
                selectedSize === size
                  ? "bg-[#5F2C7A] text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
            >
              {size} cm
            </motion.button>
          ))}
        </div>
      </div>

      {/* VARIANT SELECTION */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-bold text-lg">Pilih Varian Rasa</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {Variant.map((variant) => (
            <motion.button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              whileTap={{ scale: 0.95 }}
              className={`text-sm py-2 px-3 rounded shadow-md transition-colors cursor-pointer ${
                selectedVariant === variant
                  ? "bg-[#5F2C7A] text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
            >
              {variant}
            </motion.button>
          ))}
        </div>
      </div>

      {/* CUSTOM TEXT */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">Tambah Ucapan</h2>
          <Input placeholder="Happy Birthday ....!!" className="bg-white" />
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <h2 className="font-bold text-lg">Catatan</h2>
          <Input className="bg-white" />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row gap-2 justify-between p-5">
        <Button className="bg-white text-black border-2 border-gray-400 w-full md:w-1/2">
          Masukkan Keranjang
        </Button>
        <Button className="bg-[#5F2C7A] text-white w-full md:w-1/2">
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default CustomitationWithAi;
