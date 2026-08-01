import { Box, Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import NiShare from "@/icons/nexture/ni-share";

export default function ImageListTitleBarStandardMasonry() {
  return (
    <Box className="w-full">
      <ImageList variant="masonry" cols={2} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              position="below"
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <Button
                  className="icon-only mt-2"
                  size="small"
                  color="text-secondary"
                  variant="text"
                  startIcon={<NiShare size={"small"} />}
                />
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "/images/products/product-1-vertical.jpg",
    title: "Stretchy",
    author: "swabdesign",
  },
  {
    img: "/images/products/product-5-horizontal.jpg",
    title: "Paperwork",
    author: "Charles Deluvio",
  },
  {
    img: "/images/products/product-11.jpg",
    title: "Subwoofer",
    author: "Christian Mackie",
  },
  {
    img: "/images/products/product-2-vertical.jpg",
    title: "Pony Soprano",
    author: "Pavel Nekoranec",
  },
  {
    img: "/images/products/product-6-horizontal.jpg",
    title: "Birb",
    author: "Darren Richardson",
  },
  {
    img: "/images/products/product-12.jpg",
    title: "Dodo",
    author: "Taylor Simpson",
  },
  {
    img: "/images/products/product-10.jpg",
    title: "Woolworth",
    author: "Hutomo Abrianto",
  },
  {
    img: "/images/products/product-8-horizontal.jpg",
    title: "Bubbles",
    author: "Ben Kolde",
  },
  {
    img: "/images/products/product-7-horizontal.jpg",
    title: "Boo Boo",
    author: "Fi Bell",
  },
  {
    img: "/images/products/product-3-vertical.jpg",
    title: "Buck Rogers",
    author: "Philipp Berndt",
  },
  {
    img: "/images/products/product-9.jpg",
    title: "Donatello",
    author: "Jen P.",
  },
  {
    img: "/images/products/product-4-vertical.jpg",
    title: "Cinnabun",
    author: "Douglas Sheppard",
  },
];
