import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../data/store/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { formData, loading, error, setFormData, login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF8EA] via-[#FAFAFA] to-[#F0F9F4]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Left Side - Welcome Content */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 font-bold leading-tight mb-6">
              Welcome to{" "}
              <span className="text-[#26A66B]">Garden</span>
              <br />
              Your Plant Paradise
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Discover a world of beautiful plants and create your own green oasis. 
              Join our community of plant lovers and bring nature into your home.
            </p>
            <div className="flex items-center gap-4 text-[#26A66B]">
              <div className="w-12 h-12 rounded-full bg-[#26A66B] bg-opacity-10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium">Premium Quality Plants</span>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
                <p className="text-gray-600">
                  Welcome back! Please login to your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Mobile
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData("email", e.target.value)}
                    placeholder="Enter your email or mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData("password", e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Forgot Password & Register */}
                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-[#26A66B] hover:text-[#1e8555] font-medium transition-colors">
                    Forgot Password?
                  </a>
                  <span className="text-gray-600">
                    Don't have an account?{" "}
                    <span
                      className="text-[#26A66B] hover:text-[#1e8555] font-medium cursor-pointer transition-colors"
                      onClick={() => navigate('/auth/signup')}
                    >
                      Register
                    </span>
                  </span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full bg-[#26A66B] hover:bg-[#1e8555] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
