import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { machineryData } from "../Data/machinery";
import AuthModal from "../customer/Components/Auth/AuthModal";
import { useLocation, useNavigate } from "react-router-dom";

// Group products by category
const groupedProducts = machineryData.reduce((acc, product) => {
  if (!acc[product.category]) acc[product.category] = [];
  acc[product.category].push(product);
  return acc;
}, {});

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if modal should be open
  const isAuthPath = ["/login", "/register", "/verify-otp"].includes(location.pathname);

  return (
    <div className="">
      {/* Auth Modal */}
      {isAuthPath && (
        <AuthModal open={true} handleClose={() => navigate("/")} />
      )}

      {/* Main Homepage Content */}
      <HomeCarousel images={homeCarouselData} />
      <div className="space-y-10 py-20">
        {Object.keys(groupedProducts).map((category) => (
          <HomeProductSection
            key={category}
            data={groupedProducts[category]}
            section={category}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
