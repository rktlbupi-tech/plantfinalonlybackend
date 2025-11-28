import { create } from "zustand";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  formData: {
    fullname:"",
    mobno:"",
    email: "",
    password: "",
  },
  user: null,
  loading: false,
  error: null,

  setFormData: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    }));
  },

  login: async () => {
    const { formData } = get();
    console.log(" Zustand formData before login:", formData);

    if (!formData.email || !formData.password) {
      set({ error: "Please enter both email and password." });
      return;
    }
    set({ loading: true, error: null });
    try {
      const data = await authService.login(formData);
      console.log(" API response:", data);
      set({ user: data, loading: false, error: null });
    } catch (e) {
      console.error(" Login failed:", e);
      set({
        user: null,
        loading: false,
        error: e.message || "Login failed",
      });
    }
  },

  register: async () => {
    const { formData } = get();
    console.log("Zustand formData before signin:", formData);
    // if (!formData.email || !formData.password || !formData.name || !formData.mob) {
    //   set({ error: "Please enter all field." });
    //   return;
    // }
    set({ loading: true, error: null });
    try {
      console.log("hello11")
      const data = await authService.register(formData);
            console.log("hello22")

      console.log("API response:", data);
      set({ user: data, loading: false, error: null });
    } catch (e) {
      console.error(" Login failed:", e);
      set({
        user: null,
        loading: false,
        error: e.message || "Register failed",
      });
    }
  },
}));
