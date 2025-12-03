import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../data/store/useProductStore";
import { useAuthStore } from "../../data/store/useAuthStore";
import { Plus, Edit, Trash2, Search, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const MyPlants = () => {
    const navigate = useNavigate();
    const { products, fetchProducts, deleteProduct, loading } = useProductStore();
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddPlant = () => {
        if (!user.isVerified) {
            toast.error("Your account is under verification. You cannot add products yet.");
            return;
        }
        navigate("/vendor/add-product");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this plant?")) {
            const success = await deleteProduct(id);
            if (success) {
                toast.success("Plant deleted successfully");
            } else {
                toast.error("Failed to delete plant");
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Plants</h1>
                    <p className="text-gray-600">Manage your product listings</p>
                </div>
                <button
                    onClick={handleAddPlant}
                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm ${!user.isVerified
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-[#26A66B] hover:bg-[#1e8555] text-white"
                        }`}
                >
                    <Plus size={20} /> Add New Plant
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search your plants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A66B] focus:border-transparent"
                    />
                </div>
            </div>

            {/* Products List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#26A66B]"></div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No plants listed yet</h3>
                    <p className="text-gray-500 mb-6">Start selling by adding your first plant!</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Product</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Stock</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Approval</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.images?.[0] || "https://via.placeholder.com/40"}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <span className="font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">${product.price}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isApproved
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {product.isApproved ? "Approved" : "Pending"}
                                                {!product.isApproved && <AlertCircle size={12} />}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 0 ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                                                }`}>
                                                {product.stock > 0 ? "Active" : "Out of Stock"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPlants;
