import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../data/store/useCartStore";
import { useProductStore } from "../data/store/useProductStore";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, fetchProducts } = useProductStore();
    const { addToCart } = useCartStore();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (products.length === 0) {
                await fetchProducts();
            }
            const found = products.find(p => p._id === id);
            setProduct(found);
            setLoading(false);
        };
        loadProduct();
    }, [id, products, fetchProducts]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            toast.success(`Added ${quantity} ${product.name} to cart`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#26A66B]"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                <button
                    onClick={() => navigate("/")}
                    className="text-[#26A66B] hover:underline flex items-center gap-2"
                >
                    <ArrowLeft size={20} /> Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate("/")}
                    className="mb-8 text-gray-600 hover:text-[#26A66B] flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Shop
                </button>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Section */}
                        <div className="h-[400px] md:h-[600px] bg-gray-100 relative group">
                            <img
                                src={product.images?.[0] || "https://via.placeholder.com/600"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Simple Gallery Preview (if multiple images) */}
                            {product.images && product.images.length > 1 && (
                                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
                                    {product.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md cursor-pointer hover:border-[#26A66B] transition-colors"
                                            onClick={(e) => {
                                                // Simple vanilla JS image swap for now
                                                e.target.closest('.group').querySelector('img').src = img;
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-[#26A66B] font-medium tracking-wider uppercase text-sm mb-2">
                                {product.category?.name || "Indoor Plant"}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-3xl font-bold text-[#26A66B] mb-6">${product.price}</p>

                            <div className="prose text-gray-600 mb-8 leading-relaxed">
                                {product.description}
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700 font-medium">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {product.stock} items available
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="flex-1 bg-[#26A66B] hover:bg-[#1e8555] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart size={20} />
                                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                    </button>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Light</h3>
                                    <p className="text-sm text-gray-600">Bright indirect light</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Water</h3>
                                    <p className="text-sm text-gray-600">Weekly watering</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
