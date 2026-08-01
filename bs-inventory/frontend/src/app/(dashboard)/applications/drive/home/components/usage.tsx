import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Usage() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Usage
      </Typography>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Box className="flex flex-col gap-2">
            <Box className="flex flex-row items-center gap-1">
              <Typography variant="h6" component="p">
                4.2 GB
              </Typography>
              <Typography>of 20 GB in use</Typography>
            </Box>

            <Box className="flex flex-row gap-0.5">
              <Box className="border-primary bg-primary-light/10 flex h-2 w-1/12 rounded-xs border-2"></Box>
              <Box className="border-secondary bg-secondary-light/10 flex h-2 w-2/12 rounded-xs border-2"></Box>
              <Box className="border-accent-1 bg-accent-1-light/10 flex h-2 w-2/12 rounded-xs border-2"></Box>
              <Box className="border-grey-100 bg-grey-100-light/10 flex h-2 w-7/12 rounded-xs border-2"></Box>
            </Box>
          </Box>
          <Box className="flex flex-col gap-2 lg:flex-row lg:gap-6">
            <Box className="flex flex-row items-center gap-2">
              <Box className="border-primary bg-primary-light/10 h-4 w-4 rounded-xs border-2"></Box>
              <Box className="flex flex-row gap-1">
                <Typography>Photos</Typography>
                <Typography className="text-text-secondary">1.6GB</Typography>
              </Box>
            </Box>

            <Box className="flex flex-row items-center gap-2">
              <Box className="border-secondary bg-secondary-light/10 h-4 w-4 rounded-xs border-2"></Box>
              <Box className="flex flex-row gap-1">
                <Typography>Videos</Typography>
                <Typography className="text-text-secondary">2.3GB</Typography>
              </Box>
            </Box>

            <Box className="flex flex-row items-center gap-2">
              <Box className="border-accent-1 bg-accent-1-light/10 h-4 w-4 rounded-xs border-2"></Box>
              <Box className="flex flex-row gap-1">
                <Typography>Documents</Typography>
                <Typography className="text-text-secondary">0.6GB</Typography>
              </Box>
            </Box>

            <Box className="flex flex-row items-center gap-2">
              <Box className="border-grey-100 bg-grey-100-light/10 h-4 w-4 rounded-xs border-2"></Box>
              <Box className="flex flex-row gap-1">
                <Typography>Empty</Typography>
                <Typography className="text-text-secondary">14.2GB</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
