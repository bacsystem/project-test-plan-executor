import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

export default function ExtensionTags() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Specialties
        </Typography>

        <Box className="flex flex-row flex-wrap gap-2">
          <Chip label="Color" variant="outlined" className="text-sm" />
          <Chip label="Design" variant="outlined" className="text-sm" />
          <Chip label="Harmony" variant="outlined" className="text-sm" />
          <Chip label="UI" variant="outlined" className="text-sm" />
          <Chip label="Research" variant="outlined" className="text-sm" />
          <Chip label="Tone" variant="outlined" className="text-sm" />
          <Chip label="Analysis" variant="outlined" className="text-sm" />
          <Chip label="Style" variant="outlined" className="text-sm" />
        </Box>
      </CardContent>
    </Card>
  );
}
