import { Box, Button, Card, CardContent, Rating, Typography } from "@mui/material";

import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiStar from "@/icons/nexture/ni-star";

export default function ProductDetailSummary() {
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
              Active
            </Button>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Rating</Typography>
            <Box className="flex h-full flex-1 flex-row items-center gap-2">
              <Rating
                readOnly
                size="small"
                precision={0.5}
                defaultValue={5}
                max={5}
                icon={<NiStar variant="contained" size="small" />}
                emptyIcon={<NiStar size="small" className="outlined" />}
              />
              <Typography variant="body2" component="span" className="text-text-secondary">
                (34)
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Create Date</Typography>
            <Typography variant="body1" className="text-text-secondary">
              3 weeks ago
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">URL</Typography>
            <Typography variant="body1" className="text-text-secondary">
              /products/toys/stretchy
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
