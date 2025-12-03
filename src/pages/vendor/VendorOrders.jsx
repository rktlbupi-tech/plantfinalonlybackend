import React, { useEffect } from "react";
import { useOrderStore } from "../../data/store/useOrderStore";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const VendorOrders = () => {
    const { orders, fetchAllOrders, updateOrderStatus, loading } = useOrderStore();

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        const success = await updateOrderStatus(orderId, newStatus);
        if (success) {
            toast.success(`Order status updated to ${newStatus}`);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800";
            case "processing": return "bg-blue-100 text-blue-800";
            case "shipped": return "bg-purple-100 text-purple-800";
            case "delivered": return "bg-green-100 text-green-800";
            case "cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Orders</h1>
            <p className="text-gray-600 mb-8">Manage and track your customer orders</p>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#26A66B]"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500">When customers buy your plants, orders will appear here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <p className="text-gray-500">Order ID</p>
                                        <p className="font-medium text-gray-900">#{order._id.slice(-6)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Date</p>
                                        <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Customer</p>
                                        <p className="font-medium text-gray-900">{order.user?.fullname || "Unknown"}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Total Amount</p>
                                        <p className="font-medium text-gray-900">${order.totalAmount}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-[#26A66B] focus:ring focus:ring-[#26A66B] focus:ring-opacity-50"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
                                    <p className="text-sm text-gray-600">
                                        {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}, {order.shippingAddress?.country}
                                    </p>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
                                    {order.products?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 py-2">
                                            <img
                                                src={item.product?.images?.[0] || "https://via.placeholder.com/60"}
                                                alt={item.product?.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{item.product?.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">${item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorOrders;
