"use client";

import Link from "next/link";

import { Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";

export default function LearnAdvanced() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Advanced Techniques
      </Typography>

      <Grid size={12} container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-1.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Image to Image
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Transform existing visuals into new styles, moods, or formats with AI.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="10 Mins"
              size="small"
              variant="outlined"
              className="outline-primary text-primary pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-2.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Using Sketches
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Turn rough drawings into polished, high-quality images in seconds.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="10 Mins"
              size="small"
              variant="outlined"
              className="outline-primary text-primary pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-3.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Better Prompts
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Craft smarter inputs for sharper, more accurate visual results.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="20 Mins"
              size="small"
              variant="outlined"
              className="outline-secondary text-secondary pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-4.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Enhancing Prompts
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Boost prompt clarity and detail to unlock richer image generation.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="20 Mins"
              size="small"
              variant="outlined"
              className="outline-secondary text-secondary pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-5.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Character Consistency
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Maintain visual identity across scenes, poses, and expressions.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="20 Mins"
              size="small"
              variant="outlined"
              className="outline-secondary text-secondary pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-6.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Quality Upscaling
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Sharpen resolution and detail without losing artistic integrity.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="20 Mins"
              size="small"
              variant="outlined"
              className="outline-secondary text-secondary pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-7.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Content Reference
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Guide generation using reference images for style or structure.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="30 Mins"
              size="small"
              variant="outlined"
              className="outline-accent-1 text-accent-1 pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card className="relative">
            <CardActionArea href="#" component={Link}>
              <CardMedia
                component="img"
                alt="product"
                className="h-48 rounded-md"
                image="/images/products/product-8.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Fashion Design
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Instantly visualize garments, styles, and collections.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Chip
              label="30 Mins"
              size="small"
              variant="outlined"
              className="outline-accent-1 text-accent-1 pointer-events-none absolute inset-e-6 top-6"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
