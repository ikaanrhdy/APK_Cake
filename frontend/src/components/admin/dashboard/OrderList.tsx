import OrderCard from "./OrderCard";
import type { Order } from "@/types/dashboard";

const OrderList = ({
  orders,
  title = "Laporan Pesanan Masuk",
}: {
  orders: Order[];
  title?: string;
}) => {
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-base sm:text-lg md:text-xl font-roboto">
        {title}
      </h2>
      <div className="space-y-3">
        {orders.map((order, i) => (
          <OrderCard key={`${order.id}-${i}`} order={order} index={i} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
