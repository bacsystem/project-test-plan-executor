import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

export default function UserSpecialties() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Specialties
        </Typography>

        <Box className="flex flex-row flex-wrap gap-2">
          <Chip label="Architecture" variant="outlined" className="text-sm" />
          <Chip label="Version Control" variant="outlined" className="text-sm" />
          <Chip label="DevOps" variant="outlined" className="text-sm" />
          <Chip label="Database Management" variant="outlined" className="text-sm" />
          <Chip label="Cybersecurity" variant="outlined" className="text-sm" />
          <Chip label="Machine Learning" variant="outlined" className="text-sm" />
          <Chip label="Cloud Computing" variant="outlined" className="text-sm" />
          <Chip label="API" variant="outlined" className="text-sm" />
          <Chip label="Data Visualization" variant="outlined" className="text-sm" />
          <Chip label="QA" variant="outlined" className="text-sm" />
          <Chip label="IoT Development" variant="outlined" className="text-sm" />
          <Chip label="Agile Methodologies" variant="outlined" className="text-sm" />
        </Box>
      </CardContent>
    </Card>
  );
}
