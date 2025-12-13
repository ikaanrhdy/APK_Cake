import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

// icons
import { CircleUser, CreditCard, House, ShoppingBag } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const menu = [
    { name: "Home", icon: <House size={20} />, path: "/home" },
    { name: "Cake", icon: <ShoppingBag size={20} />, path: "/product" },
    { name: "Payment", icon: <CreditCard size={20} />, path: "/payment" },
    { name: "Profile", icon: <CircleUser size={20} />, path: "/profile" },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col "
    >
      <div className="flex flex-row justify-center md:space-x-10 sm:space-x-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 font-medium rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-purple-300 text-purple-900 shadow-md"
                      : "text-purple-900 hover:bg-purple-200"
                  }
                `}
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Footer;
