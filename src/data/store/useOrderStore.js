import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/api/v1/orders";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchAllOrders: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      const response = await axios.get(`${API_URL}/all-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ orders: response.data.data || [], loading: false, error: null });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ loading: false, error: "Failed to fetch orders" });
    }
  },

  fetchMyOrders: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      const response = await axios.get(`${API_URL}/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ orders: response.data.data || [], loading: false, error: null });
    } catch (error) {
      console.error("Error fetching my orders:", error);
      set({ loading: false, error: "Failed to fetch orders" });
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      const response = await axios.put(`${API_URL}/update-status/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? response.data.order : order
        ),
        loading: false
      }));
      toast.success("Order status updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      set({ loading: false, error: "Failed to update order status" });
      toast.error("Failed to update order status");
      return false;
    }
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order._id === orderId);
  }
}));

