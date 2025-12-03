import React from "react";
import { useAuthStore } from "../../data/store/useAuthStore";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

const VendorDashboard = () => {
    const { user } = useAuthStore();

    // Mock data - replace with real API calls later
    const stats = [
        { label: "Total Revenue", value: "$1,234", icon: <DollarSign size={24} />, color: "bg-green-100 text-green-600" },
        { label: "Total Orders", value: "45", icon: <ShoppingBag size={24} />, color: "bg-blue-100 text-blue-600" },
        { label: "Products Listed", value: "12", icon: <Package size={24} />, color: "bg-purple-100 text-purple-600" },
        { label: "Growth", value: "+15%", icon: <TrendingUp size={24} />, color: "bg-orange-100 text-orange-600" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.fullname}!</h1>
                <p className="text-gray-600">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-500">Last 30 days</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Charts could go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Recent Orders</h3>
                    <div className="text-center py-8 text-gray-500">
                        No recent orders to display.
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Top Products</h3>
                    <div className="text-center py-8 text-gray-500">
                        No product data available.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
