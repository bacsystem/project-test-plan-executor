import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";

export default function LearnTips() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Quick Tips
      </Typography>

      <Grid container size={12} spacing={2.5}>
        <Grid size={{ xs: 12, xl: 6 }}>
          <Card className="flex items-start justify-start">
            <CardActionArea className="flex w-full flex-1 flex-row justify-start">
              <CardMedia
                component="img"
                alt="product"
                className="h-24 w-24 rounded-md"
                image="/images/products/product-5.jpg"
              />
              <CardContent className="flex h-full flex-col justify-center gap-2 py-0">
                <Typography variant="h6" component="h6">
                  Visualize Your Ideas
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Bring your imagination to life with AI-generated visuals that translate abstract concepts into
                  compelling, shareable images.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, xl: 6 }}>
          <Card className="flex items-start justify-start">
            <CardActionArea className="flex w-full flex-1 flex-row justify-start">
              <CardMedia
                component="img"
                alt="product"
                className="h-24 w-24 rounded-md"
                image="/images/products/product-6.jpg"
              />
              <CardContent className="flex h-full flex-col justify-center gap-2 py-0">
                <Typography variant="h6" component="h6">
                  Social Media Content
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Instantly craft eye-catching visuals tailored to your message, helping your posts stand out and spark
                  engagement across platforms.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, xl: 6 }}>
          <Card className="flex items-start justify-start">
            <CardActionArea className="flex w-full flex-1 flex-row justify-start">
              <CardMedia
                component="img"
                alt="product"
                className="h-24 w-24 rounded-md"
                image="/images/products/product-7.jpg"
              />
              <CardContent className="flex h-full flex-col justify-center gap-2 py-0">
                <Typography variant="h6" component="h6">
                  Concept Designs
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Explore bold ideas and iterate faster with AI-powered visuals that support early-stage design thinking
                  and creative exploration.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, xl: 6 }}>
          <Card className="flex items-start justify-start">
            <CardActionArea className="flex w-full flex-1 flex-row justify-start">
              <CardMedia
                component="img"
                alt="product"
                className="h-24 w-24 rounded-md"
                image="/images/products/product-8.jpg"
              />
              <CardContent className="flex h-full flex-col justify-center gap-2 py-0">
                <Typography variant="h6" component="h6">
                  Stock Imagery
                </Typography>
                <Typography variant="body1" className="text-text-secondary line-clamp-2">
                  Generate unique, royalty-free images on demand—perfectly matched to your niche, style, and
                  storytelling needs.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
