import * as React from "react";

import { Box, CardMedia } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

function OthersDemo(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      <Box className="flex w-80 flex-col">
        {loading ? (
          <Skeleton variant="rounded">
            <CardMedia
              component="img"
              className="h-52 rounded-md"
              image="/images/products/product-1.jpg"
              alt="Flower Pot"
            />
          </Skeleton>
        ) : (
          <CardMedia
            component="img"
            className="h-52 rounded-md"
            image="/images/products/product-1.jpg"
            alt="Flower Pot"
          />
        )}

        <Box className="flex flex-col py-2">
          {loading ? (
            <Skeleton>
              <Typography variant="h6" component="h6" className="-mb-1">
                Wall Mounted Flower Pot
              </Typography>
            </Skeleton>
          ) : (
            <Typography variant="h6" component="h6" className="-mb-1">
              Wall Mounted Flower Pot
            </Typography>
          )}

          {loading ? (
            <Skeleton>
              <Typography variant="body1" className="text-text-secondary" component="span">
                by ShadowArt
              </Typography>
            </Skeleton>
          ) : (
            <Typography variant="body1" className="text-text-secondary" component="span">
              by ShadowArt
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default function SkeletonInferringOthers() {
  return (
    <Box className="flex flex-row gap-4">
      <OthersDemo loading />
      <OthersDemo />
    </Box>
  );
}
