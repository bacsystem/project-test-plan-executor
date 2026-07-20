"use client";
import Link from "next/link";
import React from "react";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  Pagination,
  PaginationItem,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";

import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiController from "@/icons/nexture/ni-controller";
import NiDirectory from "@/icons/nexture/ni-directory";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiFilter from "@/icons/nexture/ni-filter";
import NiSearch from "@/icons/nexture/ni-search";
import NiStructure from "@/icons/nexture/ni-structure";
import NiUsers from "@/icons/nexture/ni-users";

export default function Page() {
  const [tabValue, setTabValue] = React.useState("All");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Search
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/pages">
              Pages
            </Link>
            <Link color="inherit" href="/pages/miscellaneous">
              Miscellaneous
            </Link>
            <Typography variant="body2">Search</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            className="bg-background-paper shadow-darker-xs mb-0 rounded-md"
            slotProps={{
              list: {
                className: "flex flex-row px-2 py-0.25",
              },
            }}
          >
            <Tab
              icon={<NiStructure size="medium" />}
              iconPosition="start"
              label={<Box className="hidden md:flex">All</Box>}
              value="All"
              className="hover:text-primary border-none! px-2.5! hover:bg-transparent!"
            />
            <Tab
              icon={<NiDocumentImage size="medium" />}
              iconPosition="start"
              label={<Box className="hidden md:flex">Products</Box>}
              value="Products"
              className="hover:text-primary border-none! px-2.5! hover:bg-transparent!"
            />
            <Tab
              icon={<NiDirectory size="medium" />}
              iconPosition="start"
              label={<Box className="hidden md:flex">Categories</Box>}
              value="Categories"
              className="hover:text-primary border-none! px-2.5! hover:bg-transparent!"
            />
            <Tab
              icon={<NiUsers size="medium" />}
              iconPosition="start"
              label={<Box className="hidden md:flex">Users</Box>}
              value="Users"
              className="hover:text-primary border-none! px-2.5! hover:bg-transparent!"
            />
          </Tabs>

          <Tooltip title="Filter">
            <Button className="icon-only surface-standard" color="grey" variant="surface">
              <NiFilter size={"medium"} />
            </Button>
          </Tooltip>
          <Tooltip title="Download">
            <Button className="icon-only surface-standard" color="grey" variant="surface">
              <NiArrowInDown size={"medium"} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid size={{ xs: 12 }}>
          <FormControl variant="filled" size="medium" className="surface mb-0" fullWidth>
            <InputLabel>Search</InputLabel>
            <FilledInput
              defaultValue=""
              placeholder="Type to search projects..."
              endAdornment={
                <>
                  <InputAdornment position="end">
                    <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                  </InputAdornment>
                </>
              }
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-1.jpg"}></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Laura Ellis
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /users/liam-carter-54181
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiUsers className="text-primary!" size={"small"} />}
                  >
                    Users
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar
                      className="medium me-3"
                      alt={"Olivia Peterson"}
                      src={"/images/avatars/avatar-2.jpg"}
                    ></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Olivia Peterson
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /users/olivia-peterson-54182
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiUsers className="text-primary!" size={"small"} />}
                  >
                    Users
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar
                      className="medium me-3"
                      alt={"William Foster"}
                      src={"/images/avatars/avatar-3.jpg"}
                    ></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          William Foster
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /users/william-foster-54183
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiUsers className="text-primary!" size={"small"} />}
                  >
                    Users
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar className="medium me-3" alt={"Ava Hamilton"} src={"/images/avatars/avatar-4.jpg"}></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Ava Hamilton
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /users/ava-hamilton-54184
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiUsers className="text-primary!" size={"small"} />}
                  >
                    Users
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar className="medium me-3" alt={"Ethan Cooper"} src={"/images/avatars/avatar-5.jpg"}></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Ethan Cooper
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /users/ethan-cooper-54185
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiUsers className="text-primary!" size={"small"} />}
                  >
                    Users
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar className="medium me-3" alt={"Paperwork"} src={"/images/products/product-1.jpg"}></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Paperwork
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /products/paperwork-24871
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiDocumentImage className="text-secondary!" size={"small"} />}
                  >
                    Products
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar
                      className="medium me-3"
                      alt={"Pony Soprano"}
                      src={"/images/products/product-2.jpg"}
                    ></Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Pony Soprano
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /products/pony-soprano-24872
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiDocumentImage className="text-secondary!" size={"small"} />}
                  >
                    Products
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar className="medium bg-primary-light/10 me-3">
                      <NiController className="text-primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Electronic Devices
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /categories/electronic-devices
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiDirectory className="text-accent-1!" size={"small"} />}
                  >
                    Categories
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>

          <Card className="mb-2.5 flex">
            <CardContent className="flex flex-col gap-2">
              <Box className="flex flex-row items-start justify-between">
                <Box className="group flex flex-row items-center" component="a" href="#">
                  <ListItemAvatar>
                    <Avatar className="medium bg-primary-light/10 me-3">
                      <NiController className="text-primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <Box className="flex flex-col">
                    <ListItemText
                      className="flex-none"
                      primary={
                        <Typography component="p" variant="body1" className="group-hover:text-primary leading-4">
                          Digital Products
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="text-text-secondary -mt-1">
                      /categories/digital-products
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row">
                  <Button
                    size="small"
                    color="grey"
                    variant="text"
                    className="hidden text-sm! md:flex"
                    startIcon={<NiDirectory className="text-accent-1!" size={"small"} />}
                  >
                    Categories
                  </Button>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Box>
              </Box>
              <Typography className="ps-12">
                To create an account, click the Sign Up button on the homepage. Fill in the required fields, including
                your name, email address, and a secure password. Once you have submitted your information, you will
                receive a confirmation email. Click the link in the email to activate your account and start using the
                application.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12} className="flex justify-center">
          <Pagination
            size="medium"
            className="surface-standard"
            count={3}
            renderItem={(item) => (
              <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
