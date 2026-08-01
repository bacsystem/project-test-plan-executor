import { Event } from "../../data/events";
import dayjs from "dayjs";
import Link from "next/link";
import Icons from "quill/ui/icons";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactQuill from "react-quill-new";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCode from "@/icons/nexture/ni-code";
import NiDocumentCode from "@/icons/nexture/ni-document-code";
import NiLink from "@/icons/nexture/ni-link";
import NiList from "@/icons/nexture/ni-list";
import NiListCheck from "@/icons/nexture/ni-list-check";
import NiListNumber from "@/icons/nexture/ni-list-number";
import NiTextBold from "@/icons/nexture/ni-text-bold";
import NiTextItalic from "@/icons/nexture/ni-text-italic";
import NiTextQuote from "@/icons/nexture/ni-text-quote";
import NiTextStrikethrough from "@/icons/nexture/ni-text-strikethrough";
import { cn } from "@/lib/utils";

export default function AddEventDetails() {
  const startOfMonth = dayjs().startOf("month");
  const dayOfWeek = startOfMonth.day();
  const offset = (9 - dayOfWeek) % 7;
  const demoDateStart = startOfMonth.add(offset, "day");

  useEffect(() => {
    Icons["bold"] = ReactDOMServer.renderToString(<NiTextBold size={"tiny"} />);
    Icons["italic"] = ReactDOMServer.renderToString(<NiTextItalic size={"tiny"} />);
    Icons["strike"] = ReactDOMServer.renderToString(<NiTextStrikethrough size={"tiny"} />);
    Icons["code-block"] = ReactDOMServer.renderToString(<NiCode size={"tiny"} />);
    Icons["code"] = ReactDOMServer.renderToString(<NiDocumentCode size={"tiny"} />);
    Icons["link"] = ReactDOMServer.renderToString(<NiLink size={"tiny"} />);
    Icons["blockquote"] = ReactDOMServer.renderToString(<NiTextQuote size={"tiny"} />);
    Icons["list"] = {
      ordered: ReactDOMServer.renderToString(<NiListNumber size={"tiny"} />),
      bullet: ReactDOMServer.renderToString(<NiList size={"tiny"} />),
      check: ReactDOMServer.renderToString(<NiListCheck size={"tiny"} />),
    };
  });

  const [eventInfo, setEventInfo] = useState<Event>({
    id: crypto.randomUUID(),
    title: "Sprint Planning",
    start: demoDateStart.add(10, "hour").toDate(),
    end: demoDateStart.add(10, "hour").toDate(),
    allDay: true,
    color: "bg-primary",
    createdBy: "Daniel Fontaine",
    createdByAvatar: "/images/avatars/avatar-4.jpg",
    participants: [
      { id: crypto.randomUUID(), name: "Remy Sharp", avatar: "/images/avatars/avatar-1.jpg" },
      { id: crypto.randomUUID(), name: "Travis Howard", avatar: "/images/avatars/avatar-2.jpg" },
      { id: crypto.randomUUID(), name: "Cindy Baker", avatar: "/images/avatars/avatar-3.jpg" },
      { id: crypto.randomUUID(), name: "Agnes Walker", avatar: "/images/avatars/avatar-4.jpg" },
      { id: crypto.randomUUID(), name: "Liam Carter", avatar: "/images/avatars/avatar-5.jpg" },
    ],
    repeat: "No Repeat",
    calendar: "Work",
    desc: "This is a text editor!",
  });

  const handleTitleChange = (event: any) => {
    setEventInfo({ ...eventInfo, title: event.target.value });
  };

  const handleDurationChange = (event: any) => {
    setEventInfo({ ...eventInfo, allDay: event.target.value === "All Day" });
  };

  const handleRepeatChange = (event: any) => {
    setEventInfo({ ...eventInfo, repeat: event.target.value });
  };

  const handleCalendarChange = (event: any) => {
    setEventInfo({ ...eventInfo, calendar: event.target.value });
  };

  const handleDescChange = (value: any) => {
    setEventInfo({ ...eventInfo, desc: value });
  };

  const handleStartChange = (value: any) => {
    setEventInfo({ ...eventInfo, start: dayjs(value).toDate() });
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Event Details
        </Typography>

        <Box className="flex flex-col items-start">
          <FormControl className="outlined" variant="standard" size="small" fullWidth>
            <FormLabel component="label">Title</FormLabel>
            <Input placeholder="Title" value={eventInfo.title} onChange={handleTitleChange} />
          </FormControl>

          <FormControl variant="standard" className="outlined w-sm max-w-full">
            <FormLabel component="label">Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="mb-0"
                slots={{
                  openPickerIcon: (props) => {
                    return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
                  },
                  switchViewIcon: (props) => {
                    return <NiChevronDownSmall {...props} className={cn(props.className, "text-text-secondary")} />;
                  },
                  leftArrowIcon: (props) => {
                    return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
                  },
                  rightArrowIcon: (props) => {
                    return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
                  },
                }}
                slotProps={{
                  textField: { size: "small", variant: "standard" },
                  desktopPaper: { className: "outlined" },
                }}
                onChange={handleStartChange}
                value={dayjs(eventInfo.start)}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl size="small" variant="standard" className="outlined w-sm max-w-full">
            <FormLabel component="label">Duration</FormLabel>
            <Select
              value={eventInfo.allDay ? "All Day" : "Specific Hours"}
              label="Small"
              onChange={handleDurationChange}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              <MenuItem value={"All Day"}>All Day</MenuItem>
              <MenuItem value={"Specific Hours"}>Specific Hours</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" variant="standard" className="outlined w-sm max-w-full">
            <FormLabel component="label">Repeat</FormLabel>
            <Select
              value={eventInfo.repeat}
              label="Small"
              onChange={handleRepeatChange}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              <MenuItem value={"No Repeat"}>No Repeat</MenuItem>
              <MenuItem value={"Daily"}>Daily</MenuItem>
              <MenuItem value={"Weekly"}>Weekly</MenuItem>
              <MenuItem value={"Monthly"}>Monthly</MenuItem>
              <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
              <MenuItem value={"Yearly"}>Yearly</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" variant="standard" className="outlined w-sm max-w-full">
            <FormLabel component="label">Calendar</FormLabel>
            <Select
              value={eventInfo.calendar}
              label="Small"
              onChange={handleCalendarChange}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              <MenuItem value={"Work"}>Work</MenuItem>
              <MenuItem value={"Personal"}>Personal</MenuItem>
              <MenuItem value={"Birthday"}>Birthday</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="MuiTextField-root outlined" fullWidth>
            <FormLabel component="label">Details</FormLabel>
            <ReactQuill
              modules={{
                toolbar: [
                  ["bold", "italic", "strike"],
                  ["blockquote", "code-block", "code"],
                  [{ list: "ordered" }, { list: "bullet" }],
                ],
              }}
              placeholder="Composition"
              theme="snow"
              value={eventInfo.desc}
              onChange={handleDescChange}
              className="outlined [&_.ql-editor]:max-h-120 [&_.ql-editor]:min-h-80"
            />
          </FormControl>

          <Box className="flex gap-1">
            <Button variant="contained" color="primary" component={Link} href="/applications/calendar/home">
              Save
            </Button>
            <Button variant="pastel" color="primary" component={Link} href="/applications/calendar/home">
              Close
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
