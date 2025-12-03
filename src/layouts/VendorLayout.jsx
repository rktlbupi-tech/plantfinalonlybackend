import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../data/store/useAuthStore";
import { LayoutDashboard, Leaf, ShoppingBag, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";

const VendorLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logout, user } = useAuthStore();

    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            toast.error("Access denied. Vendor only.");
            navigate("/auth/login");
        }
    }, [user, navigate]);

    const menuItems = [
        { path: "/vendor/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/vendor/products", label: "My Plants", icon: <Leaf size={20} /> },
        { path: "/vendor/add-product", label: "Add Plant", icon: <Leaf size={20} /> },
        { path: "/vendor/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
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
                            <span className="text-xl font-bold text-[#26A66B]">Vendor Panel</span>
                        ) : (
                            <span className="text-xl font-bold text-[#26A66B] mx-auto">V</span>
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
                                {user?.fullname?.charAt(0) || "V"}
                            </div>
                            {sidebarOpen && (
                                <div className="overflow-hidden">
                                    <p className="font-medium text-gray-800 truncate">{user?.fullname}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
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
                    <span className="ml-4 font-semibold text-gray-800">Vendor Dashboard</span>
                </header>

                <main className="p-6">
                    {!user?.isVerified && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <span className="font-bold">Account Under Verification:</span> Your account is currently pending approval from the administrator. You can add products, but they will not be visible to customers until your account is verified.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <Outlet />
                </main>
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

export default VendorLayout;
