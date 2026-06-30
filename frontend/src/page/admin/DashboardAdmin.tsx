import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Truck,
  Package,
  CircleX,
  CheckCircle,
  Phone,
  Calendar,
  Sparkles,
} from "lucide-react";

// ================= TYPES =================
interface DashboardAdminProps {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bg: string;
}

interface BadgeData {
  name: string;
  count: number;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

interface OrderItem {
  name: string;
  qty: number;
}

type StatusKey =
  | "Menunggu"
  | "Diproses"
  | "Dikirim"
  | "Sampai"
  | "Selesai"
  | "Dibatalkan"
  | "Dikembalikan";

interface ActionButton {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

interface Order {
  id: string;
  date: string;
  status: StatusKey;
  total: string;
  isCustom?: boolean;
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    date: string;
  };
  items?: OrderItem[];
  customDesc?: string;
  note: string;
  statusInfo?: string;
  actions: ActionButton[];
}

// ================= STATUS CONFIG =================
const statusConfig: Record<
  StatusKey,
  {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    textClass: string;
    bgClass: string;
    borderClass: string;
  }
> = {
  Menunggu: {
    label: "Menunggu",
    icon: Clock,
    textClass: "text-orange-600",
    bgClass: "bg-orange-100",
    borderClass: "border-orange-300",
  },
  Diproses: {
    label: "Diproses",
    icon: Package,
    textClass: "text-blue-600",
    bgClass: "bg-blue-100",
    borderClass: "border-blue-300",
  },
  Dikirim: {
    label: "Dikirim",
    icon: Truck,
    textClass: "text-purple-600",
    bgClass: "bg-purple-100",
    borderClass: "border-purple-300",
  },
  Sampai: {
    label: "Sampai",
    icon: CheckCircle,
    textClass: "text-blue-600",
    bgClass: "bg-blue-100",
    borderClass: "border-blue-300",
  },
  Selesai: {
    label: "Selesai",
    icon: CheckCircle,
    textClass: "text-green-700",
    bgClass: "bg-green-100",
    borderClass: "border-green-300",
  },
  Dibatalkan: {
    label: "Dibatalkan",
    icon: CircleX,
    textClass: "text-red-600",
    bgClass: "bg-red-100",
    borderClass: "border-red-300",
  },
  Dikembalikan: {
    label: "Dikembalikan",
    icon: CircleX,
    textClass: "text-orange-700",
    bgClass: "bg-orange-100",
    borderClass: "border-orange-300",
  },
};

// ================= ACTION BUTTONS CONFIG =================
const actionButtons: Record<string, ActionButton> = {
  Proses: {
    label: "Proses",
    icon: Package,
    textClass: "text-blue-600",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
  },
  Dikirim: {
    label: "Dikirim",
    icon: Truck,
    textClass: "text-purple-600",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
  },
  Sampai: {
    label: "Sampai",
    icon: CheckCircle,
    textClass: "text-blue-600",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
  },
  Tolak: {
    label: "Tolak",
    icon: CircleX,
    textClass: "text-red-500",
    bgClass: "bg-red-50",
    borderClass: "border-red-200",
  },
};

// ================= DATA DUMMY =================
const dashboardStats: DashboardAdminProps[] = [
  {
    title: "Omset Bulan Ini",
    value: "Rp 530.000",
    icon: TrendingUp,
    color: "text-green-700",
    bg: "bg-green-500/20",
  },
  {
    title: "Pesanan Aktif",
    value: "7",
    icon: ShoppingBag,
    color: "text-blue-700",
    bg: "bg-blue-500/20",
  },
];

const badgeData: BadgeData[] = [
  {
    name: "Menunggu",
    count: 1,
    textClass: "text-orange-700",
    bgClass: "bg-orange-300/10",
    borderClass: "border-orange-400",
  },
  {
    name: "Diproses",
    count: 1,
    textClass: "text-blue-700",
    bgClass: "bg-blue-300/10",
    borderClass: "border-blue-400",
  },
  {
    name: "Dikirim",
    count: 1,
    textClass: "text-purple-700",
    bgClass: "bg-purple-300/10",
    borderClass: "border-purple-400",
  },
  {
    name: "Sampai",
    count: 1,
    textClass: "text-blue-700",
    bgClass: "bg-blue-300/10",
    borderClass: "border-blue-400",
  },
  {
    name: "Selesai",
    count: 1,
    textClass: "text-green-700",
    bgClass: "bg-green-300/10",
    borderClass: "border-green-400",
  },
  {
    name: "Dibatalkan",
    count: 1,
    textClass: "text-red-700",
    bgClass: "bg-red-300/20",
    borderClass: "border-red-400",
  },
  {
    name: "Dikembalikan",
    count: 1,
    textClass: "text-orange-700",
    bgClass: "bg-orange-300/20",
    borderClass: "border-orange-400",
  },
];

const orders: Order[] = [
  {
    id: "ORD004",
    date: "8/2/2026",
    status: "Menunggu",
    total: "Rp 330.000",
    customer: { name: "Budi Santoso", phone: "081223344556" },
    delivery: { date: "10/4/2026" },
    items: [
      { name: "Black Forest Cake", qty: 1 },
      { name: "Chocolate Brownies", qty: 2 },
    ],
    note: "Mohon dikirim pagi hari",
    statusInfo: "Pesanan Menunggu - konfirmasi Pembayaran oleh pembeli",
    actions: [actionButtons.Proses, actionButtons.Tolak],
  },
  {
    id: "ORD004",
    date: "8/2/2026",
    status: "Diproses",
    total: "Rp 330.000",
    isCustom: true,
    customer: { name: "Budi Santoso", phone: "081223344556" },
    delivery: { date: "10/4/2026" },
    customDesc:
      "Ukuran: Small (20cm) | Base Cake: Vanila | Tulisan: Welcome Baby Boy | Desain: Baby shower theme biru",
    note: "Mohon dikirim pagi hari",
    actions: [
      actionButtons.Proses,
      actionButtons.Dikirim,
      actionButtons.Sampai,
    ],
  },
  {
    id: "ORD001",
    date: "8/2/2026",
    status: "Dikirim",
    total: "Rp 330.000",
    customer: { name: "Budi Santoso", phone: "081223344556" },
    delivery: { date: "10/4/2026" },
    items: [
      { name: "Black Forest Cake", qty: 1 },
      { name: "Chocolate Brownies", qty: 2 },
    ],
    note: "Mohon dikirim pagi hari",
    statusInfo: "Pesanan Dikirim - Pesanan sedang menuju alamat pembeli",
    actions: [actionButtons.Dikirim, actionButtons.Sampai],
  },
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

// ================= ORDER CARD =================
const OrderCard = ({ order, index }: { order: Order; index: number }) => {
  const st = statusConfig[order.status];
  const StatusIcon = st.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-sm"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">
            {order.id}
          </span>
          <span className="text-xs text-muted-foreground">{order.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${st.textClass} ${st.bgClass} ${st.borderClass}`}
          >
            <StatusIcon className="w-3 h-3" />
            {st.label}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {order.total}
          </span>
        </div>
      </div>

      {/* ── Kustom Badge ── */}
      {order.isCustom && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">
          <Sparkles className="w-3 h-3" />
          Kustom
        </span>
      )}

      {/* ── Customer ── */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          {order.customer.name}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>{order.customer.phone}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Kirim: {order.delivery.date}</span>
        </div>
      </div>

      {/* ── Items / Custom Desc ── */}
      {order.items && (
        <ul className="space-y-0.5">
          {order.items.map((item) => (
            <li key={item.name} className="text-xs text-muted-foreground">
              {item.name} × {item.qty}
            </li>
          ))}
        </ul>
      )}
      {order.customDesc && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {order.customDesc}
        </p>
      )}

      {/* ── Note ── */}
      <div className="bg-muted/50 rounded-md px-3 py-2 text-xs text-muted-foreground italic">
        {order.note}
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {order.actions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={action.label}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-opacity hover:opacity-80 ${action.textClass} ${action.bgClass} ${action.borderClass}`}
            >
              <ActionIcon className="w-3.5 h-3.5" />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* ── Status Info ── */}
      {order.statusInfo && (
        <p className="text-[11px] text-muted-foreground">{order.statusInfo}</p>
      )}
    </motion.div>
  );
};

// ================= DASHBOARD =================
const DashboardAdmin = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
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
              <div
                className={`${item.bg} ${item.color} p-2.5 sm:p-3 rounded-lg shrink-0`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                  {item.title}
                </p>
                <h2 className="text-sm sm:text-lg font-semibold leading-tight font-inter">
                  {item.value}
                </h2>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= BADGE GRID ================= */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {badgeData.map((item, i) => (
          <motion.div
            key={item.name}
            variants={cardVariant}
            initial="hidden"
            animate="show"
            custom={i}
            className={`${item.bgClass} ${item.borderClass} border rounded-md p-3 sm:p-4`}
          >
            <p
              className={`${item.textClass} text-xs sm:text-sm font-medium mb-1 truncate`}
            >
              {item.name}
            </p>
            <p
              className={`${item.textClass} text-lg sm:text-xl font-bold leading-none`}
            >
              {item.count}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ================= PESANAN TERBARU ================= */}
      <div className="space-y-3">
        <h1 className="font-bold text-lg md:text-2xl lg:text-3xl font-roboto">
          Pesanan Terbaru
        </h1>
        <div className="space-y-3">
          {orders.map((order, i) => (
            <OrderCard key={`${order.id}-${i}`} order={order} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardAdmin;
