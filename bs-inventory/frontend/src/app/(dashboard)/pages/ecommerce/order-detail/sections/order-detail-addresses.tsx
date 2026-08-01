import { Box, Card, CardContent, Typography } from "@mui/material";

export default function OrderDetailAddresses() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Addresses
        </Typography>

        <Box className="flex flex-col items-start gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Shipment Address</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Blaine Cottrell (+6443884455)
              <br />
              4 Glamis Avenue, Strathmore Park,
              <br />
              Wellington 6022 New Zealand
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Billing Address</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Blaine Cottrell (+6443884455)
              <br />
              4 Glamis Avenue, Strathmore Park,
              <br />
              Wellington 6022 New Zealand
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
