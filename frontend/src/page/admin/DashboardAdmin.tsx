import { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router";
import { TrendingUp, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";
import type { AdminLayoutContext } from "@/layout/AdminLayout";
import useAuthStore from "@/app/store/auth";
import useOrderAdminStore from "@/app/store/admin/useOrderAdminStore";
import AdminPageHeader from "@/components/admin/PageHeaders";
import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import { statusConfig, STATUS_LIST, salesData } from "@/data/orderAdminDummy";
import OrderCard from "./orderAdmin/OrderCard";

const INITIAL_LIMIT = 3;
const LOAD_MORE_STEP = 3;

const DashboardAdmin = () => {
  const { onOpenSidebar } = useOutletContext<AdminLayoutContext>();
  const { name, role } = useAuthStore();
  const navigate = useNavigate();

  const {
    getActiveOrdersCount,
    getMonthlyRevenue,
    getStatusCount,
    getRecentOrders,
  } = useOrderAdminStore();

  // ambil SEMUA order sekali aja, slicing-nya di komponen ini
  const allRecentOrders = getRecentOrders();

  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const visibleOrders = allRecentOrders.slice(0, visibleCount);
  const hasMore = visibleCount < allRecentOrders.length;

  const stats = [
    {
      title: "Omset Bulan Ini",
      value: `Rp ${getMonthlyRevenue().toLocaleString("id-ID")}`,
      icon: TrendingUp,
      color: "text-green-700",
      bg: "bg-green-500/20",
    },
    {
      title: "Pesanan Aktif",
      value: String(getActiveOrdersCount()),
      icon: ShoppingBag,
      color: "text-blue-700",
      bg: "bg-blue-500/20",
    },
  ];

  const statList = STATUS_LIST.map((status) => {
    const st = statusConfig[status];
    return {
      status,
      label: st.label,
      count: getStatusCount(status),
      textClass: st.textClass,
      bgClass: st.bgClass,
      borderClass: st.borderClass,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
    >
      <AdminPageHeader
        title={`Dashboard ${role === "owner" ? "Owner" : "Admin Toko"}`}
        subtitle={`Overview pesanan dan penjualan bulan ini${name ? ` · Halo, ${name}` : ""}`}
        onOpenSidebar={onOpenSidebar}
      />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {statList.map((item) => (
          <div
            key={item.status}
            className={`${item.bgClass} ${item.borderClass} border rounded-md p-3 sm:p-4`}
          >
            <p
              className={`${item.textClass} text-xs sm:text-sm font-medium mb-1 truncate`}
            >
              {item.label}
            </p>
            <p
              className={`${item.textClass} text-lg sm:text-xl font-bold leading-none`}
            >
              {item.count}
            </p>
          </div>
        ))}
      </div>

      {role === "owner" && <SalesChart data={salesData} />}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base sm:text-lg">Pesanan Terbaru</h2>
          <button
            onClick={() => navigate("/admin/order")}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
          >
            Lihat Semua
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {visibleOrders.map((order, i) => (
            <OrderCard key={`${order.id}-${i}`} order={order} index={i} />
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + LOAD_MORE_STEP, allRecentOrders.length),
              )
            }
            className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-md py-2.5 hover:bg-gray-50 transition cursor-pointer"
          >
            Muat Lebih Banyak
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardAdmin;
