import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiPin from "@/icons/nexture/ni-pin";

export default function DashboardHealthInfo() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        General Info
      </Typography>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <Box className="flex flex-col items-center">
            <Avatar alt="avatar" src="/images/avatars/avatar-4.jpg" className="mb-2 h-20 w-20 rounded-4xl" />
            <Typography variant="subtitle1" component="p">
              Liam Carter
            </Typography>
            <Typography variant="body2" component="p" className="text-text-secondary -mt-0.5">
              Science Teacher
            </Typography>
          </Box>

          <Box className="flex w-full max-w-sm flex-row gap-1">
            <Button
              size="medium"
              color="primary"
              variant="contained"
              startIcon={<NiPin size={"medium"} />}
              className="flex-1"
            >
              Contact
            </Button>
            <Button size="medium" color="primary" variant="pastel" className="flex-1">
              Notes
            </Button>
            <Button
              className="icon-only flex-none"
              size="medium"
              color="primary"
              variant="pastel"
              startIcon={<NiEllipsisHorizontal size={"medium"} />}
            />
          </Box>

          <Box className="flex flex-col items-start gap-4">
            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle2">Blood Type</Typography>
              <Typography variant="body1" className="text-text-secondary">
                A+
              </Typography>
            </Box>

            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle2">Age</Typography>
              <Typography variant="body1" className="text-text-secondary">
                32
              </Typography>
            </Box>

            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle2">Weight</Typography>
              <Typography variant="body1" className="text-text-secondary">
                82 kg
              </Typography>
            </Box>

            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle2">Height</Typography>
              <Typography variant="body1" className="text-text-secondary">
                1.80 cm
              </Typography>
            </Box>

            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle2">Gender</Typography>
              <Typography variant="body1" className="text-text-secondary">
                Male
              </Typography>
            </Box>

            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle2">Allergies</Typography>
              <Typography variant="body1" component="ul" className="text-text-secondary list-inside list-disc">
                <Typography variant="body1" component="li" className="text-text-secondary">
                  Penicillin Allergy
                </Typography>
                <Typography variant="body1" component="li" className="text-text-secondary">
                  Lactose Intolerant
                </Typography>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
