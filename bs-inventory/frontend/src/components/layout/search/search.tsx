import React, { useEffect } from "react";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";

import NiBriefcase from "@/icons/nexture/ni-briefcase";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiController from "@/icons/nexture/ni-controller";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDirectory from "@/icons/nexture/ni-directory";
import NiDocumentCode from "@/icons/nexture/ni-document-code";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiPlus from "@/icons/nexture/ni-plus";
import NiSearch from "@/icons/nexture/ni-search";
import NiSlashHexagon from "@/icons/nexture/ni-slash-hexagon";
import NiStructure from "@/icons/nexture/ni-structure";
import NiUsers from "@/icons/nexture/ni-users";
import { cn } from "@/lib/utils";

export default function Search() {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  const [tooltipShow, setTooltipShow] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        handleClickOpenDialog();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const [tabValue] = React.useState("all");

  return (
    <>
      <Tooltip title={`Search (${isMac ? "cmd" : "ctrl"}+k)`} placement="bottom" arrow open={!open && tooltipShow}>
        <Button
          variant="surface"
          size="large"
          color="text-primary"
          className={cn(
            "icon-only hover-icon-shrink [&.active]:text-primary! hover:bg-grey-25",
            open && "active bg-grey-25 text-primary!",
          )}
          onClick={handleClickOpenDialog}
          onMouseEnter={() => setTooltipShow(true)}
          onMouseLeave={() => setTooltipShow(false)}
          startIcon={<NiSearch variant={open ? "contained" : "outlined"} size={24} />}
        />
      </Tooltip>

      <Dialog
        onClose={handleCloseDialog}
        open={open}
        maxWidth="md"
        fullWidth
        classes={{ container: "items-start", paper: "mt-16" }}
      >
        <DialogTitle className="border-grey-100 border-b py-0!">
          <Input
            autoFocus
            classes={{ input: "ps-0!" }}
            className="w-full py-7!"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <NiSearch size="medium" />
              </InputAdornment>
            }
          />
        </DialogTitle>
        <DialogContent className="flex flex-col pt-6 pb-0">
          <TabContext value={tabValue}>
            <Tabs
              variant="scrollable"
              allowScrollButtonsMobile
              slots={{
                endScrollButtonIcon: () => {
                  return <NiChevronRightSmall size="medium" />;
                },
                startScrollButtonIcon: () => {
                  return <NiChevronLeftSmall size="medium" />;
                },
              }}
              className="flex-none"
              value={tabValue}
            >
              <Tab
                icon={<NiStructure size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">All</Box>}
                value="all"
              />
              <Tab
                icon={<NiDocumentImage size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">Products</Box>}
                value="products"
              />
              <Tab
                icon={<NiDirectory size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">Categories</Box>}
                value="categories"
              />
              <Tab
                icon={<NiUsers size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">Users</Box>}
                value="users"
              />
              <Tab
                icon={<NiSlashHexagon size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">No Result</Box>}
                value="result"
              />
            </Tabs>
            <TabPanel value="all" className="p-0">
              <Box className="flex flex-col gap-2.5">
                <Box>
                  <Typography variant="body2" className="text-text-disabled mb-2 font-medium">
                    Recent
                  </Typography>
                  <List>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar alt="Olivia Bennett" src="/images/products/product-1.jpg" className="me-3" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Stretchy
                            </Typography>
                          }
                          secondary="/products/wooden-toys"
                        />
                        <Button
                          className="pointer-events-none self-center"
                          size="tiny"
                          color="success"
                          variant="pastel"
                          startIcon={<NiCheckSquare size={"tiny"} />}
                        >
                          Active
                        </Button>
                      </ListItemButton>
                    </ListItem>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar alt="Olivia Bennett" src="/images/products/product-2.jpg" className="me-3" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Pony Soprano
                            </Typography>
                          }
                          secondary="/products/wooden-toys"
                        />
                        <Button
                          className="pointer-events-none self-center"
                          size="tiny"
                          color="success"
                          variant="pastel"
                          startIcon={<NiCheckSquare size={"tiny"} />}
                        >
                          Active
                        </Button>
                      </ListItemButton>
                    </ListItem>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar alt="Olivia Bennett" src="/images/products/product-3.jpg" className="me-3" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Buck Rogers
                            </Typography>
                          }
                          secondary="/products/wooden-toys"
                        />
                        <Button
                          className="pointer-events-none self-center"
                          size="tiny"
                          color="grey"
                          variant="pastel"
                          startIcon={<NiCrossSquare size={"tiny"} />}
                        >
                          Inactive
                        </Button>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" className="text-text-disabled mb-2 font-medium">
                    Categories
                  </Typography>
                  <List>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar className="medium bg-primary-light/10 me-3">
                            <NiController size="medium" className="text-primary" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Electronic Devices
                            </Typography>
                          }
                          secondary="314 products"
                        />
                        <Box className="flex flex-row gap-1">
                          <Button
                            className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiPlus size={"small"} />}
                          />
                          <Button
                            className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiEllipsisHorizontal size={"small"} />}
                          />
                        </Box>
                      </ListItemButton>
                    </ListItem>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar className="medium bg-secondary-light/10 me-3">
                            <NiDocumentCode size="medium" className="text-secondary" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Digital Products
                            </Typography>
                          }
                          secondary="14 products"
                        />
                        <Box className="flex flex-row gap-1">
                          <Button
                            className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiPlus size={"small"} />}
                          />
                          <Button
                            className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiEllipsisHorizontal size={"small"} />}
                          />
                        </Box>
                      </ListItemButton>
                    </ListItem>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar className="medium bg-accent-1/10 me-3">
                            <NiBriefcase size="medium" className="text-accent-1" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Bags
                            </Typography>
                          }
                          secondary="24 products"
                        />
                        <Box className="flex flex-row gap-1">
                          <Button
                            className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiPlus size={"small"} />}
                          />
                          <Button
                            className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiEllipsisHorizontal size={"small"} />}
                          />
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" className="text-text-disabled mb-2 font-medium">
                    Users
                  </Typography>
                  <List>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar alt="Zoila Vittorino" src="/images/avatars/avatar-1.jpg" className="me-3" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Zoila Vittorino
                            </Typography>
                          }
                          secondary="zoila.vittorino@acorn.dev"
                        />
                        <Button
                          className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                          size="tiny"
                          color="grey"
                          variant="text"
                          startIcon={<NiEllipsisHorizontal size={"small"} />}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" className="me-3" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Travis Howard
                            </Typography>
                          }
                          secondary="travis.howard@acorn.dev"
                        />
                        <Button
                          className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                          size="tiny"
                          color="grey"
                          variant="text"
                          startIcon={<NiEllipsisHorizontal size={"small"} />}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem className="p-0">
                      <ListItemButton classes={{ root: "group items-start" }}>
                        <ListItemAvatar>
                          <Avatar alt="Olivia Bennett" src="/images/avatars/avatar-3.jpg" className="me-3" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" className="leading-4" variant="body1">
                              Olivia Bennett
                            </Typography>
                          }
                          secondary="olivia.bennett@acorn.dev"
                        />
                        <Button
                          className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 flex-none opacity-0 group-hover:opacity-100"
                          size="tiny"
                          color="grey"
                          variant="text"
                          startIcon={<NiEllipsisHorizontal size={"small"} />}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions className="justify-center">
          <Button variant="text" size="tiny" color="primary">
            Advanced Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
