import NextLink from "next/link";

import { Box, Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";

import NiExternal from "@/icons/nexture/ni-external";
import NiInternal from "@/icons/nexture/ni-internal";

export default function ButtonLink() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Link Buttons
          </Typography>
          <Box className="flex flex-row gap-2">
            <Button
              variant="pastel"
              size="medium"
              color="primary"
              startIcon={<NiInternal size={20} />}
              href="/ui/inputs"
              component={NextLink}
            >
              Next Link
            </Button>
            <Button
              variant="pastel"
              size="medium"
              color="secondary"
              startIcon={<NiExternal size={20} />}
              href="https://themeforest.net"
              target="_blank"
              component={Link}
            >
              MUI Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
