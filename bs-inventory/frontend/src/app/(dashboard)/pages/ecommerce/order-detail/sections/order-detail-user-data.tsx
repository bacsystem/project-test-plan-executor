import { Box, Card, CardContent, Typography } from "@mui/material";

export default function OrderDetailUserData() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          User Data
        </Typography>

        <Box className="flex flex-col items-start gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">IP Address</Typography>
            <Typography variant="body1" className="text-text-secondary">
              98.123.45.67
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Device</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Windows 11.0 desktop
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Browser</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Mozilla Firefox 104.0
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Language</Typography>
            <Typography variant="body1" className="text-text-secondary">
              English (US)
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
