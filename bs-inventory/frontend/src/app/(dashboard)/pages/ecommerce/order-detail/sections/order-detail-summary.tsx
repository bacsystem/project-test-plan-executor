import { Box, Button, Card, CardContent, Link, Typography } from "@mui/material";

import NiCheckSquare from "@/icons/nexture/ni-check-square";

export default function OrderDetailSummary() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Summary
        </Typography>

        <Box className="flex flex-col items-start gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Status</Typography>
            <Button
              className="pointer-events-none self-center"
              size="small"
              color="success"
              variant="pastel"
              startIcon={<NiCheckSquare size={"small"} />}
            >
              Delivered
            </Button>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Order Date</Typography>
            <Typography variant="body1" className="text-text-secondary">
              2 days ago
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Shipment Date</Typography>
            <Typography variant="body1" className="text-text-secondary">
              1 day ago
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Invoice</Typography>
            <Typography variant="body1">
              <Link href="#" color="textSecondary">
                #INV-4585-5115-4213
              </Link>
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Tracking Code</Typography>
            <Typography variant="body1">
              <Link href="#" color="textSecondary">
                US4815547821
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
