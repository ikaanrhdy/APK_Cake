import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router";

export type AdminLayoutContext = {
  onOpenSidebar: () => void;
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // implement real logout logic here
  };

  return (
    <div className="min-h-screen bg-background font-inter lg:grid lg:grid-cols-[256px_1fr]">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Content */}
      <div className="flex flex-col">
        <main className="flex-1 p-4 md:p-6">
          <Outlet context={{ onOpenSidebar: () => setSidebarOpen(true) }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
