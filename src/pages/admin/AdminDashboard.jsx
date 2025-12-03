import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../data/store/useProductStore";
import { useOrderStore } from "../../data/store/useOrderStore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();
  const { orders, fetchAllOrders } = useOrderStore();

  useEffect(() => {
    fetchProducts();
    fetchAllOrders();
  }, [fetchProducts, fetchAllOrders]);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    processingOrders: orders.filter(o => o.status === "processing").length,
    shippedOrders: orders.filter(o => o.status === "shipped").length,
    deliveredOrders: orders.filter(o => o.status === "delivered").length,
    cancelledOrders: orders.filter(o => o.status === "cancelled").length,
    totalRevenue: orders
      .filter(o => o.status === "delivered")
      .reduce((sum, o) => sum + o.totalAmount, 0),
    lowStock: products.filter(p => p.stock < 10).length
  };

  const recentOrders = orders.slice(0, 5);

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 ${onClick ? "" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color || "text-gray-800"}`}>
            {value}
          </p>
        </div>
        <div className={`text-4xl ${color || "text-gray-400"}`}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="🌱"
          color="text-green-600"
          onClick={() => navigate("/admin/products")}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          color="text-blue-600"
          onClick={() => navigate("/admin/orders")}
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon="⏳"
          color="text-orange-600"
          onClick={() => navigate("/admin/orders")}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon="💰"
          color="text-green-600"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Processing"
          value={stats.processingOrders}
          icon="⚙️"
          color="text-blue-500"
        />
        <StatCard
          title="Shipped"
          value={stats.shippedOrders}
          icon="🚚"
          color="text-purple-600"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStock}
          icon="⚠️"
          color="text-red-600"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-[#26A66B] hover:text-[#1e8555] font-medium"
          >
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">#{order._id.slice(-6)}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{order.user?.fullname || "Unknown"}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{order.products?.length || 0} item(s)</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "pending" ? "bg-orange-100 text-orange-800" :
                        order.status === "processing" ? "bg-blue-100 text-blue-800" :
                          order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                            order.status === "delivered" ? "bg-green-100 text-green-800" :
                              "bg-red-100 text-red-800"
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

