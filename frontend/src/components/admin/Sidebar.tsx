import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, Wallet, BarChart3 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const menus = [
  {
    name: "Home",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Product",
    path: "/admin/product",
    icon: Package,
  },
  {
    name: "Penjualan",
    path: "/admin/finance",
    icon: Wallet,
  },
  {
    name: "Analitik",
    path: "/admin/analytics",
    icon: BarChart3,
  },
];

const mobileVariants = {
  hidden: { x: "-100%" },
  show: { x: 0 },
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent />
      </aside>

      {/* ================= MOBILE ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              variants={mobileVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed z-50 w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col lg:hidden"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

/* ================= CONTENT ================= */
const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  return (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 text-xl font-semibold text-primary">
        Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              end
              onClick={onClose}
              className="relative block"
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-md
                    text-sm font-medium transition relative
                    ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-foreground"
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-primary"
                    />
                  )}

                  {/* Icon */}
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                  />

                  {/* Label */}
                  <span>{menu.name}</span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-muted-foreground">© 2025 Admin</div>
    </>
  );
};
