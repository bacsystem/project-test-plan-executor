import Link from "next/link";

import { Box, Button, Card, CardContent, FormGroup, Grid, Rating, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiStar from "@/icons/nexture/ni-star";
import { cn } from "@/lib/utils";

export default function DashboardLearningCourses() {
  return (
    <>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Trending Courses
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

      <Grid container size={12} spacing={5}>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "outline-background-paper relative flex min-h-100 bg-size-[120%] bg-position-[center_top_-3rem]! bg-no-repeat p-0 outline-4 -outline-offset-4 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-3.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-8/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Crafting for Generations
              </Typography>
              <Typography variant="body1" className="mb-2">
                Learn to create timeless wooden toys that inspire play, and last a lifetime.
              </Typography>
              <FormGroup className="mb-0">
                <Box className="flex flex-row items-center">
                  <Rating
                    readOnly
                    defaultValue={5}
                    max={5}
                    icon={<NiStar variant="contained" size="medium" />}
                    emptyIcon={<NiStar size="medium" className="outlined" />}
                  />
                  <Typography variant="body1" component="span" className="text-text-secondary ms-1">
                    (48)
                  </Typography>
                </Box>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "outline-background-paper relative flex min-h-100 bg-size-[120%] bg-position-[center_top_-3rem]! bg-no-repeat p-0 outline-4 -outline-offset-4 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-7.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-8/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Traditional Toy Techniques
              </Typography>
              <Typography variant="body1" className="mb-2">
                Explore time-honored methods for crafting classic toys.
              </Typography>
              <FormGroup className="mb-0">
                <Box className="flex flex-row items-center">
                  <Rating
                    readOnly
                    defaultValue={5}
                    max={5}
                    icon={<NiStar variant="contained" size="medium" />}
                    emptyIcon={<NiStar size="medium" className="outlined" />}
                  />
                  <Typography variant="body1" component="span" className="text-text-secondary ms-1">
                    (214)
                  </Typography>
                </Box>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "outline-background-paper relative flex min-h-100 bg-size-[120%] bg-position-[center_top_-3rem]! bg-no-repeat p-0 outline-4 -outline-offset-4 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-2.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-8/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Mastering Wooden Toys
              </Typography>
              <Typography variant="body1" className="mb-2">
                Advance your skills in designing, crafting, and finishing toys.
              </Typography>
              <FormGroup className="mb-0">
                <Box className="flex flex-row items-center">
                  <Rating
                    readOnly
                    defaultValue={5}
                    max={5}
                    icon={<NiStar variant="contained" size="medium" />}
                    emptyIcon={<NiStar size="medium" className="outlined" />}
                  />
                  <Typography variant="body1" component="span" className="text-text-secondary ms-1">
                    (155)
                  </Typography>
                </Box>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "outline-background-paper relative flex min-h-100 bg-size-[120%] bg-position-[center_top_-3rem]! bg-no-repeat p-0 outline-4 -outline-offset-4 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-4.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-8/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Educational Toy Design
              </Typography>
              <Typography variant="body1" className="mb-2">
                Learn to create toys that spark learning, and support development.
              </Typography>
              <FormGroup className="mb-0">
                <Box className="flex flex-row items-center">
                  <Rating
                    readOnly
                    defaultValue={4}
                    max={5}
                    icon={<NiStar variant="contained" size="medium" />}
                    emptyIcon={<NiStar size="medium" className="outlined" />}
                  />
                  <Typography variant="body1" component="span" className="text-text-secondary ms-1">
                    (654)
                  </Typography>
                </Box>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
