import { RiQrScan2Line, RiWalletLine } from "react-icons/ri";
import { BsBank } from "react-icons/bs";
import { IoIosWallet } from "react-icons/io";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Payment = () => {
  const data = [
    {
      name: "E-Wallet",
      icon: <IoIosWallet size={30} />,
      path: "/wallet",
    },
    {
      name: "QR Code",
      icon: <RiQrScan2Line size={30} />,
      path: "/qr-code",
    },
    {
      name: "Kirim Ke Bank",
      icon: <BsBank size={30} />,
      path: "/bank-transfer",
    },
  ];

  return (
    <div className="flex flex-col space-y-4 px-4 md:px-8 lg:px-16">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-medium font-serif"
      >
        Dompet
      </motion.h1>

      {/* Saldo Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col bg-[#DFA9F8] w-full max-w-xs p-4 shadow-md shadow-black/40 md:flex-row md:justify-between md:items-center md:max-w-full md:w-auto md:p-6 rounded-lg"
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2">
            <RiWalletLine className="w-5 h-5" />
            <h5 className="text-xs md:text-sm font-medium font-serif">Saldo</h5>
          </div>
          <h3 className="font-serif text-sm md:text-lg pt-2 md:pt-0">
            Rp. 2.895.679
          </h3>
        </div>

        {/* Icon besar di desktop */}
        <div className="hidden md:flex items-center justify-end">
          <RiWalletLine className="w-12 h-12 text-purple-700 opacity-30" />
        </div>
      </motion.div>

      {/* Payment Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-row flex-wrap justify-center items-center gap-8 py-2 border-2 border-gray-300 bg-white rounded-lg"
      >
        {data.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center cursor-pointer"
          >
            <Link to={item.path} className="flex flex-col items-center">
              <div className="text-primary md:text-purple-700">{item.icon}</div>
              <h5 className="text-xs md:text-sm font-medium font-serif">
                {item.name}
              </h5>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Payment;
