import { motion, AnimatePresence } from "framer-motion";
import {
  useKustomisasiStore,
  type KustomisasiTab,
} from "@/app/store/admin/useKustomisasiStore";

import BaseCake from "./kustomisasi/BaseCake";
import TipeCake from "./kustomisasi/TipeCake";
import WarnaCream from "./kustomisasi/WarnaCream";
import Layer from "./kustomisasi/Layer";
import Ukuran from "./kustomisasi/Ukuran";
import Topping from "./kustomisasi/Topping";
import Lilin from "./kustomisasi/Lilin";
import Topper from "./kustomisasi/Topper";

const TABS: KustomisasiTab[] = [
  "Base Cake",
  "Tipe Cream",
  "Warna Cream",
  "Layer",
  "Ukuran",
  "Topping",
  "Lilin",
  "Topper",
];

const TAB_COMPONENTS: Record<KustomisasiTab, React.ComponentType> = {
  "Base Cake": BaseCake,
  "Tipe Cream": TipeCake,
  "Warna Cream": WarnaCream,
  Layer: Layer,
  Ukuran: Ukuran,
  Topping: Topping,
  Lilin: Lilin,
  Topper: Topper,
};

const KustomisasiAdmin = () => {
  const { activeTab, setActiveTab } = useKustomisasiStore();

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Card Wrapper ── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Kelola Bahan Kustomisasi
              </h2>
              <p className="text-xs text-gray-400">
                Atur pilihan topping, rasa, dan opsi kustomisasi lainnya
              </p>
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-3 text-sm whitespace-nowrap transition cursor-pointer shrink-0
                  ${
                    activeTab === tab
                      ? "text-white font-semibold"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                {/* Active pill background */}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-active"
                    className="absolute inset-x-2 inset-y-1.5 rounded-lg bg-primary z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content (per-tab page component) ── */}
        <div className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default KustomisasiAdmin;
