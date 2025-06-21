// src/routes/AdminRoutes.js
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./Dashboard";
import OrderAdmin from "./OrderAdmin";
import AdminStorage from "./Storage";
import UserStats from "./Users";


const AdminRoutes = [
  {
    path: "/admin",
    exact: true,
    component: AdminDashboard,
    layout: AdminLayout,
  },
  {
    path: "/admin/account",
    exact: true,
    component: UserStats,
    layout: AdminLayout,
  },
  {
    path: "/admin/order",
    exact: true,
    component: OrderAdmin,
    layout: AdminLayout,
  },
  {
    path: "/admin/storage",
    exact: true,
    component: AdminStorage,
    layout: AdminLayout,
  },
];

export default AdminRoutes;
