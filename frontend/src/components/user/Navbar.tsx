import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Menu, ShoppingCart, X, MessageCircle, Search } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useProductStore } from "@/app/store/useProduct";
import SearchResult from "./SearchBar";

const Navbar = ({
  onToggleSidebar,
  isSidebarOpen,
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  const { inputSearch, setSearch } = useProductStore();
  const [isOpen, setIsOpen] = useState(false); // state kontrol dropdown
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between px-4 py-3 shadow-sm"
    >
      {/* Hamburger */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onToggleSidebar}
          className="flex items-center justify-center cursor-pointer bg-white text-primary p-2 rounded-md shadow-sm transition-all duration-200 hover:bg-purple-200 hover:shadow-md hover:scale-[1.05] active:scale-95"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative w-full max-w-xs lg:max-w-sm mx-4 "
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

        <Input
          ref={inputRef}
          type="search"
          value={inputSearch}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search"
          className="bg-white text-black placeholder:text-gray-600 pl-9 pr-10"
        />

        {/* Pass state dan setter ke SearchResult */}
        <SearchResult
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputRef={inputRef}
        />
      </motion.div>

      {/* Right Buttons */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <Link to={"/cart"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md bg-white shadow-sm transition cursor-pointer hover:bg-purple-200 hover:scale-[1.05] active:scale-95"
          >
            <ShoppingCart className="text-primary w-6 h-6" />
          </motion.button>
        </Link>

        <Link to={"/chat-bot"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md bg-white shadow-sm transition cursor-pointer hover:bg-purple-200 hover:scale-[1.05] active:scale-95"
          >
            <MessageCircle className="text-primary w-6 h-6" />
          </motion.button>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
