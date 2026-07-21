import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImageListQuilted() {
  return (
    <ImageList className="w-full" variant="quilted" cols={4} rowHeight={121}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/products/product-1.jpg",
    title: "Stretchy",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/products/product-2.jpg",
    title: "Pony Soprano",
  },
  {
    img: "/images/products/product-3.jpg",
    title: "Buck Rogers",
  },
  {
    img: "/images/products/product-4.jpg",
    title: "Cinnabun",
    cols: 2,
  },
  {
    img: "/images/products/product-5.jpg",
    title: "Paperwork",
    cols: 2,
  },
  {
    img: "/images/products/product-6.jpg",
    title: "Birb",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/products/product-7.jpg",
    title: "Boo Boo",
  },
  {
    img: "/images/products/product-8.jpg",
    title: "Bubbles",
  },
  {
    img: "/images/products/product-9.jpg",
    title: "Donatello",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/products/product-10.jpg",
    title: "Woolworth",
  },
  {
    img: "/images/products/product-11.jpg",
    title: "Subwoofer",
  },
  {
    img: "/images/products/product-12.jpg",
    title: "Dodo",
    cols: 2,
  },
];
