import { Menu } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onToggle: () => void;
};

const Navbar = ({ onToggle }: Props) => {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="h-16 bg-card border-b border-border flex items-center gap-4 px-4 lg:px-6"
    >
      {/* Hamburger */}
      <button
        onClick={onToggle}
        className="lg:hidden p-2 rounded-md hover:bg-muted transition"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-lg font-semibold">Dashboard</h1>
    </motion.header>
  );
};

export default Navbar;
