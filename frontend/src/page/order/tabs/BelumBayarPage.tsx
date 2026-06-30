import { Button } from "@/components/ui/button";
import { product } from "@/data/product";
import { motion } from "framer-motion";
import { useState } from "react";
import UploadBuktiSampaiModal from "@/components/user/UploadBuktiSampaiModal";

/* ================= VARIANTS ================= */

const pageVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const rekomendasiContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const rekomendasiItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
};

const buttonMotion = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

/* ================= PAGE ================= */

const BelumBayarPage = () => {
  const data1 = product[0];
  const rekomendasi = product.slice(1, 7);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleUploadSubmit = (data: {
    orderId: string;
    file: File;
    note: string;
  }) => {
    console.log("Upload bukti sampai:", data);
    // TODO: panggil API upload di sini
  };

  return (
    <>
      <motion.div
        variants={pageVariant}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 md:gap-8 lg:gap-10"
      >
        {/* ================= ORDER ================= */}
        {data1 && (
          <motion.div
            variants={cardVariant}
            className="flex flex-col gap-4 p-4 sm:p-5 bg-white border border-gray-300 rounded-lg 
            md:p-8 md:max-w-5xl md:mx-auto lg:p-10 lg:max-w-6xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center gap-2">
              <h4 className="text-sm md:text-lg font-semibold truncate">
                Custom Citra Cake
              </h4>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary text-xs md:text-lg font-semibold shrink-0"
              >
                Belum Bayar
              </motion.p>
            </div>

            {/* PRODUCT */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
              <div className="flex gap-3 md:gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex p-1 rounded border border-gray-300 shrink-0"
                >
                  <img
                    src={data1.image}
                    alt={data1.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded object-cover"
                  />
                </motion.div>

                <div className="flex flex-col justify-center gap-1 min-w-0">
                  <h2 className="text-sm md:text-lg font-medium truncate">
                    {data1.title}
                  </h2>
                  <p className="text-[10px] md:text-sm text-gray-400">
                    Putih, Merah
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 sm:gap-2 pl-19 sm:pl-0">
                <p className="text-xs md:text-base">x1</p>
                <p className="text-xs md:text-base font-medium">
                  Rp {data1.price}
                </p>
                <p className="text-[11px] md:text-base text-gray-600">
                  Total 1 Produk: Rp {data1.price}
                </p>
              </div>
            </div>

            {/* INFO */}
            <motion.div {...buttonMotion} whileHover="hover" whileTap="tap">
              <Button className="bg-purple-50 text-gray-800 text-xs sm:text-sm md:text-base md:py-6 w-full hover:text-white cursor-pointer">
                Ayo bayar sekarang!
              </Button>
            </motion.div>

            {/* ACTION */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <motion.div {...buttonMotion} whileHover="hover" whileTap="tap">
                <Button className="text-gray-800 bg-white border border-gray-300 w-full sm:w-fit md:px-6 md:py-6 cursor-pointer hover:text-white">
                  Rincian Pesanan
                </Button>
              </motion.div>

              <div className="flex gap-2">
                <motion.div
                  {...buttonMotion}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 sm:flex-initial"
                >
                  <Button className="text-primary bg-purple-50 w-full sm:w-fit md:px-6 md:py-6 cursor-pointer hover:text-white">
                    Batalkan Pesanan
                  </Button>
                </motion.div>

                <motion.div
                  {...buttonMotion}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 sm:flex-initial"
                >
                  <Button
                    onClick={() => setIsUploadOpen(true)}
                    className="bg-primary text-white w-full sm:w-fit md:px-6 md:py-6 cursor-pointer text-xs sm:text-sm"
                  >
                    Upload Bukti
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= REKOMENDASI ================= */}
        <motion.div variants={cardVariant} className="flex flex-col gap-3">
          <div className="flex justify-center">
            <h3 className="text-sm md:text-base font-semibold text-gray-700">
              Rekomendasi untuk kamu
            </h3>
          </div>

          <motion.div
            variants={rekomendasiContainer}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5"
          >
            {rekomendasi.map((item) => (
              <motion.div
                key={item.id}
                variants={rekomendasiItem}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white border border-gray-200 rounded-lg p-2 flex flex-col gap-2 
                cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square rounded object-cover"
                />
                <p className="text-[11px] md:text-xs line-clamp-2 text-gray-700">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ================= MODAL ================= */}
      <UploadBuktiSampaiModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        orderId="ORD003"
        onSubmit={handleUploadSubmit}
      />
    </>
  );
};

export default BelumBayarPage;
