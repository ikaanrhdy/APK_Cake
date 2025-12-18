import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import OrderContent from "./OrderContent";

const TABS = [
  "Belum Bayar",
  "Dikemas",
  "Dikirim",
  "Selesai",
  "Pengembalian",
  "Dibatalkan",
] as const;

type TabType = (typeof TABS)[number];

const OrderPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Belum Bayar");

  return (
    <div className="flex flex-col min-h-screen ">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-2 bg-white p-3 md:p-5 md:px-8 border-b sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-200 rounded-full transition cursor-pointer"
        >
          <ArrowLeft />
        </button>

        <h2 className="font-medium text-sm md:text-xl">Pesanan Saya</h2>
      </div>

      {/* ================= TAB BAR ================= */}
      <div className="bg-white border-b sticky top-14 md:top-[72px] z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex overflow-x-auto md:justify-center scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 md:px-7 py-3 md:py-4 text-sm md:text-base whitespace-nowrap transition cursor-pointer
                  ${
                    activeTab === tab
                      ? "text-primary font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }
                `}
              >
                {tab}

                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-4 right-4 md:left-7 md:right-7 h-0.5 md:h-1 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 px-4 md:px-12 lg:px-20 py-4 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <OrderContent status={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderPage;
