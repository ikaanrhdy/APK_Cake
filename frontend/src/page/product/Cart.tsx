import { Checkbox } from "@/components/ui/checkbox";
import { product } from "@/data/product";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Cart = () => {
  const data = product.slice(0, 2);
  const navigate = useNavigate();

  // quantity per product
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  // selected product ids
  const [selected, setSelected] = useState<string[]>([]);

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

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // item terpilih
  const selectedItems = data.filter((item) => selected.includes(item.id));

  // total harga
  const totalPrice = selectedItems.reduce((total, item) => {
    const qty = quantities[item.id] ?? 1;
    const discountPrice = item.price - item.price / 20;
    return total + discountPrice * qty;
  }, 0);

  const totalQty = selectedItems.reduce(
    (sum, item) => sum + (quantities[item.id] ?? 1),
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex bg-white p-3 md:px-6 items-center justify-between border-b"
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
            <span className="text-xs text-gray-500">({data.length})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Ubah</span>
          <IoMdHelpCircleOutline className="text-primary size-6 md:size-8" />
        </div>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-auto">
        <div className="mx-4 my-5 md:mx-10 lg:max-w-4xl lg:mx-auto bg-white rounded-md border p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {data.map((item) => {
              const discount = item.price - item.price / 20;
              const qty = quantities[item.id] ?? 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex gap-4 md:gap-6"
                >
                  {/* Checkbox */}
                  <div className="flex items-center">
                    <Checkbox
                      checked={selected.includes(item.id)}
                      onCheckedChange={() => toggleSelect(item.id)}
                    />
                  </div>

                  {/* Image */}
                  <div className="flex items-center justify-center border rounded-md p-1 w-16 h-16 md:w-20 md:h-20">
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

                    <div className="flex gap-3">
                      <span className="text-[9px] md:text-sm text-red-500">
                        Rp {discount.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[9px] md:text-sm text-gray-400 line-through">
                        Rp {item.price.toLocaleString("id-ID")}
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
        className="sticky bottom-0 bg-white border-t px-4 md:px-10 py-3 flex justify-between items-center shadow"
      >
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selected.length === data.length}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelected(data.map((item) => item.id));
              } else {
                setSelected([]);
              }
            }}
          />
          <span className="text-sm font-medium">Semua</span>
        </div>

        <div className="text-right">
          <p className="text-[10px] md:text-sm">
            Total{" "}
            <span className="text-red-500 font-semibold">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </p>
          <p className="text-[9px] md:text-xs text-gray-500">
            {totalQty > 0 && `${totalQty} item`}
          </p>
        </div>

        <motion.button
          disabled={selected.length === 0}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={() =>
            navigate("/checkout", {
              state: {
                items: selectedItems.map((item) => ({
                  ...item,
                  qty: quantities[item.id] ?? 1,
                  price: item.price - item.price / 20,
                })),
                totalPrice,
              },
            })
          }
          className="bg-primary disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
        >
          Checkout ({selected.length})
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Cart;
