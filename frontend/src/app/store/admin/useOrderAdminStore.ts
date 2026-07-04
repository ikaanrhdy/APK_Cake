import { create } from "zustand";
import { ordersAdmin } from "@/data/orderAdminDummy";
import type { OrderAdmin, OrderStatusKey } from "@/types/orderAdmin";

interface OrderStoreState {
  orders: OrderAdmin[];
  search: string;
  activeStatus: OrderStatusKey | null;
}

interface OrderStore extends OrderStoreState {
  setSearch: (value: string) => void;
  setActiveStatus: (status: OrderStatusKey | null) => void;
  updateOrderStatus: (id: string, status: OrderStatusKey) => void;
  getFilteredOrders: () => OrderAdmin[];
  getStatusCount: (status: OrderStatusKey) => number;
  getActiveOrdersCount: () => number;
  getMonthlyRevenue: () => number;
  getRecentOrders: (limit?: number) => OrderAdmin[];
}

const useOrderAdminStore = create<OrderStore>((set, get) => ({
  orders: ordersAdmin,
  search: "",
  activeStatus: null,

  setSearch: (search) => set({ search }),
  setActiveStatus: (activeStatus) => set({ activeStatus }),

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),

  getFilteredOrders: () => {
    const { orders, search, activeStatus } = get();
    return orders.filter((order) => {
      const matchStatus = activeStatus ? order.status === activeStatus : true;
      const matchSearch =
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some((i) =>
          i.name.toLowerCase().includes(search.toLowerCase()),
        );
      return matchStatus && matchSearch;
    });
  },

  getStatusCount: (status) => {
    return get().orders.filter((o) => o.status === status).length;
  },

  // pesanan aktif = belum selesai & belum dibatalkan/dikembalikan
  getActiveOrdersCount: () => {
    return get().orders.filter(
      (o) => !["Selesai", "Dibatalkan", "Dikembalikan"].includes(o.status),
    ).length;
  },

  // omset = total dari pesanan yang sudah Selesai
  getMonthlyRevenue: () => {
    return get()
      .orders.filter((o) => o.status === "Selesai")
      .reduce((sum, o) => sum + o.totalValue, 0);
  },

  getRecentOrders: (limit = 12) => {
    return get().orders.slice(0, limit);
  },
}));

export default useOrderAdminStore;
