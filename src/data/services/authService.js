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
};
