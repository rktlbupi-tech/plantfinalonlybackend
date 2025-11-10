import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddItems from "../pages/admin/AddItems";
import TrackOrders from "../pages/admin/TrackOrders";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AddItems />} />
        <Route path="orders" element={<TrackOrders />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

