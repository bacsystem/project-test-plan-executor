import Masonry from "@mui/lab/Masonry";
import { Button, Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiShare from "@/icons/nexture/ni-share";

export default function MasonryImages() {
  return (
    <Masonry columns={4} spacing={5}>
      {itemData.map((item, index) => (
        <Card className="group relative overflow-hidden p-0" key={index}>
          <Box className="absolute inset-0 z-1 flex flex-col justify-between bg-black/20 p-7 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
            <Typography variant="subtitle1" className="text-text-contrast">
              {item.title}
            </Typography>
            <Box className="flex flex-row justify-between">
              <Button
                className="icon-only px-4!"
                size="small"
                color="grey"
                variant="contained"
                startIcon={<NiChevronRightSmall size={"small"} className="rtl:rotate-180" />}
              >
                View
              </Button>
              <Box className="flex flex-row gap-2">
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="contained"
                  startIcon={<NiShare size={"small"} />}
                />
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="contained"
                  startIcon={<NiEllipsisHorizontal size={"small"} />}
                />
              </Box>
            </Box>
          </Box>

          <img
            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            src={`${item.img}?w=162&auto=format`}
            alt={item.title}
            loading="lazy"
            className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
          />
        </Card>
      ))}
    </Masonry>
  );
}

const itemData = [
  {
    img: "/images/products/product-1-vertical.jpg",
    title: "Stretchy",
  },
  {
    img: "/images/products/product-9.jpg",
    title: "Donatello",
  },
  {
    img: "/images/products/product-5-horizontal.jpg",
    title: "Paperwork",
  },
  {
    img: "/images/products/product-2-vertical.jpg",
    title: "Pony Soprano",
  },
  {
    img: "/images/products/product-10.jpg",
    title: "Woolworth",
  },
  {
    img: "/images/products/product-6-horizontal.jpg",
    title: "Birb",
  },
  {
    img: "/images/products/product-3-vertical.jpg",
    title: "Buck Rogers",
  },
  {
    img: "/images/products/product-11.jpg",
    title: "Subwoofer",
  },
  {
    img: "/images/products/product-7-horizontal.jpg",
    title: "Boo Boo",
  },
  {
    img: "/images/products/product-4-vertical.jpg",
    title: "Cinnabun",
  },
  {
    img: "/images/products/product-12.jpg",
    title: "Dodo",
  },
  {
    img: "/images/products/product-8-horizontal.jpg",
    title: "Bubbles",
  },
];
