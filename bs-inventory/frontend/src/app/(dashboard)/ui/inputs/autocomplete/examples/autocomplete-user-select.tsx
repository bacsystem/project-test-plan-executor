import { useState } from "react";

import {
  Autocomplete,
  Avatar,
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

export default function AutocompleteUserSelect() {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "",
    name: "",
    image: "",
  });

  const handleChange = (event: React.SyntheticEvent, value: any) => {
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

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            User Select
          </Typography>

          <FormControl fullWidth>
            <FormLabel component="label">User</FormLabel>

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
              onChange={handleChange}
            />
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
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
