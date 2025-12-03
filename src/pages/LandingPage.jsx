import React, { useEffect } from "react";
import hero from "../assets/images/hero.png";
import CustomButton from "../components/CustomButton";
import { useProductStore } from "../data/store/useProductStore";
import PlantCard from "../components/PlantCard";

const Home = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const approvedProducts = products.filter(product => product.isApproved);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-greenbg pb-16 pt-20">
        <div className="flex justify-between container mx-auto px-4">
          <div className="flex flex-col gap-3 justify-center">
            <h1 className="text-6xl md:text-8xl text-primary font-bold leading-tight">
              Give Life To
              <br />
              Your Home
            </h1>
            <p className="text-xl pt-7 text-gray-600 max-w-lg">
              Discover a wide variety of plants to brighten up your living space.
              From easy-care succulents to lush indoor trees.
            </p>
            <div className="mt-8">
              <CustomButton title="Shop Now" />
            </div>
          </div>
          <div className="hidden md:block">
            <img width={314} height={393} src={hero} alt="Hero Plant" className="object-contain" />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Plants</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#26A66B]"></div>
          </div>
        ) : approvedProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products available at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {approvedProducts.map((product) => (
              <PlantCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
