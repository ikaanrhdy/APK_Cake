import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router";
import { Plus } from "lucide-react";
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
import type { AdminLayoutContext } from "@/layout/AdminLayout";
import AdminPageHeader from "@/components/admin/PageHeaders";

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
  const { onOpenSidebar } = useOutletContext<AdminLayoutContext>();
  const { activeTab, setActiveTab } = useKustomisasiStore();

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="space-y-4">
      {/* ================= HEADER ================= */}
      <AdminPageHeader
        title="Kelola Bahan Kustomisasi"
        subtitle="Atur pilihan topping, rasa, dan opsi kustomisasi lainnya"
        onOpenSidebar={onOpenSidebar}
        action={
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        }
      />

      {/* ── Card Wrapper ── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
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
