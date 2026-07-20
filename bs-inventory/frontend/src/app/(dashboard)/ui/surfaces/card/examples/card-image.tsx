import * as React from "react";

import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CardImage() {
  return (
    <Card className="max-w-80">
      <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
        Image Card
      </Typography>
      <Box className="px-4">
        <CardMedia component="img" alt="product" className="h-48 rounded-md" image="/images/products/product-1.jpg" />
      </Box>
      <CardContent>
        <Typography variant="h6" component="h6" className="mb-1">
          Flower Pot
        </Typography>
        <Typography variant="body1" className="text-text-secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="medium">
          Share
        </Button>
        <Button variant="text" size="medium">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
