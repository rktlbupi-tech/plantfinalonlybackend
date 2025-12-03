import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
// import AddItems from "../pages/admin/AddItems"; // Removed
import TrackOrders from "../pages/admin/TrackOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminApprovals from "../pages/admin/AdminApprovals";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* <Route path="products" element={<AddItems />} /> */}
        <Route path="orders" element={<TrackOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="approvals" element={<AdminApprovals />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
