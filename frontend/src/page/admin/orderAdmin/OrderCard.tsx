import { motion } from "framer-motion";
import { Phone, Calendar, Sparkles } from "lucide-react";
import { statusConfig } from "@/data/orderAdminDummy";
import type { OrderAdmin } from "@/types/orderAdmin";

const OrderCard = ({ order, index }: { order: OrderAdmin; index: number }) => {
  const st = statusConfig[order.status];
  const StatusIcon = st.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-900">
            {order.id}
          </span>
          <span className="text-xs text-gray-400">{order.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${st.textClass} ${st.bgClass} ${st.borderClass}`}
          >
            <StatusIcon className="w-3 h-3" />
            {st.label}
          </span>
          <span className="text-sm font-semibold text-gray-900">
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
        <p className="text-sm font-semibold text-gray-900">
          {order.customer.name}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>{order.customer.phone}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Kirim: {order.delivery.date}</span>
        </div>
      </div>

      {/* ── Items / Custom Desc / Variant Info ── */}
      {order.items && (
        <ul className="space-y-0.5">
          {order.items.map((item) => (
            <li key={item.name} className="text-xs text-gray-600">
              {item.name} × {item.qty}
            </li>
          ))}
        </ul>
      )}
      {order.customDesc && (
        <p className="text-xs text-gray-600 leading-relaxed">
          {order.customDesc}
        </p>
      )}
      {order.variantInfo && (
        <p className="text-xs text-gray-600">{order.variantInfo}</p>
      )}

      {/* ── Note ── */}
      {order.note && (
        <div className="bg-gray-50 rounded-md px-3 py-2 text-xs text-gray-500 italic">
          {order.note}
        </div>
      )}

      {/* ── Timeline Info Box (Sampai / Selesai / Dibatalkan) ── */}
      {order.timeline && (
        <div
          className={`flex gap-2 rounded-md px-3 py-2.5 border ${order.timeline.bgClass} ${order.timeline.borderClass}`}
        >
          <order.timeline.icon
            className={`w-4 h-4 mt-0.5 shrink-0 ${order.timeline.textClass}`}
          />
          <div className="min-w-0">
            <p className={`text-xs font-semibold ${order.timeline.textClass}`}>
              {order.timeline.title}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Waktu: {order.timeline.time}
            </p>
            <p className={`text-xs mt-1 ${order.timeline.textClass} italic`}>
              {order.timeline.description}
            </p>
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      {order.actions.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {order.actions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={action.label}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-opacity hover:opacity-80 cursor-pointer ${action.textClass} ${action.bgClass} ${action.borderClass}`}
              >
                <ActionIcon className="w-3.5 h-3.5" />
                {action.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Refund Request ── */}
      {order.refundRequest && (
        <div
          className={`rounded-md px-3 py-2.5 border ${
            order.refundRequest.status === "menunggu"
              ? "bg-amber-50 border-amber-200"
              : order.refundRequest.status === "ditolak"
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
          }`}
        >
          <p
            className={`text-xs font-semibold flex items-center gap-1 ${
              order.refundRequest.status === "menunggu"
                ? "text-amber-700"
                : order.refundRequest.status === "ditolak"
                  ? "text-red-700"
                  : "text-green-700"
            }`}
          >
            {order.refundRequest.status === "menunggu" &&
              "⏱ Pengajuan Pengembalian Dana - Menunggu Review"}
            {order.refundRequest.status === "ditolak" &&
              "✕ Pengembalian Dana Ditolak"}
            {order.refundRequest.status === "disetujui" &&
              "✓ Pengembalian Dana Disetujui"}
          </p>

          <p className="text-[11px] text-gray-500 mt-1">
            Diajukan: {order.refundRequest.diajukan}
          </p>
          <p className="text-xs mt-1">
            <span className="font-medium">Alasan:</span>{" "}
            {order.refundRequest.alasan}
          </p>
          {order.refundRequest.catatanPembeli && (
            <p className="text-xs mt-1">
              <span className="font-medium">Catatan Pembeli:</span>{" "}
              {order.refundRequest.catatanPembeli}
            </p>
          )}

          {order.refundRequest.direview && (
            <>
              <hr className="my-2 border-gray-200" />
              <p className="text-[11px] text-gray-500">
                Direview: {order.refundRequest.direview}
              </p>
              <p className="text-xs mt-1">
                <span className="font-medium">Catatan Admin:</span>{" "}
                {order.refundRequest.catatanAdmin}
              </p>
            </>
          )}

          {order.refundRequest.status === "menunggu" && (
            <button className="mt-2 text-xs font-medium px-3 py-1.5 rounded-md bg-orange-500 text-white hover:opacity-80">
              Review Pengajuan
            </button>
          )}
        </div>
      )}

      {/* ── Status Info ── */}
      {order.statusInfo && (
        <p className="text-[11px] text-gray-400">{order.statusInfo}</p>
      )}
    </motion.div>
  );
};

export default OrderCard;
