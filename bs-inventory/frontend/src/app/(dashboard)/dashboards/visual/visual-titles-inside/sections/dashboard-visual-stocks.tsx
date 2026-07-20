import { Box, Button, Card, CardContent, Chip, Link, Typography } from "@mui/material";

import NiAirBalloon from "@/icons/nexture/ni-air-balloon";
import NiBook from "@/icons/nexture/ni-book";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiController from "@/icons/nexture/ni-controller";
import NiCrown from "@/icons/nexture/ni-crown";
import NiDocumentCode from "@/icons/nexture/ni-document-code";
import NiScreen from "@/icons/nexture/ni-screen";

export default function DashboardVisualStocks() {
  return (
    <Card className="h-full">
      <CardContent>
        <Box className="mb-3 flex flex-row items-center leading-6">
          <Typography variant="h6" component="h6" className="flex-1">
            Stocks
          </Typography>
          <Button
            size="tiny"
            color="grey"
            variant="text"
            startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
          >
            View All
          </Button>
        </Box>

        <Box className="flex flex-col gap-5">
          <Box className="flex flex-row gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiController size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                  Social Media
                </Link>
                <Chip label="6/12" variant="outlined" />
              </Box>
              <Box className="bg-grey-50 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "18%" }}></Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiBook size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                  Books
                </Link>
                <Chip label="8/12" variant="outlined" />
              </Box>
              <Box className="bg-grey-50 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "36%" }}></Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiAirBalloon size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                  Toys
                </Link>
                <Chip label="1/12" variant="outlined" />
              </Box>
              <Box className="bg-grey-50 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "50%" }}></Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiScreen size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                  Electronics
                </Link>
                <Chip label="6/12" variant="outlined" />
              </Box>
              <Box className="bg-grey-50 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "10%" }}></Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiCrown size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                  Accessories
                </Link>
                <Chip label="4/12" variant="outlined" />
              </Box>
              <Box className="bg-grey-50 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "80%" }}></Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiDocumentCode size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                  Software
                </Link>
                <Chip label="1/12" variant="outlined" />
              </Box>
              <Box className="bg-grey-50 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "5%" }}></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
