import { useState } from "react";

import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";
import NextureIcons, { IconName } from "@/icons/nexture-icons";

export default function AutocompleteIconSelect() {
  const [currentIcon, setCurrentIcon] = useState<IconType>({
    id: "",
    label: "",
    code: "",
  });

  const handleChange = (event: React.SyntheticEvent, value: any) => {
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
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Icon Select
          </Typography>

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
              onChange={handleChange}
            />
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}

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
