import dayjs from "dayjs";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiPen from "@/icons/nexture/ni-pen";
import NiPlus from "@/icons/nexture/ni-plus";
import { cn } from "@/lib/utils";

interface PublicInfoData {
  id: string;
  name: string;
  username: string;
  company: string;
  location: string;
  birthday: string;
  gender: string;
  genderList: string[];
  bio: string;
  file: any;
}

export default function SettingsPublicInfo() {
  const [publicInfo, setPublicInfo] = useState<PublicInfoData>({
    id: "4232-0594-3495",
    name: "Laura Ellis",
    username: "writerofrohan",
    company: "Acorn",
    location: "Berlin, Deutschland",
    birthday: "10/20/1990",
    gender: "Female",
    genderList: ["Female", "Male", "Other", "Not Specified"],
    bio: "Hello there!",
    file: {
      path: "/images/avatars/avatar-1.jpg",
      relativePath: "/images/avatars/avatar-1.jpg",
      preview: "/images/avatars/avatar-1.jpg",
      name: "avatars.jpg",
      size: 34208,
      type: "image/jpeg",
    },
  });

  const handleNameChange = (event: any) => {
    setPublicInfo({ ...publicInfo, name: event.target.value });
  };

  const handleUsernameChange = (event: any) => {
    setPublicInfo({ ...publicInfo, username: event.target.value });
  };

  const handleCompanyChange = (event: any) => {
    setPublicInfo({ ...publicInfo, company: event.target.value });
  };

  const handleGenderChange = (event: any) => {
    setPublicInfo({ ...publicInfo, gender: event.target.value });
  };

  const handleBirthdayChange = (value: any) => {
    setPublicInfo({ ...publicInfo, birthday: dayjs(value).format("MM/DD/YYYY").toString() });
  };

  const handleBioChange = (event: any) => {
    setPublicInfo({ ...publicInfo, bio: event.target.value });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const newFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setPublicInfo({ ...publicInfo, file: newFile });
    },
  });

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Public Information
          </Typography>

          <FormControl
            variant="standard"
            size="small"
            fullWidth
            {...getRootProps({ className: "dropzone outlined lg:flex-row lg:gap-2.5 relative items-start" })}
          >
            <FormLabel component="label" className="min-w-60">
              Picture
            </FormLabel>
            <Box className="relative">
              <Avatar alt="avatar" src={publicInfo.file.preview} className="h-20 w-20 rounded-4xl" />
              <input {...getInputProps()} />
              <Button
                className="icon-only bg-background-paper hover:text-primary hover:bg-background-paper absolute -inset-e-1 -bottom-1"
                size="small"
                color="grey"
                variant="outlined"
                startIcon={publicInfo.file ? <NiPen size={"small"} /> : <NiPlus size={"small"} />}
                onClick={open}
              />
            </Box>
          </FormControl>

          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Name
            </FormLabel>
            <Input placeholder="Name" value={publicInfo.name} onChange={handleNameChange} className="w-full" />
          </FormControl>

          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Username
            </FormLabel>
            <Input placeholder="Name" value={publicInfo.username} onChange={handleUsernameChange} className="w-full" />
          </FormControl>

          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Company
            </FormLabel>
            <Input placeholder="Name" value={publicInfo.company} onChange={handleCompanyChange} className="w-full" />
          </FormControl>

          <FormControl fullWidth variant="standard" className="outlined lg:flex-row lg:gap-2.5">
            <FormLabel component="label" className="min-w-60">
              Birthday
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="mb-0 w-full"
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
                value={dayjs(publicInfo.birthday)}
                onChange={handleBirthdayChange}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth size="small" variant="standard" className="outlined lg:flex-row lg:gap-2.5">
            <FormLabel component="label" className="min-w-60">
              Gender
            </FormLabel>
            <Select
              className="w-full"
              value={publicInfo.gender}
              label="Small"
              onChange={handleGenderChange}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              {publicInfo.genderList.map((gender: string) => {
                return (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className="MuiTextField-root outlined lg:flex-row lg:gap-2.5" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Bio
            </FormLabel>
            <TextareaAutosize
              minRows={2}
              maxRows={2}
              className="MuiInputBase-root MuiInput-root MuiInputBase-formControl outlined autosize w-full"
              placeholder="Description"
              value={publicInfo.bio}
              onChange={handleBioChange}
            />
          </FormControl>

          <Button size="medium" color="primary" variant="outlined">
            Update
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
