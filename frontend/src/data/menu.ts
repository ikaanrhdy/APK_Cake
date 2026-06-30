import { LayoutDashboard, Package, LogOut } from "lucide-react";

export const menus = [
  { name: "Home", path: "/admin", icon: LayoutDashboard },
  { name: "Product", path: "/admin/product", icon: Package },
  {
    name: "Bahan Kustomisasi",
    path: "/admin/kustomisasi",
    icon: undefined,
    iconUrl: "/icon/Kustomisasi.svg",
  },
];

export const logoutMenu = { name: "Log Out", icon: LogOut };
