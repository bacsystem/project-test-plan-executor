"use client";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiSearch from "@/icons/nexture/ni-search";

type PropTypes = {
  newDialogOpen: boolean;
  onNewDialogClose: () => void;
};

export default function NewChatDialog({ newDialogOpen, onNewDialogClose }: PropTypes) {
  const router = useRouter();

  const handleChatNewClick = () => {
    router.push("/applications/messages/chat-new");
  };

  const handleClose = () => {
    onNewDialogClose();
  };

  return (
    <Dialog maxWidth={"sm"} fullWidth open={newDialogOpen} onClose={handleClose}>
      <Box className="flex min-h-180 flex-col">
        <DialogTitle>
          <Box className="flex flex-row items-center justify-between">
            <Typography variant="h6" className="leading-5">
              New Chat
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
        <DialogContent className="flex flex-1 flex-col gap-5 pb-7">
          <Box className="flex flex-1 flex-col gap-4">
            {/* Search */}
            <Box className="flex flex-col gap-1">
              <FormControl variant="standard" className="outlined mb-0 px-2.5" size="small">
                <Input
                  placeholder="Search"
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => {}}>
                        <NiSearch size="medium" className="text-text-secondary" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            {/* A */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                A
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Amelia Carter" src="/images/avatars/avatar-3.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Amelia Carter
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Aaron Johnson" src="/images/avatars/avatar-2.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Aaron Johnson
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Ava Martinez" src="/images/avatars/avatar-7.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Ava Martinez
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Adrian Smith" src="/images/avatars/avatar-9.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Adrian Smith
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Alexander Davis" src="/images/avatars/avatar-12.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Alexander Davis
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Ariana Wilson" src="/images/avatars/avatar-16.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Ariana Wilson
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* B */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                B
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Benjamin Cruz" src="/images/avatars/avatar-15.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Benjamin Cruz
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Brooke Delgado" src="/images/avatars/avatar-14.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Brooke Delgado
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Bruce Schneider" src="/images/avatars/avatar-8.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Bruce Schneider
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* C */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                C
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Clara Nguyen" src="/images/avatars/avatar-13.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Clara Nguyen
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Cameron Ortiz" src="/images/avatars/avatar-7.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Cameron Ortiz
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Chloe Stein" src="/images/avatars/avatar-6.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Chloe Stein
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Cole Harrington" src="/images/avatars/avatar-4.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Cole Harrington
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Connor Vasquez" src="/images/avatars/avatar-8.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Connor Vasquez
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Caroline Fischer" src="/images/avatars/avatar-11.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Caroline Fischer
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* D */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                D
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Daniel Whitaker" src="/images/avatars/avatar-6.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Daniel Whitaker
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="David Chen" src="/images/avatars/avatar-9.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          David Chen
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Daphne Russo" src="/images/avatars/avatar-13.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Daphne Russo
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* E */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                E
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Eleanor Brooks" src="/images/avatars/avatar-2.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Eleanor Brooks
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Emilia Novak" src="/images/avatars/avatar-13.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Emilia Novak
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* F */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                F
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Fiona Clarke" src="/images/avatars/avatar-14.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Fiona Clarke
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Felix Donovan" src="/images/avatars/avatar-7.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Felix Donovan
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Farah Mitchell" src="/images/avatars/avatar-5.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Farah Mitchell
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* K */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                K
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Kai Reynolds" src="/images/avatars/avatar-12.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Kai Reynolds
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Kristian O'Neill" src="/images/avatars/avatar-13.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Kristian O'Neill
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* R */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                R
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Rafael Dominguez" src="/images/avatars/avatar-6.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Rafael Dominguez
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Reese Caldwell" src="/images/avatars/avatar-4.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Reese Caldwell
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Riley Bennett" src="/images/avatars/avatar-3.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Riley Bennett
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Ronan Castillo" src="/images/avatars/avatar-10.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Ronan Castillo
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Ruby Harrington" src="/images/avatars/avatar-8.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Ruby Harrington
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* T */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                T
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Theo Sullivan" src="/images/avatars/avatar-15.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Theo Sullivan
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Talia Brooks" src="/images/avatars/avatar-16.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Talia Brooks
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            {/* Z */}
            <Box className="flex flex-col gap-1">
              <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                Z
              </Typography>

              <List>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Zane Holloway" src="/images/avatars/avatar-4.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Zane Holloway
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Zara Whitman" src="/images/avatars/avatar-14.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Zara Whitman
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Zayd Novak" src="/images/avatars/avatar-2.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Zayd Novak
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Zoe Harrington" src="/images/avatars/avatar-8.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Zoe Harrington
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton
                    classes={{ root: "group items-center px-2.5 rounded-lg" }}
                    onClick={handleChatNewClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Zoe Harrington" src="/images/avatars/avatar-5.jpg" className="small me-2" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                          Zoe Harrington
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
