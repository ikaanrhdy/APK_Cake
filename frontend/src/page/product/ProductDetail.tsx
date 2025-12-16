import { product } from "@/data/product";
import type { products } from "@/types/data";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { FaCartShopping } from "react-icons/fa6";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

/* ================= RATING ================= */
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => {
      if (rating >= i + 1)
        return <FaStar key={i} className="text-yellow-400" />;
      if (rating >= i + 0.5)
        return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      return <FaRegStar key={i} className="text-gray-300" />;
    })}
  </div>
);

/* ================= PAGE ================= */
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const data = product.find((item: products) => item.id === id);
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  if (!data) return null;

  const size = data.size || [];

  /* ===== Menu lainnya pagination ===== */
  const ITEMS_MOBILE = 3;
  const ITEMS_DESKTOP = 5;
  const itemsPerPage = window.innerWidth < 768 ? ITEMS_MOBILE : ITEMS_DESKTOP;

  const otherProducts = product.filter((p) => p.id !== id);
  const displayed = otherProducts.slice(page, page + itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 px-4 md:px-10 lg:px-24"
    >
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between bg-white shadow-md p-4 md:p-5 rounded-md">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 md:p-3 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 cursor-pointer" />
        </button>

        {/* Image */}
        <motion.img
          src={data.image}
          alt={data.title}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 md:w-44 md:h-44 rounded-md object-cover"
        />

        {/* Cart */}
        <Link
          to="/cart"
          className="p-2 md:p-3 rounded-full hover:bg-gray-200 transition"
        >
          <FaCartShopping className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary cursor-pointer" />
        </Link>
      </div>

      {/* ===== INFO ===== */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <RatingStars rating={data.rating} />
            <span className="text-xs text-gray-500">
              {data.reviews} Reviews
            </span>
          </div>
        </div>

        <h4 className="text-sm font-medium md:text-lg">
          Rp {data.price.toLocaleString("id-ID")}
        </h4>
      </div>

      {/* ===== SIZE ===== */}
      <div className="flex gap-2">
        {size.map((s) => {
          const active = selectedSize === s;
          return (
            <motion.button
              key={s}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedSize((prev) => (prev === s ? null : s))}
              className={`px-3 py-1 rounded-md border text-xs transition
                ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {s} cm
            </motion.button>
          );
        })}
      </div>

      {/* ===== ESTIMASI ===== */}
      <div className="bg-white rounded-md p-4 text-sm">
        Estimasi Tiba: <b>1 – 3 hari</b>
      </div>

      {/* ===== DESKRIPSI ===== */}
      <div className="bg-white rounded-md border p-4">
        <h3 className="font-medium mb-1">Deskripsi</h3>
        <p className="text-sm text-gray-600">{data.description}</p>
      </div>

      {/* ===== MENU LAINNYA ===== */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Menu Lainnya</h2>

        <div className="relative">
          <div className="flex gap-3 overflow-hidden">
            {displayed.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="min-w-[120px] md:min-w-40
                  bg-white rounded-md shadow-md p-2 cursor-pointer"
              >
                <Link to={`/product/detail/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <h4 className="text-xs mt-1 line-clamp-2">{item.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 bg-primary text-white rounded disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={page + itemsPerPage >= otherProducts.length}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 bg-primary text-white rounded disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className=" flex flex-row gap-4 md:gap-6 lg:gap-8">
        {/* === Kustomisasi === */}
        <motion.div
          className="w-auto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Link
            to={`/product/${id}/customitation`}
            className=" flex bg-white px-10 py-4 text-sm border border-gray-400 items-center justify-center
             hover:bg-gray-300 md:hover:bg-gray-200 lg:hover:bg-gray-100 transition-colors duration-300"
          >
            <h2 className="font-roboto font-medium">Kustomisasi</h2>
          </Link>
        </motion.div>

        {/* === Masukan Keranjang === */}

        <motion.div
          className="w-auto"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Link to={`/product/${id}/checkoutManual`}>
            <div
              className=" flex bg-primary text-white px-8 py-4 text-sm border border-gray-400 
            items-center justify-center cursor-pointer hover:bg-[#925bb0] md:hover:bg-[#7A3E9D] 
            lg:hover:bg-[#6B3489] hover:text-white transition-all duration-300"
            >
              <h5 className="font-roboto font-medium">Masukan Keranjang</h5>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
