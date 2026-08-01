"use client";

import { SyntheticEvent, useState } from "react";

import {
  Autocomplete,
  Avatar,
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";
import NextureIcons, { IconName } from "@/icons/nexture-icons";

export default function LPAutocompletes() {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "2220",
    name: "Laura Ellis",
    image: "/images/avatars/avatar-1.jpg",
  });

  const handleChangeUser = (_event: SyntheticEvent, value: any) => {
    if (value) {
      const selectedUser = userData.find((user) => {
        return user.id === value.id;
      });
      setCurrentUser(selectedUser as UserType);
    } else {
      setCurrentUser({
        id: "",
        name: "",
        image: "",
      });
    }
  };

  const [currentIcon, setCurrentIcon] = useState<IconType>({
    id: "3330",
    label: "Announcement",
    code: "NiAnnouncement",
  });

  const handleChangeIcon = (_event: SyntheticEvent, value: any) => {
    if (value) {
      const selectedIcon = iconData.find((icon) => {
        return icon.id === value.id;
      });
      setCurrentIcon(selectedIcon as IconType);
    } else {
      setCurrentIcon({
        id: "",
        label: "",
        code: "",
      });
    }
  };

  return (
    <Card className="w-80 lg:w-64">
      <CardContent>
        <FormControl fullWidth>
          <FormLabel component="label">Icon</FormLabel>

          <Autocomplete
            size="small"
            options={iconData}
            popupIcon={<NiChevronDownSmall />}
            clearIcon={<NiCross />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            autoHighlight
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.label}
            value={currentIcon}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box component="li" key={key} {...optionProps}>
                  <NextureIcons icon={option.code as IconName} size={"medium"} className="me-1.5" />
                  {option.label}
                </Box>
              );
            }}
            slotProps={{
              popper: { className: "outlined" },
              chip: {
                variant: "filled",
                size: "small",
              },
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="standard"
                  className="outlined"
                  placeholder="Icon"
                  slotProps={{
                    htmlInput: {
                      ...params.slotProps.htmlInput,
                      autoComplete: "new-password",
                    },
                    input: {
                      ...params.slotProps.input,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            {currentIcon?.code && (
                              <NextureIcons icon={currentIcon.code as IconName} size={"medium"} className="me-1.5" />
                            )}
                          </InputAdornment>
                          {params.slotProps.input.startAdornment}
                        </>
                      ),
                    },
                  }}
                />
              );
            }}
            onChange={handleChangeIcon}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel component="label">Assignee</FormLabel>

          <Autocomplete
            size="small"
            options={userData}
            popupIcon={<NiChevronDownSmall />}
            clearIcon={<NiCross />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            autoHighlight
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            value={currentUser}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box component="li" key={key} {...optionProps}>
                  <Box className="flex flex-row items-center gap-1.5">
                    <Avatar alt={option.name} src={option.image} className="rounded-2xs h-5! w-5!" />
                    <Typography>{option.name}</Typography>
                  </Box>
                </Box>
              );
            }}
            slotProps={{
              popper: { className: "outlined" },
              chip: {
                variant: "filled",
                size: "small",
              },
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="standard"
                  className="outlined"
                  placeholder="User"
                  slotProps={{
                    htmlInput: {
                      ...params.slotProps.htmlInput,
                      autoComplete: "new-password",
                    },
                    input: {
                      ...params.slotProps.input,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            {currentUser?.image && (
                              <Avatar
                                alt={currentUser.name}
                                src={currentUser.image}
                                className="rounded-2xs me-1.5 h-5! w-5!"
                              />
                            )}
                          </InputAdornment>
                          {params.slotProps.input.startAdornment}
                        </>
                      ),
                    },
                  }}
                />
              );
            }}
            onChange={handleChangeUser}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}

interface UserType {
  id: string;
  name: string;
  image: string;
}

const userData: UserType[] = [
  {
    id: "2220",
    name: "Laura Ellis",
    image: "/images/avatars/avatar-1.jpg",
  },
  {
    id: "2221",
    name: "Daniel Fontaine",
    image: "/images/avatars/avatar-2.jpg",
  },
  {
    id: "2222",
    name: "Sofia Bennett",
    image: "/images/avatars/avatar-3.jpg",
  },
  {
    id: "2223",
    name: "Olivia Castillo",
    image: "/images/avatars/avatar-4.jpg",
  },
  {
    id: "2224",
    name: "Lucas Wright",
    image: "/images/avatars/avatar-5.jpg",
  },
  {
    id: "2225",
    name: "Adrian Patel",
    image: "/images/avatars/avatar-6.jpg",
  },
  {
    id: "2226",
    name: "Henry Lawson",
    image: "/images/avatars/avatar-7.jpg",
  },
  {
    id: "2227",
    name: "Emma Sullivan",
    image: "/images/avatars/avatar-8.jpg",
  },
];

interface IconType {
  id: string;
  label: string;
  code: string;
}

const iconData: IconType[] = [
  {
    id: "3330",
    label: "Announcement",
    code: "NiAnnouncement",
  },
  {
    id: "3331",
    label: "Badge",
    code: "NiBadge",
  },
  {
    id: "3332",
    label: "Calendar",
    code: "NiCalendar",
  },
  {
    id: "3333",
    label: "Dice",
    code: "NiDice",
  },
  {
    id: "3334",
    label: "EmailOpen",
    code: "NiEmailOpen",
  },
  {
    id: "3335",
    label: "Fire",
    code: "NiFire",
  },
  {
    id: "3336",
    label: "Hearts",
    code: "NiHearts",
  },
  {
    id: "3337",
    label: "Integration",
    code: "NiIntegration",
  },
  {
    id: "3338",
    label: "Join",
    code: "NiJoin",
  },
  {
    id: "3339",
    label: "Knobs",
    code: "NiKnobs",
  },
  {
    id: "3340",
    label: "Luggage",
    code: "NiLuggage",
  },
  {
    id: "3341",
    label: "Map",
    code: "NiMap",
  },
  {
    id: "3342",
    label: "Network",
    code: "NiNetwork",
  },
  {
    id: "3343",
    label: "Path",
    code: "NiPath",
  },
  {
    id: "3344",
    label: "Religion",
    code: "NiReligion",
  },
  {
    id: "3345",
    label: "Server",
    code: "NiServer",
  },
  {
    id: "3346",
    label: "Telescope",
    code: "NiTelescope",
  },
  {
    id: "3347",
    label: "Users",
    code: "NiUsers",
  },
  {
    id: "3348",
    label: "Verified",
    code: "NiVerified",
  },
  {
    id: "3349",
    label: "Wallet",
    code: "NiWallet",
  },
  {
    id: "3350",
    label: "ZoomIn",
    code: "NiZoomIn",
  },
];
