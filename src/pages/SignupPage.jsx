import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../data/store/useAuthStore";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { formData, loading, error, setFormData, register } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register();
    if (success) {
      toast.success("Registration successful! Please login.");
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF8EA] via-[#FAFAFA] to-[#F0F9F4]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Left Side - Content */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 font-bold leading-tight mb-6">
              Join the <br />
              <span className="text-[#26A66B]">Green Revolution</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Create an account to start your journey. Whether you're buying plants or selling them, we have a place for you.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-[#26A66B]">
                <div className="w-10 h-10 rounded-full bg-[#26A66B] bg-opacity-10 flex items-center justify-center">
                  <span className="text-xl">🌿</span>
                </div>
                <span className="text-sm font-medium">Wide Variety of Plants</span>
              </div>
              <div className="flex items-center gap-4 text-[#26A66B]">
                <div className="w-10 h-10 rounded-full bg-[#26A66B] bg-opacity-10 flex items-center justify-center">
                  <span className="text-xl">🚚</span>
                </div>
                <span className="text-sm font-medium">Fast & Secure Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="flex-1 max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
                <p className="text-gray-600">Create your account today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => setFormData("fullname", e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.mobno}
                    onChange={(e) => setFormData("mobno", e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData("email", e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData("password", e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26A66B] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I want to:</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.role === 'user' ? 'border-[#26A66B] bg-[#E8F5E9] text-[#26A66B]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === 'user'}
                        onChange={(e) => setFormData("role", e.target.value)}
                        className="hidden"
                      />
                      Buy Plants
                    </label>
                    <label className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.role === 'vendor' ? 'border-[#26A66B] bg-[#E8F5E9] text-[#26A66B]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="role"
                        value="vendor"
                        checked={formData.role === 'vendor'}
                        onChange={(e) => setFormData("role", e.target.value)}
                        className="hidden"
                      />
                      Sell Plants
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#26A66B] hover:bg-[#1e8555] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>

                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{" "}
                  <span
                    className="text-[#26A66B] hover:text-[#1e8555] font-medium cursor-pointer transition-colors"
                    onClick={() => navigate('/auth/login')}
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
