import apiClient from "../api/apiClient";

export const authService = {
  async login(formData) {

    try {
      const response = await apiClient.post("/auth/login", formData);
      console.log(" API raw response:", response);
      const data = response.data;

      if (data?.message && data.message.toLowerCase().includes("does not exists")) {
        throw new Error(data.message);
      }

      if (data?.success === false) {
        throw new Error(data.message || "Login failed");
      }
      return data;
    } catch (e) {
      console.error(" error from authService:", e);
      throw e;
    }
  },

  async register(formData) {
    console.log("hello33")
    try {
      const response = await apiClient.post("auth/signup", formData);
      if (response.success == false) {
        throw new Error(data.message || "Register failed");
      }
      console.log("data is coming from register")
      console.log(response.message)
      return response.data;

    } catch (e) {

      console.log("Error", e)

    }
  },

  async updateProfile(data) {
    try {
      const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")).state.token
        : null;

      const response = await apiClient.put("/auth/update-profile", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (e) {
      console.error("Error updating profile:", e);
      throw e;
    }
  }
};
