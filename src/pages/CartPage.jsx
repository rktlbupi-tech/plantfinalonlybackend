import React from "react";
import { useCartStore } from "../data/store/useCartStore";
import { useAuthStore } from "../data/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
    const { user, token } = useAuthStore();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            toast.error("Please login to checkout");
            navigate("/auth/login");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            // Create order logic here
            const orderData = {
                products: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                })),
                totalAmount: getCartTotal(),
                shippingAddress: user.address || {}, // Should prompt for address if missing
                paymentStatus: "pending"
            };

            // Call API to create order
            // await axios.post('/api/v1/orders/create', orderData, { headers: { Authorization: `Bearer ${token}` } });

            // For now, just simulate success
            toast.success("Order placed successfully! (Simulation)");
            clearCart();
            navigate("/profile");
        } catch (error) {
            toast.error("Failed to place order");
            console.error(error);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🛒</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any plants yet.</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-[#26A66B] hover:bg-[#1e8555] text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.images?.[0] || "https://via.placeholder.com/150"}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                                    <p className="text-[#26A66B] font-medium">${item.price}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-gray-800">
                                    <span>Total</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full bg-[#26A66B] hover:bg-[#1e8555] text-white py-3 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
