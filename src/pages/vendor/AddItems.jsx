import React, { useState } from "react";
import { useProductStore } from "../../data/store/useProductStore";

const AddItems = () => {
  const { addProduct, products } = useProductStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Indoor",
    subcategory: "",
    stock: "",
    images: "" // Changed to images string for comma separated input
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ["Indoor", "Outdoor", "Succulents", "Herbs", "Flowers"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Split images string into array
    const imageArray = formData.images.split(',').map(url => url.trim()).filter(url => url);

    const success = await addProduct({ ...formData, images: imageArray });

    if (success) {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "Indoor",
        subcategory: "",
        stock: "",
        images: ""
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-1">Add a new plant to your inventory</p>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Product added successfully! 🎉 It is now pending approval.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Monstera Deliciosa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe the plant, its care requirements, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="29.99"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Large Plants"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URLs (Comma separated) *
                </label>
                <textarea
                  id="images"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Enter multiple image URLs separated by commas.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#26A66B] hover:bg-[#1e8555] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>

        {/* Product List Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Products ({products.length})</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/100x100?text=Plant";
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-800 truncate">{product.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">${product.price}</p>
                      <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${product.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {product.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;

