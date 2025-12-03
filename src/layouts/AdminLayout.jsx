import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useProductStore } from "../data/store/useProductStore";
import { useOrderStore } from "../data/store/useOrderStore";
import { useAuthStore } from "../data/store/useAuthStore";
import { LayoutDashboard, PlusCircle, Package, LogOut, Menu, X, Users, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useAuthStore();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error("Access denied. Admin only.");
      navigate("/auth/login");
    }
  }, [user, navigate]);

  const { products } = useProductStore();
  const { orders } = useOrderStore();

  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const totalRevenue = orders
    .filter(o => o.status === "delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    // { path: "/admin/products", label: "Add Items", icon: <PlusCircle size={20} /> }, // Removed for Admin
    { path: "/admin/orders", label: "Track Orders", icon: <Package size={20} /> },
    { path: "/admin/approvals", label: "Approvals", icon: <CheckCircle size={20} /> },
    { path: "/admin/users", label: "Users", icon: <Users size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transition-all duration-300 transform ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            {sidebarOpen ? (
              <span className="text-xl font-bold text-[#26A66B]">Admin Panel</span>
            ) : (
              <span className="text-xl font-bold text-[#26A66B] mx-auto">A</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}>
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#26A66B] font-bold">
                {user?.fullname?.charAt(0) || "A"}
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <p className="font-medium text-gray-800 truncate">{user?.fullname || "Admin"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 py-4 space-y-1 px-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${isActive(item.path)
                  ? "bg-[#26A66B] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#26A66B]"
                  } ${!sidebarOpen && "justify-center"}`}
              >
                {item.icon}
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          {sidebarOpen && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Products:</span>
                  <span className="font-semibold">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-semibold text-orange-600">{pendingOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-semibold text-green-600">${totalRevenue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all ${!sidebarOpen && "justify-center"
                }`}
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Mobile Header */}
        <header className="h-16 bg-white shadow-sm flex items-center px-4 lg:hidden sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-semibold text-gray-800">Admin Dashboard</span>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;

