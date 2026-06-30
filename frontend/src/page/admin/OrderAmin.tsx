import { motion } from "framer-motion";
import useOrderAdminStore from "@/app/store/admin/useOrderAdminStore";
import { statusConfig } from "@/data/orderAdminDummy";
import OrderAdminHeader from "./orderAdmin/OrderAdminHeader";
import OrderStatusFilterGrid from "./orderAdmin/OrderStatusFilterGrid";
import EmptyOrderState from "./orderAdmin/EmptyOrderState";
import OrderCard from "./orderAdmin/OrderCard";

const OrderAdmin = () => {
  const { search, setSearch, activeStatus, getFilteredOrders } =
    useOrderAdminStore();
  const filteredOrders = getFilteredOrders();

  const sectionTitle = activeStatus
    ? `Pesanan ${statusConfig[activeStatus].label}`
    : "Semua Pesanan";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <OrderAdminHeader search={search} onSearchChange={setSearch} />
      <OrderStatusFilterGrid />

      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
        <h2 className="font-semibold text-sm text-gray-800">
          {sectionTitle} ({filteredOrders.length} pesanan)
        </h2>

        {filteredOrders.length === 0 ? (
          <EmptyOrderState />
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order, i) => (
              <OrderCard key={`${order.id}-${i}`} order={order} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderAdmin;
