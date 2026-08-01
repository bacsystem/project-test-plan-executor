import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Card, CardContent, Typography } from "@mui/material";

export default function CarouselFlow() {
  return (
    <Card>
      <CardContent>
        <Box className="mb-3 flex flex-row items-center leading-6">
          <Typography variant="h6" component="h6" className="flex-1">
            Flow
          </Typography>
        </Box>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
          speed={5000}
          allowTouchMove={false}
          className="ease-linear"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            reverseDirection: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1800: {
              slidesPerView: 6,
            },
          }}
          wrapperClass="ease-linear!"
        >
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-1.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-2.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-3.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-4.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-5.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-6.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-7.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="slide image"
              src={"/images/products/product-8.jpg"}
              className="aspect-3/2 rounded-lg object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </CardContent>
    </Card>
  );
}
