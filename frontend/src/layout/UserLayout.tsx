import { Outlet } from "react-router";
import Footer from "../components/user/Footer";
import Navbar from "../components/user/Navbar";
import Sidebar from "../components/user/Sidebar";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const UserLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Navbar */}
      <Navbar
        onToggleSidebar={() => setOpenSidebar(!openSidebar)}
        isSidebarOpen={openSidebar}
      />

      <div className="flex flex-1 w-full relative">
        {/* === Sidebar Desktop (Animated) === */}
        <AnimatePresence mode="wait">
          {openSidebar && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="hidden lg:block bg-white shadow-md border-r overflow-hidden"
            >
              <Sidebar />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* === Sidebar Mobile === */}
        <AnimatePresence>
          {openSidebar && (
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50"
            >
              <Sidebar onClose={() => setOpenSidebar(false)} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* === Overlay Mobile === */}
        <AnimatePresence>
          {openSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black lg:hidden z-40"
              onClick={() => setOpenSidebar(false)}
            />
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 lg:p-6 ">
          <Outlet />
        </main>
      </div>

      {/* Footer mobile */}
      <div className="block lg:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
