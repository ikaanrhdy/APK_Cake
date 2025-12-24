import { LayoutDashboard, Package, Wallet, BarChart3, LogOut } from "lucide-react";

export const menus = [
  { name: "Home", path: "/admin", icon: LayoutDashboard },
  { name: "Product", path: "/admin/product", icon: Package },
  { name: "Penjualan", path: "/admin/finance", icon: Wallet },
  { name: "Analitik", path: "/admin/analytics", icon: BarChart3 },
];

export const logoutMenu = { name: "Log Out", icon: LogOut };
