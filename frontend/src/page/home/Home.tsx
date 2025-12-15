import { product } from "@/data/product";
import { Link } from "react-router";

// icons
import { GiFallingStar } from "react-icons/gi";
import { Crown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/* ===== VARIANTS ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const staggerGrid = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const Home = () => {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const paginatedProducts = product.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const displayedProducts = showAll ? product : product.slice(0, 6);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col w-full min-h-screen space-y-8 px-4 md:px-8 lg:px-16"
    >
      {/* ===== HERO ===== */}
      <motion.div variants={fadeUp} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl font-serif">
            Lavender <br className="block md:hidden" /> Dreams
          </h1>
          <p className="font-medium font-serif text-primary text-xs md:text-sm">
            AI-Power Cake <br className="block md:hidden" />
            Customization studio
          </p>
        </div>

        <div className="flex flex-row gap-5">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="#"
              className="flex px-5 py-3 items-center bg-linear-to-r from-[#5F2C7A] to-[#9A79C3]
              rounded-lg gap-3 text-white shadow-lg shadow-black/50"
            >
              <GiFallingStar className="scale-x-[-1] w-8 h-8" />
              <h2 className="text-xs font-Inter text-center">
                Start <br /> Creating
              </h2>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="#"
              className="flex px-10 py-2 items-center bg-white rounded-lg gap-3
              shadow-lg shadow-black/50"
            >
              <h2 className="font-Inter text-sm text-center">
                View <br /> Gallery
              </h2>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="bg-white rounded-md shadow-lg shadow-black/40 p-4 md:p-6"
        >
          <div className="flex justify-between items-center">
            <Crown className="text-[#5F2C7A] w-10 h-10" />
            <div className="flex flex-col gap-1">
              <h2 className="text-[#D77C43] font-medium">Gold Baker</h2>
              <h2 className="text-[#5F2C7A] font-medium">
                150 Lavender <br /> Point
              </h2>
            </div>
            <div className="px-6 py-3 rounded-md bg-background">
              <h1 className="text-center text-[#5F2C7A] font-medium text-xs">
                View <br /> Rewards
              </h1>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ===== BEST SELLER ===== */}
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <h1 className="font-bold font-roboto text-lg md:text-xl">
          Best Seller
        </h1>

        <motion.div
          variants={staggerGrid}
          key={page}
          animate="show"
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {paginatedProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="block">
              <motion.div
                variants={cardAnim}
                whileHover={{ y: -6 }}
                className="flex flex-col bg-white rounded-lg shadow-md p-2 cursor-pointer"
              >
                <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <h2 className="text-xs font-semibold line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-xs font-medium text-primary">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="flex justify-end gap-3 mt-6">
          {page > 0 && (
            <Button
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-1 bg-primary text-white shadow-lg shadow-black/40 cursor-pointer"
            >
              <ChevronRight className="rotate-180" />
              Prev
            </Button>
          )}

          {(page + 1) * ITEMS_PER_PAGE < product.length && (
            <Button
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 bg-primary text-white shadow-lg shadow-black/40 cursor-pointer"
            >
              Next Cake
              <ChevronRight />
            </Button>
          )}
        </div>
      </motion.div>

      {/* ===== KATEGORI ===== */}
      <motion.div variants={fadeUp} className="flex flex-col space-y-8">
        <h1 className="font-bold text-xl font-roboto text-center">Kategori</h1>

        <motion.div
          variants={staggerGrid}
          key={page}
          animate="show"
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {displayedProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="block">
              <motion.div
                key={item.id}
                variants={cardAnim}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col bg-white rounded-lg shadow-md p-2"
              >
                <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <h2 className="text-xs font-semibold line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-xs font-medium text-primary">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {!showAll && product.length > 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 rounded-full bg-primary text-white text-sm
              font-medium shadow-lg shadow-black/40 active:scale-95 transition cursor-pointer"
            >
              Load More Cakes 🍰
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Home;
