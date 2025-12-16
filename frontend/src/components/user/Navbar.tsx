import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Menu, Search, ShoppingCart, MessageSquareText, X } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "../common/Mode_Toggle";
import { Link } from "react-router";

const Navbar = ({
  onToggleSidebar,
  isSidebarOpen,
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between px-4 py-3 shadow-sm "
    >
      {/* === Hamburger (Desktop Only) === */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onToggleSidebar}
          className="hidden lg:flex items-center justify-center cursor-pointer bg-primary 
          text-white p-2 rounded-xl border border-primary shadow-smtransition-all 
          duration-200hover:bg-purple-700 hover:shadow-md hover:scale-[1.05]active:scale-95
          "
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* === Search Bar === */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative w-full max-w-xs lg:max-w-sm mx-4"
      >
        <Input
          type="search"
          placeholder="Search"
          className="bg-purple-200 text-black placeholder:text-gray-600 pr-10"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
      </motion.div>

      {/* === Right Buttons === */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ModeToggle />
        </motion.div>
        <Link to={"/cart"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full transition cursor-pointer hover:bg-purple-300 hover:scale-[1.05] active:scale-95"
          >
            <ShoppingCart className="text-primary w-6 h-6" />
          </motion.button>
        </Link>

        <Link to={"/chat-bot"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full transition cursor-pointer hover:bg-purple-300 hover:scale-[1.05] active:scale-95"
          >
            <MessageSquareText className="text-primary w-6 h-6" />
          </motion.button>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
