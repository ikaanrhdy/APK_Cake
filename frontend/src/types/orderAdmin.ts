import type { ComponentType, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type OrderStatusKey =
  | "Menunggu"
  | "Diproses"
  | "Dikirim"
  | "Sampai"
  | "Selesai"
  | "Dibatalkan"
  | "Dikembalikan";

export interface OrderItemAdmin {
  name: string;
  qty: number;
}

export interface ActionButtonAdmin {
  label: string;
  icon: IconType;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

export interface OrderTimelineInfo {
  icon: IconType;
  title: string;
  time: string;
  description: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

export interface OrderAdmin {
  id: string;
  date: string;
  status: OrderStatusKey;
  total: string; // format "Rp 330.000"
  totalValue: number; // angka mentah, dipakai buat hitung omset
  isCustom?: boolean;
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    date: string;
  };
  items?: OrderItemAdmin[];
  customDesc?: string;
  variantInfo?: string;
  note?: string;
  statusInfo?: string;
  timeline?: OrderTimelineInfo;
  actions: ActionButtonAdmin[];
  refundRequest?: RefundRequestInfo;
}

// dashboard-only types (tetap dipisah karena bukan data order)
export interface DashboardStat {
  title: string;
  value: string;
  icon: IconType;
  color: string;
  bg: string;
}

export interface SalesPoint {
  date: string;
  value: number;
}

export interface RefundRequestInfo {
  status: "menunggu" | "ditolak" | "disetujui";
  diajukan: string; // tanggal pengajuan
  alasan: string;
  catatanPembeli?: string;
  direview?: string; // tanggal direview admin
  catatanAdmin?: string;
}
