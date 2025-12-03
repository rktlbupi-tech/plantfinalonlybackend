import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, User, Package, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const AdminApprovals = () => {
    const [pendingVendors, setPendingVendors] = useState([]);
    const [pendingProducts, setPendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("vendors");

    const fetchPendingApprovals = async () => {
        try {
            const token = localStorage.getItem("auth-storage")
                ? JSON.parse(localStorage.getItem("auth-storage")).state.token
                : null;

            const response = await axios.get("http://localhost:4000/api/v1/admin/pending-approvals", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPendingVendors(response.data.data.vendors);
            setPendingProducts(response.data.data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching approvals:", error);
            toast.error("Failed to fetch pending approvals");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingApprovals();
    }, []);

    const handleApproveVendor = async (id) => {
        try {
            const token = localStorage.getItem("auth-storage")
                ? JSON.parse(localStorage.getItem("auth-storage")).state.token
                : null;

            await axios.post(`http://localhost:4000/api/v1/admin/approve-vendor/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPendingVendors(pendingVendors.filter(v => v._id !== id));
            toast.success("Vendor approved successfully");
        } catch (error) {
            toast.error("Failed to approve vendor");
        }
    };

    const handleApproveProduct = async (id) => {
        try {
            const token = localStorage.getItem("auth-storage")
                ? JSON.parse(localStorage.getItem("auth-storage")).state.token
                : null;

            await axios.post(`http://localhost:4000/api/v1/admin/approve-product/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPendingProducts(pendingProducts.filter(p => p._id !== id));
            toast.success("Product approved successfully");
        } catch (error) {
            toast.error("Failed to approve product");
        }
    };

    const handleRejectProduct = async (id) => {
        if (window.confirm("Reject and delete this product?")) {
            try {
                const token = localStorage.getItem("auth-storage")
                    ? JSON.parse(localStorage.getItem("auth-storage")).state.token
                    : null;

                await axios.delete(`http://localhost:4000/api/v1/product/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setPendingProducts(pendingProducts.filter(p => p._id !== id));
                toast.success("Product rejected and deleted");
            } catch (error) {
                toast.error("Failed to reject product");
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Approvals</h1>

            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("vendors")}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === "vendors"
                        ? "text-[#26A66B] border-b-2 border-[#26A66B]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Pending Vendors ({pendingVendors.length})
                </button>
                <button
                    onClick={() => setActiveTab("products")}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === "products"
                        ? "text-[#26A66B] border-b-2 border-[#26A66B]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Pending Products ({pendingProducts.length})
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#26A66B]"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {activeTab === "vendors" ? (
                        pendingVendors.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No pending vendor approvals.</p>
                        ) : (
                            pendingVendors.map((vendor) => (
                                <div key={vendor._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{vendor.fullname}</h3>
                                            <p className="text-sm text-gray-500">{vendor.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApproveVendor(vendor._id)}
                                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                            title="Approve Vendor"
                                        >
                                            <Check size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        pendingProducts.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No pending product approvals.</p>
                        ) : (
                            pendingProducts.map((product) => (
                                <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={product.images?.[0] || "https://via.placeholder.com/40"}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-500">Seller: {product.seller?.fullname || "Unknown"}</p>
                                            <p className="text-sm text-gray-500">${product.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApproveProduct(product._id)}
                                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                            title="Approve Product"
                                        >
                                            <Check size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleRejectProduct(product._id)}
                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                            title="Reject Product"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminApprovals;
