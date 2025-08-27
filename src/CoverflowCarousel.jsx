// CoverflowCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

export default function CoverflowCarousel() {
  return (
    <Swiper
      className="lp-coverflow"
      modules={[EffectCoverflow]}
      effect="coverflow"
      grabCursor
      centeredSlides
      loop
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 60,
        stretch: 0,
        depth: 300,
        modifier: 1,
        scale: 0.85,
        slideShadows: true,
      }}
    >
      <SwiperSlide className="lp-slide">Slide 1</SwiperSlide>
      <SwiperSlide className="lp-slide">Slide 2</SwiperSlide>
      <SwiperSlide className="lp-slide">Slide 3</SwiperSlide>
      <SwiperSlide className="lp-slide">Slide 4</SwiperSlide>
    </Swiper>
  );
}
