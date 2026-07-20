import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiPath from "@/icons/nexture/ni-path";
import NiTicket from "@/icons/nexture/ni-ticket";
import NiUsers from "@/icons/nexture/ni-users";

export default function KnowledgeBaseActions() {
  return (
    <>
      <Grid size={{ lg: 12, md: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
            <NiDocumentFull className="text-primary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="subtitle2" className="leading-5 transition-colors">
              Documentation
            </Typography>
            <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
              Essential information for using the app effectively
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 12, md: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
            <NiPath className="text-secondary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="subtitle2" className="leading-5 transition-colors">
              Examples
            </Typography>
            <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
              Step-by-step guides to get you started
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 12, md: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-accent-1-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
            <NiUsers className="text-accent-1" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="subtitle2" className="leading-5 transition-colors">
              Forums
            </Typography>
            <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
              Connect, share, and solve together in our user community
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 12, md: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-accent-2-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
            <NiTicket className="text-accent-2" size={"large"} />
          </Box>
          <CardContent className="flex w-full flex-row justify-between">
            <Box>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Tickets
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                Submit and track your issues with ease.
              </Typography>
            </Box>
            <Button className="pointer-events-none self-center" size="tiny" color="accent-2" variant="pastel">
              New
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
