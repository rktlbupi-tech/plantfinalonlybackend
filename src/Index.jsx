import React from "react";
import PopularPlants from "./components/landing_components/PopularPlants";
import Home from "./pages/LandingPage";
import ShopPage from "./components/landing_components/ShopByCate";
import About from "./components/landing_components/WhyChooseUs";


const Index = () => {
  return (
    <div>
      <Home />
      <ShopPage />
      <About />
      <PopularPlants />
    </div>
  );
};

export default Index;
