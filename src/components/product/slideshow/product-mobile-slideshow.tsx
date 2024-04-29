"use client";

import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { cn } from "@/libs/utils";
import { ProductImage } from "../product-image";

interface Props {
	images: string[];
	title: string;
	className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
	return (
		<div className={cn(className)}>
			<Swiper
				style={{
					width: "100vh",
					height: "500px",
				}}
				pagination
				loop={true}
				autoplay={{
					delay: 5000,
				}}
				modules={[FreeMode, Autoplay, Pagination]}
				className="mySwiper2"
			>
				{images.map((image, i) => (
					<SwiperSlide key={i}>
						<ProductImage
							src={image}
							alt={`imagen product ${title}`}
							width={1000}
							height={1000}
							className="rounded object-fill"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
