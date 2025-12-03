import React, { useEffect } from "react";
import PlantCard from "../PlantCard";
import CustomHeading from "../CustomHeading";
import { useProductStore } from "../../data/store/useProductStore";
import { useNavigate } from "react-router-dom";

const PopularPlants = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#26A66B] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <CustomHeading title={"Popular Plants"} />
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our best-selling plants, carefully curated to bring life and beauty to your space.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 8).map((plant) => (
          <PlantCard key={plant._id} product={plant} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No plants available at the moment.
        </div>
      )}
    </div>
  );
};

export default PopularPlants;
