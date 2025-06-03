import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();

  const item = homeCarouselData.map((item) => (
    <img
      className="cursor-pointer rounded-md w-full h-[539px] object-cover"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
      key={item.image}
    />
  ));

  return (
    <div className="max-w-screen-xl mx-auto">
      <AliceCarousel
        mouseTracking
        items={item}
        autoPlay
        infinite
        autoPlayInterval={2000}
        disableButtonsControls
      />
    </div>
  );
};

export default HomeCarousel;
