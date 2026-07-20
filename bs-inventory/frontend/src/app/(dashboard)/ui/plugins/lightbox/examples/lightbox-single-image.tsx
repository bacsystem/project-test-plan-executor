import "yet-another-react-lightbox/styles.css";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Card, CardContent, Typography } from "@mui/material";

import NiCross from "@/icons/nexture/ni-cross";

export default function LightboxSingleImage() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Single Image
        </Typography>

        <img
          alt="lightbox image"
          src={"/images/products/product-2.jpg"}
          className="w-40 cursor-pointer rounded-lg"
          onClick={() => setOpen(true)}
        />

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: "/images/products/product-2-large.jpg" }]}
          controller={{
            closeOnBackdropClick: true,
            disableSwipeNavigation: true,
          }}
          className="rounded-lightbox"
          render={{
            buttonPrev: () => undefined,
            buttonNext: () => undefined,
            iconClose: () => <NiCross size={"large"} />,
          }}
        />
      </CardContent>
    </Card>
  );
}
