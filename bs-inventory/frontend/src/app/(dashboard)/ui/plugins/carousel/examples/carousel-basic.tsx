import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function CarouselBasic() {
  const swiperRef = useRef<any>(null);
  return (
    <Card>
      <CardContent>
        <Box className="mb-3 flex flex-row items-center leading-6">
          <Typography variant="h6" component="h6" className="flex-1">
            Basic
          </Typography>
          <Box className="flex flex-row gap-2">
            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiChevronLeftSmall size={"small"} className="rtl:rotate-180" />}
              onClick={() => swiperRef.current.slidePrev()}
            />

            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiChevronRightSmall size={"small"} className="rtl:rotate-180" />}
              onClick={() => swiperRef.current.slideNext()}
            />
          </Box>
        </Box>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
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
