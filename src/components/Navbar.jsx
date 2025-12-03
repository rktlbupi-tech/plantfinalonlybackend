import React from "react";
import logo from "../assets/icons/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../data/store/useAuthStore";
import { useCartStore } from "../data/store/useCartStore";
import { ShoppingCart, User, Search, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-[#EDF8EA] sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center container mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-xl font-bold text-[#26A66B]">Garden</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link to="/" className="hover:text-[#26A66B] transition-colors">Home</Link>
          <Link to="/" className="hover:text-[#26A66B] transition-colors">Shop</Link>
          <Link to="/" className="hover:text-[#26A66B] transition-colors">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-[#26A66B]">
            <Search size={22} />
          </button>

          <Link to="/cart" className="relative text-gray-600 hover:text-[#26A66B]">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#26A66B] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'vendor' ? '/vendor/dashboard' : '/profile'}
                className="flex items-center gap-2 text-gray-700 hover:text-[#26A66B] font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-[#26A66B] bg-opacity-10 flex items-center justify-center text-[#26A66B]">
                  <User size={18} />
                </div>
                <span className="hidden sm:inline">{user.fullname?.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#26A66B] hover:bg-[#1e8555] text-white px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
