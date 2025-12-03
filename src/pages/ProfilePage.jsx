import React, { useEffect, useState } from "react";
import { useAuthStore } from "../data/store/useAuthStore";
import { useOrderStore } from "../data/store/useOrderStore";
import { useNavigate } from "react-router-dom";
import { Package, User, LogOut, MapPin, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { user, logout, updateProfile } = useAuthStore();
    const { orders, fetchMyOrders, loading: ordersLoading } = useOrderStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("orders");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
            return;
        }
        fetchMyOrders();
    }, [user, navigate, fetchMyOrders]);

    const handleLogout = () => {
        logout();
        navigate("/auth/login");
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const updatedAddresses = [...(user.addresses || []), newAddress];
        const success = await updateProfile({ addresses: updatedAddresses });
        if (success) {
            setShowAddressForm(false);
            setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
        }
    };

    const handleDeleteAddress = async (index) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            const updatedAddresses = user.addresses.filter((_, i) => i !== index);
            await updateProfile({ addresses: updatedAddresses });
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#26A66B] text-2xl font-bold mb-3">
                                    {user.fullname?.charAt(0)}
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{user.fullname}</h2>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                {user.role === 'vendor' && !user.isVerified && (
                                    <span className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                        Verification Pending
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "orders" ? "bg-[#E8F5E9] text-[#26A66B]" : "text-gray-600 hover:bg-gray-50"}`}
                                >
                                    <Package size={20} /> My Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab("addresses")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "addresses" ? "bg-[#E8F5E9] text-[#26A66B]" : "text-gray-600 hover:bg-gray-50"}`}
                                >
                                    <MapPin size={20} /> My Addresses
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-4"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === "orders" ? (
                            <>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
                                {ordersLoading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#26A66B]"></div>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-6">Start shopping to fill your home with green!</p>
                                        <button
                                            onClick={() => navigate("/")}
                                            className="bg-[#26A66B] text-white px-6 py-2 rounded-lg hover:bg-[#1e8555] transition-colors"
                                        >
                                            Browse Plants
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                                <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                                    <div className="flex gap-6 text-sm">
                                                        <div>
                                                            <p className="text-gray-500">Order Placed</p>
                                                            <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Total</p>
                                                            <p className="font-medium text-gray-900">${order.totalAmount}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Status</p>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    {order.products?.map((item, index) => (
                                                        <div key={index} className="flex items-center gap-4 py-2">
                                                            <img
                                                                src={item.product?.images?.[0] || "https://via.placeholder.com/60"}
                                                                alt={item.product?.name || "Product"}
                                                                className="w-16 h-16 object-cover rounded-md"
                                                            />
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-gray-900">{item.product?.name || "Unknown Product"}</h4>
                                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                            </div>
                                                            <p className="font-medium text-gray-900">${item.price}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-800">My Addresses</h1>
                                    <button
                                        onClick={() => setShowAddressForm(!showAddressForm)}
                                        className="flex items-center gap-2 bg-[#26A66B] text-white px-4 py-2 rounded-lg hover:bg-[#1e8555] transition-colors"
                                    >
                                        <Plus size={18} /> Add Address
                                    </button>
                                </div>

                                {showAddressForm && (
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                                        <h3 className="font-bold text-gray-800 mb-4">Add New Address</h3>
                                        <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Street Address"
                                                value={newAddress.street}
                                                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                className="col-span-2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B]"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B]"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B]"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="ZIP Code"
                                                value={newAddress.zip}
                                                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                                                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B]"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Country"
                                                value={newAddress.country}
                                                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B]"
                                                required
                                            />
                                            <div className="col-span-2 flex justify-end gap-3 mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddressForm(false)}
                                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 bg-[#26A66B] text-white rounded-lg hover:bg-[#1e8555]"
                                                >
                                                    Save Address
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {user.addresses?.map((addr, index) => (
                                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-[#26A66B] mt-1" size={20} />
                                                <div>
                                                    <p className="font-medium text-gray-900">{addr.street}</p>
                                                    <p className="text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                                                    <p className="text-gray-600">{addr.country}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteAddress(index)}
                                                className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                    {(!user.addresses || user.addresses.length === 0) && !showAddressForm && (
                                        <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                            <p className="text-gray-500">No addresses saved yet.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
