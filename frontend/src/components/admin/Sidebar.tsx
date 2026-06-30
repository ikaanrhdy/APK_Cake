import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { menus, logoutMenu } from "@/data/menu";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
};

const mobileVariants = {
  hidden: { x: "-100%" },
  show: { x: 0 },
};

const Sidebar = ({ isOpen, onClose, onLogout }: Props) => {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent onLogout={onLogout} />
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            <motion.aside
              variants={mobileVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed z-50 w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col lg:hidden"
            >
              <SidebarContent onClose={onClose} onLogout={onLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

// ================= SidebarContent.tsx =================
const SidebarContent = ({
  onClose,
  onLogout,
}: {
  onClose?: () => void;
  onLogout?: () => void;
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login-admin");
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Top: Logo + Menu */}
      <div>
        <div className="h-16 flex items-center px-6 text-xl font-semibold text-primary">
          Admin Citra
        </div>

        <nav className="px-2 space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            console.log(menu.name, { Icon, iconUrl: menu.iconUrl });
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
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md 
                      text-sm font-medium transition relative 
                      ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-foreground"}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-primary"
                      />
                    )}

                    {Icon ? (
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                      />
                    ) : (
                      <img
                        src={menu.iconUrl}
                        className="w-4 h-4"
                        alt={menu.name}
                      />
                    )}

                    <span>{menu.name}</span>
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom: LogOut + Footer */}
      <div className="px-2 mb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-red-500 hover:text-white transition cursor-pointer"
        >
          <logoutMenu.icon className="w-4 h-4" />
          <span>{logoutMenu.name}</span>
        </button>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          © 2025 Admin
        </div>
      </div>
    </div>
  );
};
