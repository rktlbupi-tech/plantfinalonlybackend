import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../data/store/useAuthStore";
import axios from "axios";
import { Search, Shield, ShieldOff, UserX, UserCheck } from "lucide-react";
import toast from "react-hot-toast";

const AdminUsers = () => {
    const { token } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleToggleBlock = async (userId, currentStatus) => {
        try {
            await axios.post(
                `http://localhost:4000/api/v1/admin/toggle-block/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`User ${currentStatus ? "unblocked" : "blocked"} successfully`);
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error("Error toggling block status:", error);
            toast.error(error.response?.data?.message || "Failed to update user status");
        }
    };

    const filteredUsers = users.filter(user =>
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendorProducts, setVendorProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);

    const fetchVendorProducts = async (vendorId) => {
        setProductsLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/admin/vendor-products/${vendorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVendorProducts(response.data.data);
            setSelectedVendor(vendorId);
        } catch (error) {
            console.error("Error fetching vendor products:", error);
            toast.error("Failed to fetch vendor products");
        } finally {
            setProductsLoading(false);
        }
    };

    const closeProductModal = () => {
        setSelectedVendor(null);
        setVendorProducts([]);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600">Manage user access and roles</p>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B] focus:border-transparent"
                    />
                </div>
            </div>

            {/* Users List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#26A66B]"></div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600">User</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Role</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#26A66B] font-bold">
                                                    {user.fullname?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.fullname}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'vendor' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${!user.isBlocked ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                }`}>
                                                {!user.isBlocked ? "Active" : "Blocked"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            {user.role === 'vendor' && (
                                                <button
                                                    onClick={() => fetchVendorProducts(user._id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Products"
                                                >
                                                    <Search size={20} />
                                                </button>
                                            )}
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                                                    className={`p-2 rounded-lg transition-colors ${user.isBlocked
                                                        ? "text-green-600 hover:bg-green-50"
                                                        : "text-red-600 hover:bg-red-50"
                                                        }`}
                                                    title={user.isBlocked ? "Unblock User" : "Block User"}
                                                >
                                                    {user.isBlocked ? <UserCheck size={20} /> : <UserX size={20} />}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Vendor Products Modal */}
            {selectedVendor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Vendor Products</h2>
                            <button onClick={closeProductModal} className="text-gray-500 hover:text-gray-700">
                                <UserX size={24} className="transform rotate-45" /> {/* Using UserX as close icon for now */}
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {productsLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#26A66B]"></div>
                                </div>
                            ) : vendorProducts.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    No products found for this vendor.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {vendorProducts.map((product) => (
                                        <div key={product._id} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <img
                                                src={product.images[0] || "https://via.placeholder.com/150"}
                                                alt={product.name}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-[#26A66B]">${product.price}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${product.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {product.isApproved ? 'Approved' : 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
