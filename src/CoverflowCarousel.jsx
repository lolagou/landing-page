import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

// ✅ Importa las imágenes desde la carpeta src
import analiza from "./analiza.png";
import impresion from "./impresion.png";
import proceso from "./img1.png"; // o el nombre que corresponda a “proceso”

export default function CoverflowCarousel() {
  const images = [proceso, analiza, impresion];

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
      {images.map((src, index) => (
        <SwiperSlide className="lp-slide" key={index}>
          <img
            src={src}
            alt={`Plantilla ${index + 1}`}
            className="carousel-img"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
