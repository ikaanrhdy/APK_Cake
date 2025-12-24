import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, Users, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DashboardAdminProps {
  title: string;
  value: string;
  desc: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bg: string;
}

// ================= DATA DUMMY =================
const dashboardStats: DashboardAdminProps[] = [
  {
    title: "Total Penjualan",
    value: "Rp 12.500.000",
    desc: "Bulan ini",
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Total Pesanan",
    value: "486",
    desc: "Semua pesanan",
    icon: ShoppingCart,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Pelanggan Baru",
    value: "78",
    desc: "30 hari terakhir",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Pesanan Pending",
    value: "19",
    desc: "Belum diproses",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

// ================= DATA CHART =================
const salesData = [
  { name: "Jan", sales: 4000000, orders: 120 },
  { name: "Feb", sales: 3000000, orders: 98 },
  { name: "Mar", sales: 5000000, orders: 150 },
  { name: "Apr", sales: 4200000, orders: 132 },
  { name: "Mei", sales: 6100000, orders: 180 },
  { name: "Jun", sales: 7200000, orders: 210 },
];

// ================= MOTION =================
const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

// ================= CHART WRAPPER =================
const BarChartWrapper = ({ data }: { data: typeof salesData }) => (
  <ResponsiveContainer width="100%" aspect={2}>
    <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" fontSize={12} />
      <YAxis fontSize={12} />
      <Tooltip />
      <Bar dataKey="sales" fill="#22c55e" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const LineChartWrapper = ({ data }: { data: typeof salesData }) => (
  <ResponsiveContainer width="100%" aspect={2}>
    <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" fontSize={12} />
      <YAxis fontSize={12} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="orders"
        stroke="#3b82f6"
        strokeWidth={2}
        dot={{ r: 3 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

// ================= DASHBOARD =================
const DashboardAdmin = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {dashboardStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={cardVariant}
              initial="hidden"
              animate="show"
              custom={i}
              className="bg-card border border-border rounded-lg p-3 sm:p-4 flex items-center gap-3"
            >
              {/* Icon */}
              <div
                className={`${item.bg} ${item.color} p-2.5 sm:p-3 rounded-lg`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  {item.title}
                </p>
                <h2 className="text-base sm:text-lg font-semibold leading-tight">
                  {item.value}
                </h2>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= CHARTS GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* BAR CHART */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Penjualan Bulanan</h3>
          <BarChartWrapper data={salesData} />
        </div>

        {/* LINE CHART */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Tren Pesanan</h3>
          <LineChartWrapper data={salesData} />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardAdmin;
