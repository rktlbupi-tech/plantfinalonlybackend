import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PlantCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      >
        <div className="h-64 overflow-hidden bg-gray-100 relative">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={product.images?.[0] || "https://via.placeholder.com/300"}
            className="w-full h-full object-cover"
            alt={product.name}
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#26A66B] shadow-sm">
            ${product.price}
          </div>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold px-4 py-2 border-2 border-white rounded-lg">OUT OF STOCK</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#26A66B] transition-colors truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm">{product.category?.name || product.category || "Indoor Plant"}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default PlantCard;