"use client";
import AddContactDialog from "../components/add-contact-dialog";
import NewChatDialog from "../components/new-chat-dialog";
import Link from "next/link";
import { useState } from "react";

import { Box, Breadcrumbs, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import NiMessagePlus from "@/icons/nexture/ni-message-plus";
import NiUserPlus from "@/icons/nexture/ni-user-plus";
import { cn } from "@/lib/utils";

export default function Page() {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const onNewDialogClose = () => {
    setNewDialogOpen(false);
  };

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const onAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  return (
    <Box className="relative flex h-full min-h-[calc(100vh-12rem)] flex-col items-center gap-5">
      <Grid container spacing={5} className="w-full" size={12}>
        <Grid container spacing={2.5} className="w-full" size={12}>
          <Grid size={{ md: "grow", xs: 12 }}>
            <Typography variant="h1" component="h1" className="mb-0">
              Messages
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/applications">
                Applications
              </Link>
              <Typography variant="body2">Messages</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
            <Button
              className="surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiMessagePlus size={"medium"} className={cn("transition-transform rtl:rotate-180")} />}
              onClick={() => {
                setNewDialogOpen(true);
              }}
            >
              New Chat
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box className={cn("flex w-full flex-1 flex-col items-center justify-center pb-32 sm:px-4")}>
        <Box className="flex w-full flex-col items-center gap-4">
          <Typography
            variant="h1"
            className="from-primary-dark via-primary to-primary-light inline-block bg-linear-to-r bg-clip-text text-center leading-8 text-transparent rtl:bg-linear-to-l"
          >
            Good Evenning Laura!
          </Typography>

          <Grid size={{ xs: 12 }} container spacing={2.5} className="mt-2 w-full max-w-120">
            <Grid size={{ md: 6, xs: 12 }}>
              <Card
                component={Link}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setNewDialogOpen(true);
                }}
                className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
              >
                <Box className="bg-primary-light/10 flex h-16 w-16 flex-none items-center justify-center rounded-2xl">
                  <NiMessagePlus className="text-primary" size={"large"} />
                </Box>
                <CardContent className="flex items-center">
                  <Typography variant="subtitle2" className="leading-5 transition-colors">
                    New Chat
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <Card
                className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
                component={Link}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setAddDialogOpen(true);
                }}
              >
                <Box className="bg-secondary-light/10 flex h-16 w-16 flex-none items-center justify-center rounded-2xl">
                  <NiUserPlus className="text-secondary" size={"large"} />
                </Box>
                <CardContent className="flex items-center">
                  <Typography variant="subtitle2" className="leading-5 transition-colors">
                    New Contact
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* New chat dialog */}
      {newDialogOpen && <NewChatDialog newDialogOpen={newDialogOpen} onNewDialogClose={onNewDialogClose} />}

      {/* Add contact dialog */}
      {addDialogOpen && <AddContactDialog addDialogOpen={addDialogOpen} onAddDialogClose={onAddDialogClose} />}
    </Box>
  );
}
