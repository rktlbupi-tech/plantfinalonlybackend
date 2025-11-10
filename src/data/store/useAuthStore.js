import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set, get) => ({
  formData: {
    email: "",
    password: "",
  },
  user: null,
  loading: false,
  error: null,

  // ✅ This was missing — needed for typing in inputs
  setFormData: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    }));
  },

  login: async () => {
    const { formData } = get();
    console.log("🧩 Zustand formData before login:", formData);

    // ✅ Basic validation
    if (!formData.email || !formData.password) {
      set({ error: "Please enter both email and password." });
      return;
    }

    set({ loading: true, error: null });

    try {
      const data = await authService.login(formData);
      console.log("✅ API response:", data);
      set({ user: data, loading: false, error: null });
    } catch (e) {
      console.error("❌ Login failed:", e);
      set({
        user: null,
        loading: false,
        error: e.message || "Login failed",
      });
    }
  },
}));
