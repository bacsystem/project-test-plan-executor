"use client";
import AddEventDetails from "./sections/add-event-details";
import AddEventNotification from "./sections/add-event-notification";
import AddEventParticipants from "./sections/add-event-participants";
import Link from "next/link";

import { Breadcrumbs, Button, Grid, Tooltip, Typography } from "@mui/material";

import NiCross from "@/icons/nexture/ni-cross";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";

export default function Page() {
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Add Event
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/calendar">
              Calendar
            </Link>
            <Typography variant="body2">Add Event</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Button
            variant="surface"
            className="surface-standard"
            color="grey"
            startIcon={<NiFloppyDisk size={"medium"} />}
            component={Link}
            href="/applications/calendar/home"
          >
            Save
          </Button>
          <Tooltip title="Close">
            <Button
              className="icon-only surface-standard"
              color="grey"
              variant="surface"
              component={Link}
              href="/applications/calendar/home"
            >
              <NiCross size={"medium"} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={{ "3xl": 9, xl: 8, xs: 12 }}>
          <AddEventDetails />
        </Grid>

        <Grid size={{ "3xl": 3, xl: 4, xs: 12 }}>
          <AddEventParticipants />
          <AddEventNotification />
        </Grid>
      </Grid>
    </Grid>
  );
}
