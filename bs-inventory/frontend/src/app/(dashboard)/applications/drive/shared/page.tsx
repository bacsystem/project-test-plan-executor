"use client";

import DriveLightbox from "../components/drive-lightbox";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { SyntheticEvent, useCallback, useState } from "react";

import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  capitalize,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ColumnsPanelTrigger,
  DataGrid,
  ExportCsv,
  ExportPrint,
  FilterPanelTrigger,
  getGridDateOperators,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  Toolbar,
  useGridApiRef,
} from "@mui/x-data-grid";

import DataGridDateTimeFilter from "@/components/data-grid/data-grid-date-time-filter";
import { DataGridPaginationFullPage } from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiPrinter from "@/icons/nexture/ni-printer";
import NiSearch from "@/icons/nexture/ni-search";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

const initialRows = [
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Brand_Logo_Background.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(5, "days").toDate(),
    starred: false,
    size: 280000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Brand_Logo_Horizontal_White.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(5, "days").toDate(),
    starred: false,
    size: 620000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Brand_Logo_Vertical_Black.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(5, "days").toDate(),
    starred: false,
    size: 440000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Brand_Logo_Horizontal_Black.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(5, "days").toDate(),
    starred: false,
    size: 320000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Brand_Logo_Vertical_White.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(5, "days").toDate(),
    starred: false,
    size: 280000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Website_Banner_CTA.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(5, "days").toDate(),
    starred: false,
    size: 180000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Hero_Image_Homepage.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    sharedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 560000,
    location: { path: "/applications/drive/folder", label: "Images" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-2-light/10",
    iconColor: "text-accent-2",
    icon: "NiDocumentNumber",
    name: "Email_Performance_Report.xlsx",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-4.jpg",
    sharedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 420000,
    location: { path: "/applications/drive/folder", label: "Reports" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-2-light/10",
    iconColor: "text-accent-2",
    icon: "NiDocumentNumber",
    name: "Social_Engagement_Metrics.xlsx",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-4.jpg",
    sharedAt: dayjs().subtract(8, "days").toDate(),
    starred: false,
    size: 380000,
    location: { path: "/applications/drive/folder", label: "Reports" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-2-light/10",
    iconColor: "text-accent-2",
    icon: "NiDocumentNumber",
    name: "Ad_Spend_Tracker_Q3.xlsx",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-4.jpg",
    sharedAt: dayjs().subtract(11, "days").toDate(),
    starred: false,
    size: 320000,
    location: { path: "/applications/drive/folder", label: "Reports" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Brand_Voice_Guidelines.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    sharedAt: dayjs().subtract(10, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Social_Media_Calendar.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    sharedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 420000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Email_Funnel.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    sharedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Messaging_Framework.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    sharedAt: dayjs().subtract(2, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Brand_Logo_Vertical_White.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    sharedAt: dayjs().subtract(10, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Email_Performance.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    sharedAt: dayjs().subtract(12, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function Page() {
  const [driveOpenDialog, setDriveOpenDialog] = useState(false);
  const handleClickDriveOpenDialog = () => {
    setDriveOpenDialog(true);
  };
  const handleDriveCloseDialog = () => {
    setDriveOpenDialog(false);
  };

  const apiRef = useGridApiRef();

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set(),
  });

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 3,
      bottom: 3,
    };
  }, []);

  const [rows] = useState<Row[]>(initialRows);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90, filterable: false },
    { field: "iconBackground", headerName: "", width: 0, filterable: false, editable: false },
    { field: "iconColor", headerName: "", width: 0, filterable: false, editable: false },
    {
      field: "icon",
      headerName: "",
      width: 50,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box
          className={cn(
            "mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-sm",
            params.row.iconBackground,
          )}
        >
          <NextureIcons icon={params.value as IconName} className={params.row.iconColor} size={"large"} />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="#"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleClickDriveOpenDialog();
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 200,
      type: "string",
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center gap-2">
          {params.value ? (
            <>
              <Avatar className="bg-primary/80 tiny" alt={params.value} src={params.row.ownerAvatar}>
                {params.value?.substring(0, 1)}
              </Avatar>
              <Typography variant="body1" component="div">
                {params.value}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" component="div">
              None
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "ownerAvatar",
      headerName: "Owner Avatar",
      width: 0,
      type: "string",
      filterable: false,
      editable: false,
    },
    {
      field: "sharedBy",
      headerName: "Shared by",
      width: 200,
      type: "string",
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center gap-2">
          {params.value ? (
            <>
              <Avatar className="bg-primary/80 tiny" alt={params.value} src={params.row.ownerAvatar}>
                {params.value?.substring(0, 1)}
              </Avatar>
              <Typography variant="body1" component="div">
                {params.value}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" component="div">
              None
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "sharedByAvatar",
      headerName: "Shared by Avatar",
      width: 0,
      type: "string",
      filterable: false,
      editable: false,
    },

    {
      field: "size",
      headerName: "Size",
      width: 160,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: (params: GridRenderCellParams<any, number>) => {
        const value = params.value;
        if (value) {
          return formatBytes(value);
        } else {
          return "-";
        }
      },
    },
    {
      field: "sharedAt",
      headerName: "Shared At",
      align: "left",
      headerAlign: "left",
      width: 150,
      type: "dateTime",
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        const value = params.value;
        if (value) {
          const diff = dayjs(value).diff(dayjs());
          return capitalize(dayjs.duration(diff, "milliseconds").humanize(true));
        } else {
          <Box></Box>;
        }
      },
      filterOperators: getGridDateOperators(false).map((item) => ({
        ...item,
        InputComponent: DataGridDateTimeFilter,
      })),
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 80,
      flex: 1,
      align: "right",
      headerAlign: "right",
      getActions: () => [
        <GridActionsCellItem key={1} icon={<NiPenSquare size="medium" />} label="Edit" showInMenu />,
        <GridActionsCellItem key={2} icon={<NiDuplicate size="medium" />} label="Duplicate" showInMenu />,
        <GridActionsCellItem key={0} icon={<NiCrossSquare size="medium" />} label="Delete" showInMenu />,
      ],
    },
  ];

  function CustomToolbar() {
    const [anchorElExport, setAnchorElExport] = useState<EventTarget | Element | PopoverVirtualElement | null>(null);
    const openExport = Boolean(anchorElExport);
    const handleClickExport = (event: Event | SyntheticEvent) => {
      setAnchorElExport(event.currentTarget);
    };
    const handleCloseExport = () => {
      setAnchorElExport(null);
    };

    const [anchorElSelection, setAnchorElSelection] = useState<EventTarget | Element | PopoverVirtualElement | null>(
      null,
    );
    const openSelection = Boolean(anchorElSelection);
    const handleClickSelection = (event: Event | SyntheticEvent) => {
      setAnchorElSelection(event.currentTarget);
    };
    const handleCloseSelection = () => {
      setAnchorElSelection(null);
    };

    const [anchorElMainMenu, setAnchorElMainMenu] = useState<EventTarget | Element | PopoverVirtualElement | null>(
      null,
    );
    const openMainMenu = Boolean(anchorElMainMenu);
    const handleClickMainMenu = (event: Event | SyntheticEvent) => {
      setAnchorElMainMenu(event.currentTarget);
    };
    const handleCloseMainMenu = () => {
      setAnchorElMainMenu(null);
    };

    const [currentUser, setCurrentUser] = useState<UserType>({
      id: "",
      name: "",
      image: "",
    });

    const handleChange = (_event: SyntheticEvent, value: any) => {
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

    const [type, setType] = useState("");
    const handleTypeChange = (event: SelectChangeEvent) => {
      setType(event.target.value as string);
    };

    return (
      <Toolbar className="min-h-auto border-none">
        <Grid container spacing={5} className="mb-4 w-full">
          <Grid container spacing={2.5} className="w-full" size={12}>
            <Grid size={{ xs: 12, md: "grow" }}>
              <Typography variant="h1" component="h1" className="mb-0">
                Shared
              </Typography>
              <Breadcrumbs>
                <Link color="inherit" href="/dashboards/default">
                  Home
                </Link>
                <Link color="inherit" href="/applications">
                  Applications
                </Link>
                <Link color="inherit" href="/applications/drive">
                  Drive
                </Link>
                <Typography variant="body2">Shared</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
              {rowSelectionModel.ids.size > 0 && (
                <>
                  <Tooltip title="Selection">
                    <Button
                      className="surface-standard"
                      size="medium"
                      color="grey"
                      variant="surface"
                      onClick={handleClickSelection}
                      endIcon={
                        <NiChevronRightSmall
                          size={"medium"}
                          className={cn(
                            "-ms-1 transition-transform rtl:rotate-180",
                            openSelection && "rotate-90 rtl:rotate-90",
                          )}
                        />
                      }
                    >
                      {rowSelectionModel.ids.size > 1
                        ? rowSelectionModel.ids.size + " Items"
                        : rowSelectionModel.ids.size + " Item"}
                    </Button>
                  </Tooltip>

                  <Menu
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    anchorEl={anchorElSelection as Element}
                    open={openSelection}
                    onClose={handleCloseSelection}
                    className="mt-1"
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseSelection();
                      }}
                    >
                      <ListItemIcon>
                        <NiPenSquare size="medium" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseSelection();
                      }}
                    >
                      <ListItemIcon>
                        <NiDuplicate size="medium" />
                      </ListItemIcon>
                      <ListItemText>Duplicate</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseSelection();
                      }}
                    >
                      <ListItemIcon>
                        <NiCrossSquare size="medium" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              )}

              <Tooltip title="Columns">
                <ColumnsPanelTrigger
                  render={(props) => (
                    <Button
                      {...props}
                      className="icon-only surface-standard"
                      size="medium"
                      color="grey"
                      variant="surface"
                    >
                      <NiCols size={"medium"} />
                    </Button>
                  )}
                />
              </Tooltip>

              <Tooltip title="Filters">
                <FilterPanelTrigger
                  render={(props, state) => (
                    <Button
                      {...props}
                      className="icon-only surface-standard"
                      size="medium"
                      color="grey"
                      variant="surface"
                    >
                      <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                        <NiFilter size={"medium"} />
                      </Badge>
                    </Button>
                  )}
                />
              </Tooltip>

              <Tooltip title="Export">
                <Button
                  className="icon-only surface-standard"
                  size="medium"
                  color="grey"
                  variant="surface"
                  startIcon={<NiArrowInDown size={"medium"} />}
                  onClick={handleClickExport}
                />
              </Tooltip>

              <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                anchorEl={anchorElExport as Element}
                open={openExport}
                onClose={handleCloseExport}
                className="mt-1"
              >
                <ExportPrint
                  render={
                    <MenuItem>
                      <ListItemIcon>
                        <NiPrinter size="medium" />
                      </ListItemIcon>
                      <ListItemText>Print</ListItemText>
                    </MenuItem>
                  }
                  onClick={handleCloseExport}
                />
                <ExportCsv
                  render={
                    <MenuItem>
                      <ListItemIcon>
                        <NiDocumentFull size="medium" />
                      </ListItemIcon>
                      <ListItemText>Export CSV</ListItemText>
                    </MenuItem>
                  }
                  onClick={handleCloseExport}
                />
              </Menu>

              <Button
                className="surface-standard"
                size="medium"
                color="grey"
                variant="surface"
                startIcon={<NiPlusSquare size={"medium"} />}
                onClick={handleClickMainMenu}
              >
                Create
              </Button>
              <Menu
                anchorEl={anchorElMainMenu as Element}
                open={openMainMenu}
                onClose={handleCloseMainMenu}
                className="mt-1"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem>New File</MenuItem>
                <MenuItem>New Folder</MenuItem>
                <MenuItem>Upload File</MenuItem>
                <MenuItem>Upload Folder</MenuItem>
              </Menu>
            </Grid>
          </Grid>

          <Grid container className="w-full gap-1.5" size={12}>
            <FormControl variant="filled" size="medium" className="surface mb-0 flex-1">
              <InputLabel>Search</InputLabel>
              <QuickFilter
                render={() => (
                  <QuickFilterControl
                    render={({ ref, ...controlProps }, state) => (
                      <FilledInput
                        {...controlProps}
                        inputRef={ref}
                        endAdornment={
                          <>
                            <InputAdornment position="end" className={cn(state.value === "" && "hidden")}>
                              <QuickFilterClear edge="end">
                                <NiCross size="medium" className="text-text-disabled" />
                              </QuickFilterClear>
                            </InputAdornment>
                            <InputAdornment position="end" className={cn(state.value !== "" && "hidden")}>
                              <IconButton edge="end">
                                {<NiSearch size="medium" className="text-text-disabled" />}
                              </IconButton>
                            </InputAdornment>
                          </>
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl className="surface mb-0 w-52">
              <Autocomplete
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
                    variant: "outlined",
                  },
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Owner"
                      size="medium"
                      slotProps={{
                        htmlInput: {
                          ...params.slotProps.htmlInput,
                          autoComplete: "new-password",
                        },
                        input: {
                          ...params.slotProps.input,
                          startAdornment: currentUser?.name && (
                            <>
                              <InputAdornment position="start" className="mt-0.75!">
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
            <FormControl variant="filled" className="surface mb-0 w-36">
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                label="Type"
                onChange={handleTypeChange}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Folder">Folder</MenuItem>
                <MenuItem value="Image">Image</MenuItem>
                <MenuItem value="Video">Video</MenuItem>
                <MenuItem value="Document">Document</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid size={12}>
        <DataGrid
          autoHeight
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                iconBackground: false,
                iconColor: false,
                ownerAvatar: false,
                sharedByAvatar: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          getRowSpacing={getRowSpacing}
          rowHeight={48}
          columnHeaderHeight={40}
          className="full-page dense border-none"
          pagination
          slotProps={{
            panel: {
              className: "mt-1!",
            },
            main: {
              className: "overflow-visible",
            },
          }}
          slots={{
            basePagination: DataGridPaginationFullPage,
            columnSortedDescendingIcon: () => {
              return <NiArrowDown size={"small"}></NiArrowDown>;
            },
            columnSortedAscendingIcon: () => {
              return <NiArrowUp size={"small"}></NiArrowUp>;
            },
            columnFilteredIcon: () => {
              return <NiFilterPlus size={"small"}></NiFilterPlus>;
            },
            columnReorderIcon: () => {
              return <NiChevronLeftRightSmall size={"small"}></NiChevronLeftRightSmall>;
            },
            columnMenuIcon: () => {
              return <NiEllipsisVertical size={"small"}></NiEllipsisVertical>;
            },
            columnMenuSortAscendingIcon: NiArrowUp,
            columnMenuSortDescendingIcon: NiArrowDown,
            columnMenuFilterIcon: NiFilter,
            columnMenuHideIcon: NiEyeInactive,
            columnMenuClearIcon: NiCross,
            columnMenuManageColumnsIcon: NiCols,
            filterPanelDeleteIcon: NiCross,
            filterPanelRemoveAllIcon: NiBinEmpty,
            baseSelect: (props: any) => {
              const propsCasted = props as SelectProps;
              return (
                <FormControl size="small" variant="outlined">
                  <InputLabel>{props.label}</InputLabel>
                  <Select {...propsCasted} IconComponent={NiChevronDownSmall} MenuProps={{ className: "outlined" }} />
                </FormControl>
              );
            },
            quickFilterIcon: () => {
              return <NiSearch size={"medium"} />;
            },
            quickFilterClearIcon: () => {
              return <NiCross size={"medium"} />;
            },
            baseButton: (props) => {
              return <Button {...props} variant="pastel" color="grey"></Button>;
            },
            moreActionsIcon: () => {
              return <NiEllipsisVertical size={"medium"} />;
            },
            toolbar: CustomToolbar,
          }}
          rowSelectionModel={rowSelectionModel}
          pageSizeOptions={[10, 20, 50, 100]}
          disableRowSelectionExcludeModel
          onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => {
            setRowSelectionModel(rowSelectionModel);
          }}
          hideFooterSelectedRowCount
          showToolbar
        />
        <DriveLightbox onClose={handleDriveCloseDialog} open={driveOpenDialog} />
      </Grid>
    </Grid>
  );
}

function formatBytes(bytes: number) {
  const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "unit",
    unit: units[i],
    unitDisplay: "narrow",
    maximumFractionDigits: 1,
  });

  return formatter.format(value);
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
