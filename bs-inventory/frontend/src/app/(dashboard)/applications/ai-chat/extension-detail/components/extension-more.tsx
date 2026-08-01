"use client";

import Link from "next/link";

import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ExtensionMore() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          More From Acorn
        </Typography>
        <Grid container size={12} className="w-full" spacing={2.5}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Card className="outline-grey-50 rounded-lg shadow-none">
              <CardContent className="flex flex-col">
                <Box className="mb-4 flex flex-row justify-between">
                  <Link
                    href="/applications/ai-chat/extension-detail?extension=flash"
                    className="transition-all hover:scale-110"
                  >
                    <Avatar className="large me-3" src="/images/icons/message-icon.png" alt="Grammar Checker"></Avatar>
                  </Link>

                  <Box className="flex flex-row items-center gap-4">
                    <Typography variant="body2">274,521 Users</Typography>
                    <Button variant="outlined" color="grey" size="tiny">
                      Install
                    </Button>
                  </Box>
                </Box>

                <Box className="mb-4">
                  <Link
                    href="/applications/ai-chat/extension-detail?extension=flash"
                    className="link-text-primary link-underline-hover"
                  >
                    <Typography variant="subtitle2">Grammar Checker</Typography>
                  </Link>

                  <Typography variant="body2" className="text-text-secondary mb-3">
                    Writing
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Polish your writing with AI precision. Instantly fix grammar, enhance style, and boost clarity
                    across emails, documents, and content—so you always...
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Card className="outline-grey-50 rounded-lg shadow-none">
              <CardContent className="flex flex-col">
                <Box className="mb-4 flex flex-row justify-between">
                  <Link
                    href="/applications/ai-chat/extension-detail?extension=flash"
                    className="transition-all hover:scale-110"
                  >
                    <Avatar className="large me-3" src="/images/icons/music-icon.png" alt="Grammar Checker"></Avatar>
                  </Link>

                  <Box className="flex flex-row items-center gap-4">
                    <Typography variant="body2">187,114 Users</Typography>
                    <Button variant="outlined" color="grey" size="tiny">
                      Install
                    </Button>
                  </Box>
                </Box>

                <Box className="mb-4">
                  <Link
                    href="/applications/ai-chat/extension-detail?extension=flash"
                    className="link-text-primary link-underline-hover"
                  >
                    <Typography variant="subtitle2">Melody Maker</Typography>
                  </Link>

                  <Typography variant="body2" className="text-text-secondary mb-3">
                    Lifestyle
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Music creation app that helps users compose original melodies, harmonize tracks, and explore
                    different musical styles. It offers intuitive tools for songwriti...
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
