import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageListMasonry() {
  return (
    <Box className="w-full">
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "/images/products/product-1.jpg",
    title: "Stretchy",
  },
  {
    img: "/images/products/product-2-vertical.jpg",
    title: "Pony Soprano",
  },
  {
    img: "/images/products/product-5-horizontal.jpg",
    title: "Paperwork",
  },
  {
    img: "/images/products/product-11.jpg",
    title: "Subwoofer",
  },
  {
    img: "/images/products/product-6-horizontal.jpg",
    title: "Birb",
  },
  {
    img: "/images/products/product-12.jpg",
    title: "Dodo",
  },
  {
    img: "/images/products/product-8.jpg",
    title: "Bubbles",
  },
  {
    img: "/images/products/product-3-vertical.jpg",
    title: "Buck Rogers",
  },
  {
    img: "/images/products/product-9.jpg",
    title: "Donatello",
  },
  {
    img: "/images/products/product-4-vertical.jpg",
    title: "Cinnabun",
  },
  {
    img: "/images/products/product-7-horizontal.jpg",
    title: "Boo Boo",
  },
  {
    img: "/images/products/product-10.jpg",
    title: "Woolworth",
  },
];
