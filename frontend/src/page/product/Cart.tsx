import { Checkbox } from "@/components/ui/checkbox";
import { product } from "@/data/product";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Cart = () => {
  const data = product;
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const increase = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 1) + 1,
    }));
  };

  const decrease = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) - 1),
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-row bg-white p-3 md:px-6 items-center justify-between border-b"
      >
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
          >
            <ArrowLeft />
          </button>

          <div className="flex items-center gap-1">
            <h2 className="font-medium text-sm md:text-base">Keranjang Saya</h2>
            <span className="text-xs text-gray-500">(02)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Ubah</span>
          <IoMdHelpCircleOutline size={20} className="text-[#5F2C7A]" />
        </div>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-auto">
        <div
          className=" mx-4 my-5 md:mx-10 lg:max-w-4xl lg:mx-auto bg-white rounded-md border p-4 md:p-6
        "
        >
          <div className="flex flex-col gap-6">
            {data.slice(0, 2).map((item) => {
              const discount = item.price - item.price / 20;
              const qty = quantities[item.id] ?? 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className=" flex gap-4 md:gap-6 lg:gap-8"
                >
                  {/* Checkbox */}
                  <div className="flex items-center">
                    <Checkbox />
                  </div>

                  {/* Image */}
                  <div className=" flex items-center justify-center border rounded-md p-1 w-16 h-16 md:w-20 md:h-20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-medium text-sm md:text-base">
                      {item.title}
                    </h3>

                    <div className="w-fit text-[8px] md:text-[10px] px-3 py-0.5 bg-gray-100 border rounded">
                      Putih & marum, 25 cm
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[9px] md:text-sm text-red-500">
                        Rp {discount}
                      </span>
                      <span className="text-[9px] md:text-sm text-gray-500">
                        Rp {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-end md:items-center">
                    <div className="flex items-center border rounded-md overflow-hidden text-xs md:text-sm">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="px-2 md:px-3 py-1 hover:bg-gray-100"
                        onClick={() => decrease(item.id)}
                      >
                        −
                      </motion.button>

                      <div className="px-3 min-w-6 text-center font-medium">
                        {qty}
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="px-2 md:px-3 py-1 hover:bg-gray-100"
                        onClick={() => increase(item.id)}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=" sticky bottom-0 z-10 bg-white border-t px-4 md:px-10 py-3 flex justify-between 
        items-center shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      >
        <div className="flex items-center gap-3">
          <Checkbox />
          <span className="text-sm font-medium">Semua</span>
        </div>

        <div className="text-right">
          <p className="text-[10px] md:text-sm">
            Total <span className="text-red-500 font-semibold">Rp 285</span>
          </p>
          <p className="text-[9px] md:text-xs text-gray-500">Hemat Rp 20</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className=" bg-[#5F2C7A] text-white px-4 py-2 rounded-md text-sm"
        >
          Checkout (0)
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Cart;
