import "yet-another-react-lightbox/styles.css";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";

import { Box, Card, CardContent, Typography } from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCross from "@/icons/nexture/ni-cross";

const largeImages = [
  {
    src: "/images/products/product-2-large.jpg",
  },
  {
    src: "/images/products/product-3-large.jpg",
  },
  {
    src: "/images/products/product-6-large.jpg",
  },
  {
    src: "/images/products/product-10-large.jpg",
  },
];
const smallImages = [
  {
    src: "/images/products/product-2.jpg",
  },
  {
    src: "/images/products/product-3.jpg",
  },
  {
    src: "/images/products/product-6.jpg",
  },
  {
    src: "/images/products/product-10.jpg",
  },
];

export default function LightboxInline() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex =
    (when: boolean) =>
    ({ index: current }: { index: number }) => {
      if (when === open) {
        setIndex(current);
      }
    };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Inline
        </Typography>

        <Box className="flex w-full md:w-6/12 xl:w-4/12">
          <Lightbox
            index={index}
            slides={smallImages}
            plugins={[Inline]}
            on={{
              view: updateIndex(false),
              click: toggleOpen(true),
            }}
            carousel={{
              padding: 0,
              spacing: 0,
              imageFit: "cover",
            }}
            inline={{
              className: "w-full m-0 aspect-square rounded-lg inline",
            }}
            render={{
              iconPrev: () => <NiChevronLeftSmall size={"large"} />,
              iconNext: () => <NiChevronRightSmall size={"large"} />,
              iconClose: () => <NiCross size={"large"} />,
            }}
          />
        </Box>

        <Lightbox
          open={open}
          close={toggleOpen(false)}
          index={index}
          slides={largeImages}
          on={{ view: updateIndex(true) }}
          animation={{ fade: 0 }}
          controller={{ closeOnBackdropClick: true }}
          className="rounded-lightbox"
          render={{
            iconPrev: () => <NiChevronLeftSmall size={"large"} />,
            iconNext: () => <NiChevronRightSmall size={"large"} />,
            iconClose: () => <NiCross size={"large"} />,
          }}
        />
      </CardContent>
    </Card>
  );
}
