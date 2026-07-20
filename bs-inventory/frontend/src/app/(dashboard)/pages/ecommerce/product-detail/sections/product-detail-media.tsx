import ProductDetailMediaImages from "./product-detail-media-images";
import ProductDetailMediaThumbnail from "./product-detail-media-thumbnail";

import { Card, CardContent, Typography } from "@mui/material";

export default function ProductDetailMedia() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Media
        </Typography>

        <ProductDetailMediaThumbnail />
        <ProductDetailMediaImages />
      </CardContent>
    </Card>
  );
}
