import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/api/v1/product";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/get-items`);
      // Assuming response.data.data contains the list of products based on typical API structure
      // Adjust if the structure is different (e.g. response.data.products)
      set({ products: response.data.data || [], loading: false, error: null });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false, error: "Failed to fetch products" });
      // toast.error("Failed to fetch products");
    }
  },

  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      const response = await axios.post(`${API_URL}/add`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      set((state) => ({
        products: [response.data.data, ...state.products],
        loading: false
      }));
      toast.success("Product added successfully");
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      set({ loading: false, error: error.response?.data?.message || "Failed to add product" });
      toast.error(error.response?.data?.message || "Failed to add product");
      return false;
    }
  },

  updateProduct: async (id, updates) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      const response = await axios.put(`${API_URL}/edit/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });

      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? response.data.data : p
        ),
        loading: false
      }));
      toast.success("Product updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      set({ loading: false, error: "Failed to update product" });
      toast.error("Failed to update product");
      return false;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false
      }));
      toast.success("Product deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ loading: false, error: "Failed to delete product" });
      toast.error("Failed to delete product");
      return false;
    }
  },

  getProductById: (id) => {
    return get().products.find((p) => p._id === id);
  }
}));

