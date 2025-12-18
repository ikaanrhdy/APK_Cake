import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Truck,
  ChevronRight,
  Wallet,
  TicketPercent,
  X,
} from "lucide-react";

type CheckoutItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
};

const STORAGE_KEY = "checkout-cart";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [shipping, setShipping] = useState(15000);
  const [voucher, setVoucher] = useState(0);
  const [payment, setPayment] = useState("COD");
  const [openPayment, setOpenPayment] = useState(false);

  /* ================= DATA ================= */
  const data = useMemo(() => {
    if (state?.items && state?.totalPrice) {
      const payload = {
        items: state.items as CheckoutItem[],
        subtotal: state.totalPrice as number,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { items: [], subtotal: 0 };
  }, [state]);

  const total = data.subtotal + shipping - voucher;

  if (!data.items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checkout kosong
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-medium">Checkout</h2>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 space-y-3 p-4 max-w-4xl mx-auto w-full">
        {/* ===== ADDRESS ===== */}
        <div className="bg-white p-4 rounded-md border flex gap-3">
          <MapPin className="text-primary" />
          <div>
            <p className="font-medium">Hana Nana</p>
            <p className="text-sm text-gray-500">
              Jl. Mawar No.12, Jakarta Selatan
            </p>
          </div>
        </div>

        {/* ===== PRODUCT ===== */}
        <div className="bg-white border rounded-md divide-y">
          {data.items.map((item: CheckoutItem) => (
            <div key={item.id} className="p-4 flex gap-4">
              <img
                src={item.image}
                className="w-16 h-16 object-contain border rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">x{item.qty}</p>
              </div>
              <p className="text-sm font-semibold text-red-500">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>

        {/* ===== SHIPPING ===== */}
        <div className="bg-white border rounded-md p-4 space-y-2">
          <div className="flex items-center gap-2 font-medium">
            <Truck size={18} /> Metode Pengiriman
          </div>

          <label className="flex justify-between text-sm">
            Reguler (2-3 hari)
            <input
              type="radio"
              checked={shipping === 15000}
              onChange={() => setShipping(15000)}
            />
          </label>

          <label className="flex justify-between text-sm">
            Express (1 hari)
            <input
              type="radio"
              checked={shipping === 25000}
              onChange={() => setShipping(25000)}
            />
          </label>
        </div>

        {/* ===== SUMMARY (SHOPEE STYLE) ===== */}
        <div className="bg-white border rounded-md p-4 space-y-3 text-sm">
          {/* Voucher */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <TicketPercent size={16} />
              Voucher
            </div>
            <select
              onChange={(e) => setVoucher(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              <option value={0}>Tidak Pakai</option>
              <option value={10000}>Diskon 10.000</option>
              <option value={20000}>Diskon 20.000</option>
            </select>
          </div>

          {/* Payment */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setOpenPayment(true)}
          >
            <div className="flex gap-2 items-center">
              <Wallet size={16} />
              Metode Pembayaran
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              {payment}
              <ChevronRight size={16} />
            </div>
          </div>

          <hr />

          {/* Price Detail */}
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {data.subtotal.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between">
            <span>Ongkir</span>
            <span>Rp {shipping.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Voucher</span>
            <span>- Rp {voucher.toLocaleString("id-ID")}</span>
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

      {/* ================= FOOTER ================= */}
      <div className="sticky bottom-0 bg-white border-t px-4 py-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold text-red-500">
            Rp {total.toLocaleString("id-ID")}
          </p>
        </div>

        <button
          className="bg-primary text-white px-6 py-2 rounded-md"
          onClick={() => alert("Pesanan dibuat (dummy)")}
        >
          Buat Pesanan
        </button>
      </div>

      {/* ================= PAYMENT MODAL ================= */}
      <AnimatePresence>
        {openPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end z-50"
            onClick={() => setOpenPayment(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full rounded-t-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium">Pilih Metode Pembayaran</p>
                <X onClick={() => setOpenPayment(false)} />
              </div>

              {["COD", "ShopeePay", "Transfer Bank"].map((m) => (
                <div
                  key={m}
                  onClick={() => {
                    setPayment(m);
                    setOpenPayment(false);
                  }}
                  className="p-3 border rounded mb-2 flex justify-between cursor-pointer"
                >
                  {m}
                  {payment === m && "✓"}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
