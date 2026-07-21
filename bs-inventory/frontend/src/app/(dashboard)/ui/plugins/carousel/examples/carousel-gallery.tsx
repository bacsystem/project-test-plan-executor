import { useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function CarouselGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<any>(null);

  return (
    <Card>
      <CardContent>
        <Box className="mb-3 flex flex-row items-center leading-6">
          <Typography variant="h6" component="h6" className="flex-1">
            Gallery
          </Typography>
        </Box>

        {/* Large Images */}
        <Swiper
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="mb-2.5"
        >
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-1.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-2.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-3.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-4.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-5.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-6.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-7.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-8.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-9.jpg" className="rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="swiper image" src="/images/products/product-10.jpg" className="rounded-lg" />
          </SwiperSlide>
        </Swiper>

        {/* Thumbnails */}
        <Box className="flex flex-row justify-center gap-2">
          <Box className="flex w-1/5 flex-none items-center justify-end">
            <Button
              className="icon-only"
              color="grey"
              variant="text"
              startIcon={<NiChevronLeftSmall className="rtl:rotate-180" />}
              onClick={() => swiperRef.current.slidePrev()}
            />
          </Box>
          <Swiper
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper);
              swiperRef.current = swiper;
            }}
            spaceBetween={10}
            slidesPerView={2}
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
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="w-3/5 flex-none"
          >
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-1.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-2.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-3.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-4.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-5.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-6.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-7.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-8.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-9.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer opacity-50 transition-all! hover:opacity-100 [.swiper-slide-thumb-active]:opacity-100">
              <img
                alt="swiper image"
                src="/images/products/product-10.jpg"
                className="mx-auto h-12 w-full rounded-lg object-cover"
              />
            </SwiperSlide>
          </Swiper>
          <Box className="flex w-1/5 flex-none items-center justify-start">
            <Button
              className="icon-only"
              color="grey"
              variant="text"
              startIcon={<NiChevronRightSmall className="rtl:rotate-180" />}
              onClick={() => swiperRef.current.slideNext()}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
