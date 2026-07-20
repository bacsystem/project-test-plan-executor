import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function ImageListTitleBarStandard() {
  return (
    <ImageList className="w-full">
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={<span>by: {item.author}</span>} position="below" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/products/product-1.jpg",
    title: "Stretchy",
    author: "@bkristastucchio",
  },
  {
    img: "/images/products/product-2.jpg",
    title: "Pony Soprano",
    author: "@rollelflex_graphy726",
  },
  {
    img: "/images/products/product-3.jpg",
    title: "Buck Rogers",
    author: "@helloimnik",
  },
  {
    img: "/images/products/product-4.jpg",
    title: "Cinnabun",
    author: "@nolanissac",
  },
  {
    img: "/images/products/product-5.jpg",
    title: "Paperwork",
    author: "@hjrc33",
  },
  {
    img: "/images/products/product-6.jpg",
    title: "Birb",
    author: "@arwinneil",
  },
  {
    img: "/images/products/product-7.jpg",
    title: "Boo Boo",
    author: "@tjdragotta",
  },
  {
    img: "/images/products/product-8.jpg",
    title: "Bubbles",
    author: "@katie_wasserman",
  },
  {
    img: "/images/products/product-9.jpg",
    title: "Donatello",
    author: "@silverdalex",
  },
  {
    img: "/images/products/product-10.jpg",
    title: "Woolworth",
    author: "@shelleypauls",
  },
  {
    img: "/images/products/product-11.jpg",
    title: "Subwoofer",
    author: "@peterlaster",
  },
  {
    img: "/images/products/product-12.jpg",
    title: "Dodo",
    author: "@southside_customs",
  },
];
