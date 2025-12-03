import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      formData: {
        fullname: "",
        mobno: "",
        email: "",
        password: "",
        role: "user", // Default role
      },
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      setFormData: (field, value) => {
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        }));
      },

      login: async () => {
        const { formData } = get();
        if (!formData.email || !formData.password) {
          set({ error: "Please enter both email and password." });
          return false;
        }
        set({ loading: true, error: null });
        try {
          const data = await authService.login(formData);

          // Backend returns: { success: true, data: { token: "...", logindata: { ... } } }
          const user = data.data?.logindata || data.user || data;
          const token = data.data?.token || data.token;

          if (!token) {
            throw new Error("Token not found in response");
          }

          set({
            user: user,
            token: token,
            isAuthenticated: true,
            loading: false,
            error: null
          });
          return true;
        } catch (e) {
          console.error("Login failed:", e);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: e.response?.data?.message || e.message || "Login failed",
          });
          return false;
        }
      },

      register: async () => {
        const { formData } = get();
        set({ loading: true, error: null });
        try {
          const data = await authService.register(formData);
          set({ loading: false, error: null });
          return true;
        } catch (e) {
          console.error("Register failed:", e);
          set({
            loading: false,
            error: e.response?.data?.message || e.message || "Register failed",
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          formData: {
            fullname: "",
            mobno: "",
            email: "",
            password: "",
            role: "user",
          }
        });
        localStorage.removeItem("auth-storage");
      },

      updateProfile: async (updates) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.updateProfile(updates);
          set((state) => ({
            user: data.data, // Assuming response.data contains updated user
            loading: false,
            error: null
          }));
          toast.success("Profile updated successfully");
          return true;
        } catch (e) {
          console.error("Update profile failed:", e);
          set({
            loading: false,
            error: e.response?.data?.message || e.message || "Update failed",
          });
          toast.error("Failed to update profile");
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
