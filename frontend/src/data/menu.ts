import { Home, Package, Sparkles, LogOut } from "lucide-react";
import type { AdminRole } from "./adminData";

export interface MenuItem {
  name: string;
  path: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconUrl?: string;
  roles: AdminRole[];
}

export const menus: MenuItem[] = [
  {
    name: "Home",
    path: "/admin",
    icon: Home,
    roles: ["owner", "admin"],
  },
  {
    name: "Produk",
    path: "/admin/product",
    icon: Package,
    roles: ["admin"],
  },
  {
    name: "Order",
    path: "/admin/order",
    icon: Package,
    roles: ["admin"],
  },
  {
    name: "Bahan Kustomisasi",
    path: "/admin/kustomisasi",
    icon: Sparkles,
    roles: ["admin"],
  },
];

export const logoutMenu = {
  name: "Logout",
  icon: LogOut,
};
