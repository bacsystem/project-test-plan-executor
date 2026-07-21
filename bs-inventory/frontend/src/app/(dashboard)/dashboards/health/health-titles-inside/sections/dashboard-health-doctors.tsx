import Link from "next/link";

import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function DashboardHealthDoctors() {
  return (
    <Card>
      <CardContent>
        <Box className="flex flex-row items-start justify-between">
          <Typography variant="h6" component="h6" className="card-title">
            Your Doctors
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

        <Box className="flex flex-col gap-4">
          <Box className="flex w-full flex-row gap-2.5">
            <Avatar alt="Ethan Cooper" src="/images/avatars/avatar-1.jpg" className="medium" />
            <Box className="flex w-full flex-1 flex-col gap-4">
              <Box className="mb-1 flex flex-row items-center justify-between gap-1">
                <Box className="flex flex-col">
                  <Link href="#" color="textPrimary" className="hover:text-primary -mb-1 pt-0.25 transition-colors">
                    Ethan Cooper
                  </Link>
                  <Typography className="text-text-secondary" variant="body1">
                    Neurologist
                  </Typography>
                </Box>
                <Button variant="outlined" color="grey" size="tiny">
                  Appointment
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="flex w-full flex-row gap-2.5">
            <Avatar alt="Mia Sullivan" src="/images/avatars/avatar-2.jpg" className="medium" />
            <Box className="flex w-full flex-1 flex-col gap-4">
              <Box className="mb-1 flex flex-row items-center justify-between gap-1">
                <Box className="flex flex-col">
                  <Link href="#" color="textPrimary" className="hover:text-primary -mb-1 pt-0.25 transition-colors">
                    Mia Sullivan
                  </Link>
                  <Typography className="text-text-secondary" variant="body1">
                    Psychiatrist
                  </Typography>
                </Box>
                <Button variant="outlined" color="grey" size="tiny">
                  Appointment
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="flex w-full flex-row gap-2.5">
            <Avatar alt="Daniel Fontaine" src="/images/avatars/avatar-3.jpg" className="medium" />
            <Box className="flex w-full flex-1 flex-col gap-4">
              <Box className="mb-1 flex flex-row items-center justify-between gap-1">
                <Box className="flex flex-col">
                  <Link href="#" color="textPrimary" className="hover:text-primary -mb-1 pt-0.25 transition-colors">
                    Daniel Fontaine
                  </Link>
                  <Typography className="text-text-secondary" variant="body1">
                    Dermatologist
                  </Typography>
                </Box>
                <Button variant="outlined" color="grey" size="tiny">
                  Appointment
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
