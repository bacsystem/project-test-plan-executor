import { Box, Card, CardContent, Typography } from "@mui/material";

export default function DashboardHealthContact() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Contact
        </Typography>
        <Box className="flex flex-col items-start gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="body1" className="text-text-secondary">
              4 Glamis Avenue, Strathmore Park, Wellington 6022 New Zealand
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Phone</Typography>
            <Typography variant="body1" className="text-text-secondary">
              +6443884455
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Emergency Contact</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Blaine Cottrell
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Emergency Contact Phone</Typography>
            <Typography variant="body1" className="text-text-secondary">
              +6443884455
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
