"use client";

import { useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import { cn } from "@/libs/utils";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={cn(className)}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={`/products/${image}`}
              alt={`imagen product ${title}`}
              width={2000}
              height={2000}
              className="rounded object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={`/products/${image}`}
              alt={`imagen product ${title}`}
              width={1024}
              height={800}
              className="rounded object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
