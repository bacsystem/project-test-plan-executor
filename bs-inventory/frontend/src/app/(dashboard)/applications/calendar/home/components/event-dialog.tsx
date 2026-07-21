import { Event } from "../../data/events";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import NiBell from "@/icons/nexture/ni-bell";
import NiCalendar from "@/icons/nexture/ni-calendar";
import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiLink from "@/icons/nexture/ni-link";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import { cn } from "@/lib/utils";

type PropTypes = {
  eventDialogOpen: boolean;
  onEventDialogClose: () => void;
  currentEvent: Event | null;
};

export default function EventDialog({ eventDialogOpen, onEventDialogClose, currentEvent }: PropTypes) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
    setTimeout(() => {
      handleTooltipClose();
    }, 2000);
  };

  return (
    <Dialog maxWidth={"sm"} fullWidth open={eventDialogOpen} onClose={onEventDialogClose}>
      <DialogTitle>
        <Box className="flex flex-row items-center justify-between">
          <Box className="flex flex-row items-center gap-2">
            <Box className={cn("rounded-2xs h-4 w-4", currentEvent?.color)} />
            <Typography variant="h6" className="leading-5">
              {currentEvent?.title}
            </Typography>
          </Box>
          <Box className="-mt-1 flex flex-row">
            <Button className="icon-only" size="small" color="grey" startIcon={<NiEllipsisHorizontal size="small" />} />
            <Button
              className="icon-only"
              size="small"
              color="grey"
              startIcon={<NiPenSquare size="small" />}
              component={Link}
              href="/applications/calendar/add-event"
            />
            <Button
              className="icon-only"
              size="small"
              color="grey"
              startIcon={<NiCrossFull size="small" />}
              onClick={onEventDialogClose}
            />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className="ms-6 flex flex-col gap-4">
        <Box className="flex flex-col gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle1">Date</Typography>
            <Box className="flex flex-row gap-1.5">
              <NiCalendar />
              {currentEvent?.allDay ? (
                <Typography variant="body1">
                  {dayjs(currentEvent?.end).diff(currentEvent?.start, "day") < 1
                    ? dayjs(currentEvent?.start).format("MMMM D, YYYY")
                    : dayjs(currentEvent?.start).format("MMMM D") +
                      " - " +
                      dayjs(currentEvent?.end).format("MMMM D, YYYY")}
                </Typography>
              ) : (
                <Typography variant="body1">
                  {dayjs(currentEvent?.start).format("MMMM D, YYYY")} ⋅ {dayjs(currentEvent?.start).format("hhA")} -{" "}
                  {dayjs(currentEvent?.end).format("hhA")}
                </Typography>
              )}
            </Box>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle1">Notification</Typography>
            <Box className="flex flex-row gap-1.5">
              <NiBell />
              <Typography variant="body1">10 minutes before</Typography>
            </Box>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle1">Meeting Link</Typography>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Box>
                <Tooltip
                  arrow
                  placement="top"
                  onClose={handleTooltipClose}
                  open={tooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Link Copied!"
                  slotProps={{
                    popper: {
                      disablePortal: true,
                    },
                  }}
                >
                  <Link
                    href={"#"}
                    className="hover:text-primary flex flex-row gap-1.5"
                    onClick={() => {
                      navigator.clipboard.writeText("/calendar/events/15784-48521").then(() => {
                        handleTooltipOpen();
                      });
                    }}
                  >
                    <NiLink />
                    <Box>/calendar/events/15784-48521</Box>
                  </Link>
                </Tooltip>
              </Box>
            </ClickAwayListener>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle1">Created By</Typography>
            <Box className="flex flex-row">
              <Box className="flex flex-row items-center">
                <Avatar className="small me-3" alt={currentEvent?.createdBy} src={currentEvent?.createdByAvatar}>
                  {currentEvent?.createdBy?.charAt(0)}
                </Avatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="body1" className="leading-4">
                      {currentEvent?.createdBy}
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Box>
          {currentEvent && currentEvent.participants && currentEvent.participants.length > 0 && (
            <Box className="flex flex-col gap-1">
              <Typography variant="subtitle1">Participants</Typography>
              <Box className="flex flex-row">
                <AvatarGroup max={10} className="medium justify-end">
                  {currentEvent.participants.map((participant, index) => {
                    return (
                      <Avatar alt={participant.name} src={participant.avatar} key={index}>
                        <NiCalendar size="medium" oneTone />
                      </Avatar>
                    );
                  })}
                </AvatarGroup>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="pastel" onClick={onEventDialogClose}>
          Close
        </Button>
        <Button onClick={onEventDialogClose} variant="contained">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}
