"use client";

import { Event, eventData } from "../data/events";
import AddDialog from "./components/add-dialog";
import EventDialog from "./components/event-dialog";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import { Calendar, dayjsLocalizer, Navigate, ToolbarProps, View } from "react-big-calendar";

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Typography,
} from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

const djLocalizer = dayjsLocalizer(dayjs);

export default function Page() {
  const [events, setEvents] = useState(eventData);
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [currentEvent, setCurrentEvent] = useState<null | Event>(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [addStartDate, setAddStartDate] = useState<Date>();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleEventClick = () => {
    setEventDialogOpen(true);
  };

  const onEventDialogClose = () => {
    setEventDialogOpen(false);
  };

  const onAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const CustomToolbar = ({ label, localizer, onNavigate, view, onView, views }: ToolbarProps<Event>) => {
    const [viewMenuAnchorEl, setViewMenuAnchorEl] = useState<EventTarget | Element | PopoverVirtualElement | null>(
      null,
    );
    const openViewMenu = Boolean(viewMenuAnchorEl);
    const handleClickViewMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setViewMenuAnchorEl(event.currentTarget);
    };
    const handleCloseViewMenu = () => {
      setViewMenuAnchorEl(null);
    };

    return (
      <Grid container spacing={2.5} className="mb-5 w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            {label}
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Typography variant="body2">Calendar</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-4">
          <Box className="flex flex-row gap-1">
            <Button
              className="surface-standard icon-only"
              size="medium"
              color="grey"
              variant="surface"
              onClick={() => {
                onNavigate(Navigate.PREVIOUS);
              }}
              startIcon={<NiChevronLeftSmall size={"medium"} />}
            ></Button>
            <Button
              className="surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              onClick={() => {
                onNavigate(Navigate.TODAY);
              }}
            >
              {localizer.messages.today}
            </Button>
            <Button
              className="surface-standard icon-only"
              size="medium"
              color="grey"
              variant="surface"
              onClick={() => {
                onNavigate(Navigate.NEXT);
              }}
              startIcon={<NiChevronRightSmall size={"medium"} />}
            ></Button>
          </Box>
          <Button
            className="surface-standard"
            size="medium"
            color="grey"
            variant="surface"
            onClick={handleClickViewMenu}
            endIcon={
              <NiChevronRightSmall
                size={"medium"}
                className={cn("transition-transform rtl:rotate-180", openViewMenu && "rotate-90 rtl:rotate-90")}
              />
            }
          >
            {localizer.messages[view]}
          </Button>

          <Menu
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorEl={viewMenuAnchorEl as Element}
            open={openViewMenu}
            onClose={handleCloseViewMenu}
            className="mt-1"
          >
            {Array.isArray(views) &&
              views.map((name) => {
                return (
                  <MenuItem
                    key={name}
                    onClick={() => {
                      onView(name);
                      handleCloseViewMenu();
                    }}
                  >
                    <ListItemText>{localizer.messages[name]}</ListItemText>
                  </MenuItem>
                );
              })}
          </Menu>
        </Grid>
      </Grid>
    );
  };

  const eventClassGetter = (event: Event) => {
    return { className: cn(event.allDay ? event.color : "before-" + event.color) };
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setAddStartDate(start);
    setAddDialogOpen(true);
  };

  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  return (
    <Box className="relative flex h-full min-h-[calc(100vh-12rem)] flex-col items-center gap-5">
      <Calendar
        defaultDate={new Date()}
        events={events}
        localizer={djLocalizer}
        showMultiDayTimes
        step={60}
        min={new Date(2026, 10, 0, 6, 0, 0)}
        max={new Date(2026, 10, 0, 23, 59, 59)}
        view={currentView}
        onView={setCurrentView}
        views={["day", "work_week", "month"]}
        timeslots={1}
        className="min-h-160 w-full flex-1"
        eventPropGetter={eventClassGetter}
        components={{
          toolbar: CustomToolbar,
        }}
        date={currentDate}
        onNavigate={(date) => {
          setCurrentDate(date);
        }}
        onSelectEvent={(event: Event) => {
          setCurrentEvent(event);
          handleEventClick();
        }}
        popup
        selectable
        onSelectSlot={handleSelectSlot}
      />

      {/* Event add dialog */}
      {addDialogOpen && (
        <AddDialog
          addDialogOpen={addDialogOpen}
          onAddDialogClose={onAddDialogClose}
          addStartDate={addStartDate}
          onSave={addEvent}
        />
      )}

      {/* Event detail dialog */}
      {eventDialogOpen && (
        <EventDialog
          currentEvent={currentEvent}
          eventDialogOpen={eventDialogOpen}
          onEventDialogClose={onEventDialogClose}
        />
      )}
    </Box>
  );
}
