import { Link } from "react-router";
import { motion } from "framer-motion";

// icons
import { CircleUser, Settings, Bot, Share2 } from "lucide-react";
import { IoReceiptOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";

interface ProfileType {
  id: number;
  name: string;
  email: string;
}

const profile: ProfileType = {
  id: 1,
  name: "Ika Nur Hidayati",
  email: "hidayatiikanur58@gmail.com",
};

const Profile = () => {
  const data = profile;

  const menu = [
    {
      name: "Pesanan Saya",
      icon: <IoReceiptOutline size={20} />,
      path: "/order",
    },
    {
      name: "Keranjang Saya",
      icon: <FaCartShopping size={20} />,
      path: "/cart",
    },
    {
      name: "Pengaturan Akun",
      icon: <Settings size={20} />,
      path: "/profile/settings",
    },
    {
      name: "Pusat Banyuan",
      icon: <IoMdHelpCircleOutline size={20} />,
      path: "/help",
    },
    { name: "Chat dengan Citra", icon: <Bot size={20} />, path: "/chat-bot" },
    {
      name: "Bagikan Aplikasi",
      icon: <Share2 size={20} />,
      path: "/share-app",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        flex flex-col space-y-8
        md:max-w-3xl md:mx-auto
        lg:max-w-5xl
      "
    >
      {/* === PROFILE HEADER === */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="
          flex flex-row space-x-4 justify-center items-start
          bg-white p-4
          md:rounded-xl md:shadow-sm
          lg:justify-between lg:px-8
        "
      >
        <div className="flex">
          <CircleUser size={60} />
        </div>

        <div className="flex flex-col space-y-5 flex-1">
          <div className="flex flex-col space-y-0">
            {data && (
              <>
                <h5 className="text-sm font-medium font-serif">{data.name}</h5>
                <h5 className="text-xs font-medium font-serif">{data.email}</h5>
              </>
            )}
          </div>

          <Link
            to="/edit-profile"
            className="
              text-[#5F2C7A] font-serif cursor-pointer w-fit px-2 py-1 rounded transition-all 
              duration-200 hover:text-white hover:bg-[#825a97]/80 hover:shadow-sm
            "
          >
            Edit Profile
          </Link>
        </div>

        <Link
          to="/badge"
          className="
          flex bg-linear-to-b from-[#D77C43] to-[#E6C5B0]
          px-5 py-2 items-center rounded-md text-black
          md:self-center
        "
        >
          <h6 className="text-xs">Level 2 baker</h6>
        </Link>
      </motion.div>

      {/* === MENU LIST === */}
      <div
        className="
          flex flex-col space-y-4
          md:grid md:grid-cols-2 md:gap-4 md:space-y-0
          lg:grid-cols-3
        "
      >
        {menu.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={item.path}
              className="
                flex bg-white py-6 px-2 space-x-3 rounded-sm
                hover:shadow-md transition
              "
            >
              <div className="text-primary">{item.icon}</div>
              <h5 className="text-sm font-medium font-serif">{item.name}</h5>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Profile;
