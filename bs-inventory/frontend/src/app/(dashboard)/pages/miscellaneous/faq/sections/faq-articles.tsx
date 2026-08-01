import { Box, Card, CardContent, Typography } from "@mui/material";

export default function FaqArticles() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Recent Articles
        </Typography>
        <Box className="flex flex-col gap-4">
          <Box component="a" href="#" className="group flex flex-row items-center gap-3">
            <img
              src="/images/products/product-5-horizontal.jpg"
              alt="article image"
              className="h-20 w-24 rounded-md object-cover"
            />
            <Box className="flex flex-col">
              <Typography variant="h6" component="h6" className="group-hover:text-primary transition-colors">
                Craftsmanship Meets Play
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 leading-3.5 transition-colors"
              >
                Discover the perfect blend of tradition and creativity with our handcrafted wooden toy.
              </Typography>
            </Box>
          </Box>
          <Box component="a" href="#" className="group flex flex-row items-center gap-3">
            <img
              src="/images/products/product-6-horizontal.jpg"
              alt="article image"
              className="h-20 w-24 rounded-md object-cover"
            />
            <Box className="flex flex-col">
              <Typography variant="h6" component="h6" className="group-hover:text-primary transition-colors">
                The Art of Wooden Toys
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 leading-3.5 transition-colors"
              >
                Whether you&apos;re looking for a meaningful gift for a child or a collector&apos;s item for an
                enthusiast.
              </Typography>
            </Box>
          </Box>
          <Box component="a" href="#" className="group flex flex-row items-center gap-3">
            <img
              src="/images/products/product-7-horizontal.jpg"
              alt="article image"
              className="h-20 w-24 rounded-md object-cover"
            />
            <Box className="flex flex-col">
              <Typography variant="h6" component="h6" className="group-hover:text-primary transition-colors">
                Wooden Toys vs. Plastic Toys
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 leading-3.5 transition-colors"
              >
                Designed with simplicity in mind, it encourages unstructured play that fosters.
              </Typography>
            </Box>
          </Box>
          <Box component="a" href="#" className="group flex flex-row items-center gap-3">
            <img
              src="/images/products/product-8-horizontal.jpg"
              alt="article image"
              className="h-20 w-24 rounded-md object-cover"
            />
            <Box className="flex flex-col">
              <Typography variant="h6" component="h6" className="group-hover:text-primary transition-colors">
                Eco-Friendly Play
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 leading-3.5 transition-colors"
              >
                Bring home this wooden toy today and enjoy the perfect harmony of tradition, craftsmanship and quality.
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
