import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Truck, TicketPercent, Wallet } from "lucide-react";

const CheckoutDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Data tidak ditemukan
      </div>
    );
  }

  const { item, subtotal, shipping, voucher, payment } = state;
  const total = subtotal + shipping - voucher;

  return (
    <div className="min-h-screen flex flex-col ">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-medium">Detail Checkout</h2>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 space-y-3 p-4 max-w-3xl mx-auto w-full">
        {/* ADDRESS */}
        <div className="bg-white p-4 rounded-md border flex gap-3">
          <MapPin className="text-primary" />
          <div>
            <p className="font-medium">Hana Nana</p>
            <p className="text-sm text-gray-500">
              Jl. Mawar No.12, Jakarta Selatan
            </p>
          </div>
        </div>

        {/* PRODUCT */}
        <div className="bg-white border rounded-md p-4 flex gap-4">
          <img
            src={item.image}
            className="w-20 h-20 object-contain border rounded"
          />
          <div className="flex-1">
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
          </div>
          <p className="font-semibold text-red-500">
            Rp {(item.price * item.qty).toLocaleString("id-ID")}
          </p>
        </div>

        {/* SHIPPING */}
        <div className="bg-white border rounded-md p-4 flex justify-between text-sm">
          <div className="flex items-center gap-2 font-medium">
            <Truck size={16} />
            Ongkir
          </div>
          <span>Rp {shipping.toLocaleString("id-ID")}</span>
        </div>

        {/* SUMMARY */}
        <div className="bg-white border rounded-md p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <div className="flex items-center gap-2">
              <TicketPercent size={16} />
              Voucher
            </div>
            <span>- Rp {voucher.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Wallet size={16} />
              Pembayaran
            </div>
            <span>{payment}</span>
          </div>

          <hr />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span className="text-red-500">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
