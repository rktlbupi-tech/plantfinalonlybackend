import React, { useState, useEffect } from "react";
import { useCartStore } from "../data/store/useCartStore";
import { useAuthStore } from "../data/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, CheckCircle, Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const CheckoutPage = () => {
    const { cart, getCartTotal, clearCart } = useCartStore();
    const { user, updateProfile, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user) {
            toast.error("Please login to checkout");
            navigate("/login");
        }
    }, [isAuthenticated, user, navigate]);

    if (!isAuthenticated || !user) {
        return null; // or a loading spinner while redirecting
    }
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });

    const cartTotal = getCartTotal();
    const shipping = 10; // Flat rate shipping
    const total = cartTotal + shipping;

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const updatedAddresses = [...(user?.addresses || []), newAddress];
        const success = await updateProfile({ addresses: updatedAddresses });
        if (success) {
            setShowAddressForm(false);
            setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
            setSelectedAddress(updatedAddresses.length - 1); // Select the new address
        }
    };

    const handlePlaceOrder = async () => {
        if (!user?.addresses || user.addresses.length === 0) {
            toast.error("Please add a shipping address");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("auth-storage")
                ? JSON.parse(localStorage.getItem("auth-storage")).state.token
                : null;

            const orderData = {
                products: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: total,
                shippingAddress: user?.addresses?.[selectedAddress],
                paymentMethod: "Credit Card (Dummy)"
            };

            await axios.post("http://localhost:4000/api/v1/orders/create", orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Order placed successfully!");
            clearCart();
            navigate("/profile");
        } catch (error) {
            console.error("Order failed:", error);
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/")}
                    className="bg-[#26A66B] text-white px-6 py-2 rounded-full"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Address & Payment */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Address Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <MapPin className="text-[#26A66B]" /> Shipping Address
                                </h2>
                                <button
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="text-[#26A66B] font-medium text-sm flex items-center gap-1"
                                >
                                    <Plus size={16} /> Add New
                                </button>
                            </div>

                            {showAddressForm && (
                                <form onSubmit={handleAddAddress} className="mb-6 bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Street Address"
                                            value={newAddress.street}
                                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                            className="col-span-2 p-2 border rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            className="p-2 border rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={newAddress.state}
                                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            className="p-2 border rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="ZIP Code"
                                            value={newAddress.zip}
                                            onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                                            className="p-2 border rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            value={newAddress.country}
                                            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                            className="p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button type="button" onClick={() => setShowAddressForm(false)} className="text-gray-500">Cancel</button>
                                        <button type="submit" className="bg-[#26A66B] text-white px-4 py-1 rounded">Save</button>
                                    </div>
                                </form>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user?.addresses?.map((addr, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedAddress(index)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedAddress === index
                                            ? "border-[#26A66B] bg-green-50"
                                            : "border-gray-100 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-gray-900">{addr.street}</p>
                                                <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.zip}</p>
                                                <p className="text-sm text-gray-500">{addr.country}</p>
                                            </div>
                                            {selectedAddress === index && <CheckCircle className="text-[#26A66B]" size={20} />}
                                        </div>
                                    </div>
                                ))}
                                {(!user?.addresses || user.addresses.length === 0) && !showAddressForm && (
                                    <div className="col-span-full text-center py-8 text-gray-500">
                                        Please add a shipping address to proceed.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CreditCard className="text-[#26A66B]" /> Payment Method
                            </h2>
                            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-[#26A66B]"></div>
                                    <span className="font-medium text-gray-800">Credit Card (Simulated)</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 ml-7">
                                    This is a dummy payment for demonstration purposes. No actual charge will be made.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                        <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || !user?.addresses || user.addresses.length === 0}
                                className={`w-full py-3 rounded-lg font-bold text-white transition-all ${loading || !user?.addresses || user.addresses.length === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#26A66B] hover:bg-[#1e8555] shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
