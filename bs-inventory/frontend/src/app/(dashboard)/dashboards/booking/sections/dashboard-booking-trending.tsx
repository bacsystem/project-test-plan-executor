import Link from "next/link";

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function DashboardBookingTrending() {
  return (
    <>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Trending Locations
        </Typography>
        <Button
          component={Link}
          href="#"
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
        >
          View All
        </Button>
      </Box>
      <Grid container size={12}>
        <Grid size={12} container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="relative">
              <CardActionArea href="#" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/booking/booking-1.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Santorini
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Whitewashed villages and stunning sunsets.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="20% Off"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="relative">
              <CardActionArea href="#" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/booking/booking-2.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Bali
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Tropical beaches, temples, and lush rice terraces.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="20% Off"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="relative">
              <CardActionArea href="#" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/booking/booking-3.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Maldives
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Overwater villas and pristine turquoise lagoons.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="10% Off"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="relative">
              <CardActionArea href="#" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/booking/booking-4.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Rio de Janeiro
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Carnival spirit, Copacabana, and Sugarloaf Mountain.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="10% Off"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="relative">
              <CardActionArea href="#" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/booking/booking-5.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Maui
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Surfing, snorkeling, and volcanic landscapes.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="10% Off"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="relative">
              <CardActionArea href="#" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/booking/booking-6.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Cancun
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Caribbean waters, resorts, and Mayan ruins.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="10% Off"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
