import Link from "next/link";

import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

export default function DashboardLearningContinue() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Continue Learning
        </Typography>
        <Box className="flex w-full flex-col gap-2.5">
          <Card
            component={Link}
            href="#"
            className="flex w-full flex-row rounded-lg p-0 shadow-none! transition-transform hover:scale-[1.02]"
          >
            <img src="/images/products/product-8.jpg" alt="course image" className="h-16 w-16 rounded-lg" />
            <CardContent className="flex w-full items-center">
              <Box className="flex flex-1 flex-col gap-2">
                <Box className="flex flex-row items-center justify-between">
                  <Typography variant="subtitle2" className="line-clamp-1">
                    From Block to Beauty: Mastering Wooden Toys
                  </Typography>
                  <Chip label="74%" variant="outlined" />
                </Box>
                <Box className="bg-grey-50 h-0.5 w-full">
                  <Box className="bg-primary h-0.5" style={{ width: "74%" }}></Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            component={Link}
            href="#"
            className="flex w-full flex-row rounded-lg p-0 shadow-none! transition-transform hover:scale-[1.02]"
          >
            <img src="/images/products/product-9.jpg" alt="course image" className="h-16 w-16 rounded-lg" />
            <CardContent className="flex w-full items-center">
              <Box className="flex flex-1 flex-col gap-2">
                <Box className="flex flex-row items-center justify-between">
                  <Typography variant="subtitle2" className="line-clamp-1">
                    Green Toys, Wooden Joys
                  </Typography>
                  <Chip label="52%" variant="outlined" />
                </Box>
                <Box className="bg-grey-50 h-0.5 w-full">
                  <Box className="bg-primary h-0.5" style={{ width: "52%" }}></Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            component={Link}
            href="#"
            className="flex w-full flex-row rounded-lg p-0 shadow-none! transition-transform hover:scale-[1.02]"
          >
            <img src="/images/products/product-2.jpg" alt="course image" className="h-16 w-16 rounded-lg" />
            <CardContent className="flex w-full items-center">
              <Box className="flex flex-1 flex-col gap-2">
                <Box className="flex flex-row items-center justify-between">
                  <Typography variant="subtitle2" className="line-clamp-1">
                    Tiny Treasures: Crafting Wooden Toys at Home
                  </Typography>
                  <Chip label="47%" variant="outlined" />
                </Box>
                <Box className="bg-grey-50 h-0.5 w-full">
                  <Box className="bg-primary h-0.5" style={{ width: "47%" }}></Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            component={Link}
            href="#"
            className="flex w-full flex-row rounded-lg p-0 shadow-none! transition-transform hover:scale-[1.02]"
          >
            <img src="/images/products/product-5.jpg" alt="course image" className="h-16 w-16 rounded-lg" />
            <CardContent className="flex w-full items-center">
              <Box className="flex flex-1 flex-col gap-2">
                <Box className="flex flex-row items-center justify-between">
                  <Typography variant="subtitle2" className="line-clamp-1">
                    Little Hands, Big Minds
                  </Typography>
                  <Chip label="20%" variant="outlined" />
                </Box>
                <Box className="bg-grey-50 h-0.5 w-full">
                  <Box className="bg-primary h-0.5" style={{ width: "20%" }}></Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CardContent>
    </Card>
  );
}
