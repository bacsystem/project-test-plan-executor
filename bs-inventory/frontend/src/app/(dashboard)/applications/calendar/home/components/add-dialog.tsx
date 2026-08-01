import { Event } from "../../data/events";
import { Participant, participantData } from "../../data/participants";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import * as yup from "yup";

import {
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  Box,
  Button,
  capitalize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiKnobs from "@/icons/nexture/ni-knobs";
import NiStar from "@/icons/nexture/ni-star";
import { cn } from "@/lib/utils";

type PropTypes = {
  addDialogOpen: boolean;
  onAddDialogClose: () => void;
  onSave: (event: Event) => void;
  addStartDate: Date | undefined;
};

export default function AddDialog({ addDialogOpen, onAddDialogClose, addStartDate, onSave }: PropTypes) {
  const [currentParticipant, setCurrentParticipant] = useState<Participant>({
    id: "",
    name: "",
    avatar: "",
  });

  const [participants, setParticipants] = useState<Participant[]>(participantData);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);

  const newEventValidation = yup.object({
    title: yup.string().required("The field is required"),
    details: yup.string().nullable().notRequired(),
    duration: yup.string().required("The field is required"),
    date: yup.date().required("The field is required"),
    repeat: yup.string().required("The field is required"),
  });

  const handleParticipantChange = (_event: SyntheticEvent, value: any) => {
    if (value) {
      const selectedParticipant = participants.find((participant) => {
        return participant.id === value.id;
      });
      setSelectedParticipants([...selectedParticipants, selectedParticipant as Participant]);
      setCurrentParticipant(selectedParticipant as Participant);
      setParticipants(participants.filter((a) => a.id !== selectedParticipant?.id));
    }
    setCurrentParticipant({
      id: "",
      name: "",
      avatar: "",
    });
  };

  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      duration: "All Day",
      date: addStartDate as Date,
      repeat: "No Repeat",
    },
    validationSchema: newEventValidation,
    onSubmit: (values) => {
      const valuesToReturn = {
        id: crypto.randomUUID(),
        title: values.title,
        start: values.date,
        end: values.date,
        allDay: values.duration === "All Day",
        desc: values.desc,
        color: "bg-primary",
        createdBy: "Julian Carter",
        createdByAvatar: "/images/avatars/avatar-3.jpg",
        participants: selectedParticipants,
      } as unknown as Event;

      onSave(valuesToReturn);
      onAddDialogClose();
    },
    validateOnBlur: false,
    validateOnMount: false,
  });

  const removeParticipant = (id: string) => {
    const selectedParticipant = participantData.find((participant) => {
      return participant.id === id;
    });
    setParticipants([...participants, selectedParticipant as Participant]);
    setSelectedParticipants(selectedParticipants.filter((a) => a.id !== id));
  };

  const handleClose = () => {
    formik.resetForm();
    onAddDialogClose();
  };

  return (
    <Dialog maxWidth={"sm"} fullWidth open={addDialogOpen} onClose={handleClose}>
      <Box
        component={"form"}
        className="flex min-h-180 flex-col"
        onSubmit={(event) => {
          setSubmitted(true);
          formik.handleSubmit(event);
        }}
      >
        <DialogTitle>
          <Box className="flex flex-row items-center justify-between">
            <Typography variant="h6" className="leading-5">
              Add Event
            </Typography>
            <Box className="-mt-1 flex flex-row">
              <Button
                className="icon-only"
                size="small"
                color="grey"
                startIcon={<NiCrossFull size="small" />}
                onClick={handleClose}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="flex flex-1 flex-col gap-5">
          <Box className="flex flex-col gap-4">
            <Box className="flex flex-col gap-1">
              <Box className="mb-1 flex flex-row gap-1.5">
                <NiStar />
                <Typography variant="subtitle1">Event</Typography>
              </Box>
              <Box className="ms-6 flex flex-col gap-2">
                <TextField
                  id="title"
                  name="title"
                  variant="filled"
                  label="Title"
                  className="mb-0"
                  size="small"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  id="details"
                  name="details"
                  label="Details"
                  size="small"
                  multiline
                  rows={3}
                  variant="filled"
                  className="mb-0"
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </Box>

            <Box className="flex flex-col gap-1">
              <Box className="mb-1 flex flex-row gap-1.5">
                <NiCalendar />
                <Typography variant="subtitle1">Time</Typography>
              </Box>
              <Box className="ml-6 flex flex-col gap-2">
                <FormControl fullWidth size="small" variant="filled" className="mb-0">
                  <InputLabel>Duration</InputLabel>
                  <Select
                    id="duration"
                    name="duration"
                    label="Duration"
                    IconComponent={NiChevronDownSmall}
                    MenuProps={{ className: "outlined" }}
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={"All Day"}>All Day</MenuItem>
                    <MenuItem value={"Specific Hours"}>Specific Hours</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="filled" className="mb-0">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="date"
                      value={dayjs(formik.values.date)}
                      onChange={(value) => {
                        formik.setFieldValue("date", dayjs(value).toDate(), true);
                      }}
                      label="Date"
                      className="mb-0"
                      slots={{
                        openPickerIcon: (props) => {
                          return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
                        },
                        switchViewIcon: (props) => {
                          return (
                            <NiChevronDownSmall {...props} className={cn(props.className, "text-text-secondary")} />
                          );
                        },
                        leftArrowIcon: (props) => {
                          return (
                            <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />
                          );
                        },
                        rightArrowIcon: (props) => {
                          return (
                            <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />
                          );
                        },
                      }}
                      slotProps={{
                        textField: { size: "small", variant: "filled" },
                        desktopPaper: { className: "outlined" },
                        popper: { className: "z-2000!" },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl fullWidth size="small" variant="filled" className="mb-0">
                  <InputLabel>Repeat</InputLabel>
                  <Select
                    id="repeat"
                    name="repeat"
                    label="Repeat"
                    IconComponent={NiChevronDownSmall}
                    MenuProps={{ className: "outlined" }}
                    value={formik.values.repeat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={"No Repeat"}>No Repeat</MenuItem>
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                    <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                    <MenuItem value={"Yearly"}>Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box className="flex flex-col gap-1">
              <Box className="mb-1 flex flex-row gap-1.5">
                <NiKnobs />
                <Typography variant="subtitle1">Participants</Typography>
              </Box>
              <Box className="ml-6 flex flex-col gap-2">
                {selectedParticipants.length > 0 && (
                  <Box className="bg-grey-25 flex flex-col gap-2 rounded-lg p-1 px-2">
                    {selectedParticipants.map((participant: Participant) => {
                      return (
                        <Box className="flex flex-row justify-between py-0.25" key={participant.id}>
                          <Box className="flex flex-row items-center">
                            <Avatar className="tiny me-3" alt={participant?.name} src={participant?.avatar}>
                              {participant?.name?.charAt(0)}
                            </Avatar>
                            <ListItemText
                              className="w-32 flex-none"
                              primary={
                                <Typography component="p" variant="body1" className="leading-4">
                                  {participant?.name}
                                </Typography>
                              }
                            />
                          </Box>
                          <Button
                            className="icon-only hover:text-primary focus:ring-0! focus:ring-offset-0!"
                            size="small"
                            color="grey"
                            variant="text"
                            startIcon={<NiCross size="small" />}
                            onClick={() => {
                              removeParticipant(participant.id);
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
                <Autocomplete
                  size="small"
                  className="[&>.MuiFormControl-root]:mb-0"
                  options={participants}
                  disableCloseOnSelect
                  popupIcon={<NiChevronDownSmall />}
                  clearIcon={<NiCross />}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => option.id}
                  value={currentParticipant}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box component="li" key={key} {...optionProps}>
                        <Box className="flex flex-row items-center gap-1.5">
                          <Avatar alt={option.name} src={option.avatar} className="rounded-2xs h-5! w-5!" />
                          <Typography>{option.name}</Typography>
                        </Box>
                      </Box>
                    );
                  }}
                  slotProps={{
                    popper: { className: "outlined z-2000!" },
                  }}
                  renderInput={(params) => {
                    return <TextField {...params} variant="filled" size="small" label="Add User" />;
                  }}
                  onChange={handleParticipantChange}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="flex flex-col">
          {submitted && !formik.isValid && (
            <Box className="w-full ps-6">
              <Alert
                severity="error"
                icon={<NiCrossSquare />}
                className="neutral bg-background-paper/60! mb-4 w-full rounded-lg!"
              >
                <AlertTitle variant="subtitle2">The following inputs have errors!</AlertTitle>
                {Object.entries(formik.errors).map(([key, value]) => {
                  return (
                    <Box className="flex flex-row gap-0.5" key={crypto.randomUUID()}>
                      <Typography variant="body2" className="text-error">
                        {capitalize(key)}:
                      </Typography>
                      <Typography variant="body2" className="text-text-primary">
                        {typeof value === "string" ? value : JSON.stringify(value)}
                      </Typography>
                    </Box>
                  );
                })}
              </Alert>
            </Box>
          )}
          <Box className="flex flex-row gap-2 self-end">
            <Button variant="pastel" component={Link} href="/applications/calendar/add-event">
              Advanced Options
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
