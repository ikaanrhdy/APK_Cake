import { motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { TrendingUp, ShoppingBag } from "lucide-react";
import type { AdminLayoutContext } from "@/layout/AdminLayout";
import useAuthStore from "@/app/store/auth";
import useOrderAdminStore from "@/app/store/admin/useOrderAdminStore";
import AdminPageHeader from "@/components/admin/PageHeaders";
import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import { statusConfig, STATUS_LIST, salesData } from "@/data/orderAdminDummy";
import OrderCard from "./orderAdmin/OrderCard";

const DashboardAdmin = () => {
  const { onOpenSidebar } = useOutletContext<AdminLayoutContext>();
  const { name, role } = useAuthStore();
  const {
    getActiveOrdersCount,
    getMonthlyRevenue,
    getStatusCount,
    getRecentOrders,
  } = useOrderAdminStore();

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

  const recentOrders = getRecentOrders(3);

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
        {STATUS_LIST.map((status) => {
          const st = statusConfig[status];
          return (
            <div
              key={status}
              className={`${st.bgClass} ${st.borderClass} border rounded-md p-3 sm:p-4`}
            >
              <p
                className={`${st.textClass} text-xs sm:text-sm font-medium mb-1 truncate`}
              >
                {status}
              </p>
              <p
                className={`${st.textClass} text-lg sm:text-xl font-bold leading-none`}
              >
                {getStatusCount(status)}
              </p>
            </div>
          );
        })}
      </div>

      {role === "owner" && <SalesChart data={salesData} />}

      <div className="space-y-3">
        <h2 className="font-bold text-base sm:text-lg">Pesanan Terbaru</h2>
        <div className="space-y-3">
          {recentOrders.map((order, i) => (
            <OrderCard key={`${order.id}-${i}`} order={order} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardAdmin;
