"use client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";

import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  capitalize,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Select,
  SelectProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { getGridDateOperators, GridColDef } from "@mui/x-data-grid";
import {
  ColumnsPanelTrigger,
  DataGrid,
  ExportCsv,
  ExportPrint,
  FilterPanelTrigger,
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  Toolbar,
} from "@mui/x-data-grid";

import DataGridDateTimeFilter from "@/components/data-grid/data-grid-date-time-filter";
import { DataGridPaginationFullPage } from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiClock from "@/icons/nexture/ni-clock";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDashboard from "@/icons/nexture/ni-dashboard";
import NiDevops from "@/icons/nexture/ni-devops";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiExpand from "@/icons/nexture/ni-expand";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPrinter from "@/icons/nexture/ni-printer";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSearch from "@/icons/nexture/ni-search";
import NiServer from "@/icons/nexture/ni-server";
import NiShield from "@/icons/nexture/ni-shield";
import NiShuffle from "@/icons/nexture/ni-shuffle";
import { cn } from "@/lib/utils";

const initialRows = [
  {
    id: crypto.randomUUID(),
    issue: "Slow page load times due to large assets",
    assignee: "",
    assigneeAvatar: "",
    date: dayjs().subtract(5, "minutes").toDate(),
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Insecure Data Transmission Without Encryption",
    assignee: "",
    assigneeAvatar: "",
    date: dayjs().subtract(8, "minutes").toDate(),
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Unresponsive design failing on mobile devices",
    assignee: "Laura Ellis",
    assigneeAvatar: "/images/avatars/avatar-1.jpg",
    date: dayjs().subtract(40, "minutes").toDate(),
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "API timeout issues during high traffic",
    assignee: "Daniel Fontaine",
    assigneeAvatar: "/images/avatars/avatar-2.jpg",
    date: dayjs().subtract(2, "hours").toDate(),
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Cross-browser compatibility errors",
    assignee: "Sofia Bennett",
    assigneeAvatar: "/images/avatars/avatar-3.jpg",
    date: dayjs().subtract(4, "hours").toDate(),
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Broken navigation links and paths",
    assignee: "Olivia Castillo",
    assigneeAvatar: "/images/avatars/avatar-4.jpg",
    date: dayjs().subtract(5, "hours").toDate(),
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Outdated and incorrect data display",
    assignee: "Lucas Wright",
    assigneeAvatar: "/images/avatars/avatar-5.jpg",
    date: dayjs().subtract(5, "hours").toDate(),
    status: "Open",
    category: "Security",
  },
  {
    id: crypto.randomUUID(),
    issue: "Weak password requirements allowing security risks",
    assignee: "Henry Lawson",
    assigneeAvatar: "/images/avatars/avatar-6.jpg",
    date: dayjs().subtract(6, "hours").toDate(),
    status: "In Progress",
    category: "Security",
  },
  {
    id: crypto.randomUUID(),
    issue: "Session persistence issues causing frustration",
    assignee: "Emma Sullivan",
    assigneeAvatar: "/images/avatars/avatar-7.jpg",
    date: dayjs().subtract(8, "hours").toDate(),
    status: "In Progress",
    category: "Security",
  },
  {
    id: crypto.randomUUID(),
    issue: "Database query inefficiencies slowing down responses",
    assignee: "Adrian Patel",
    assigneeAvatar: "/images/avatars/avatar-8.jpg",
    date: dayjs().subtract(8, "hours").toDate(),
    status: "In Progress",
    category: "Security",
  },
  {
    id: crypto.randomUUID(),
    issue: "Broken forms preventing user interactions",
    assignee: "Laura Ellis",
    assigneeAvatar: "/images/avatars/avatar-1.jpg",
    date: dayjs().subtract(12, "hours").toDate(),
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Unclear error messages confusing users",
    assignee: "Daniel Fontaine",
    assigneeAvatar: "/images/avatars/avatar-2.jpg",
    date: dayjs().subtract(12, "hours").toDate(),
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Vulnerability to cross-site scripting (XSS) attacks",
    assignee: "Laura Ellis",
    assigneeAvatar: "/images/avatars/avatar-3.jpg",
    date: dayjs().subtract(12, "hours").toDate(),
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Search feature producing irrelevant results",
    assignee: "Sofia Bennett",
    assigneeAvatar: "/images/avatars/avatar-4.jpg",
    date: dayjs().subtract(2, "days").toDate(),
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Integration conflicts with third-party services",
    assignee: "Olivia Castillo",
    assigneeAvatar: "/images/avatars/avatar-5.jpg",
    date: dayjs().subtract(2, "days").toDate(),
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Failure to scale during peak traffic",
    assignee: "Lucas Wright",
    assigneeAvatar: "/images/avatars/avatar-6.jpg",
    date: dayjs().subtract(2, "days").toDate(),
    status: "In Progress",
    category: "Compatibility",
  },
  {
    id: crypto.randomUUID(),
    issue: "Accessibility limitations for disabled users",
    assignee: "Henry Lawson",
    assigneeAvatar: "/images/avatars/avatar-7.jpg",
    date: dayjs().subtract(3, "days").toDate(),
    status: "In Progress",
    category: "Compatibility",
  },
  {
    id: crypto.randomUUID(),
    issue: "Spammed user input overwhelming the system",
    assignee: "Emma Sullivan",
    assigneeAvatar: "/images/avatars/avatar-8.jpg",
    date: dayjs().subtract(3, "days").toDate(),
    status: "In Progress",
    category: "Compatibility",
  },
  {
    id: crypto.randomUUID(),
    issue: "Unsynchronized content across multiple devices",
    assignee: "Adrian Patel",
    assigneeAvatar: "/images/avatars/avatar-1.jpg",
    date: dayjs().subtract(3, "days").toDate(),
    status: "Closed",
    category: "Compatibility",
  },
  {
    id: crypto.randomUUID(),
    issue: "Conflicts between legacy code and new features",
    assignee: "Daniel Fontaine",
    assigneeAvatar: "/images/avatars/avatar-2.jpg",
    date: dayjs().subtract(3, "days").toDate(),
    status: "Closed",
    category: "Compatibility",
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function Page() {
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set(),
  });

  const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: 5,
    };
  }, []);

  const [rows] = React.useState<Row[]>(initialRows);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 240,
      type: "string",
      filterable: false,
    },
    {
      field: "issue",
      headerName: "Issue",
      width: 400,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="/pages/support/issue-detail"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 200,
      type: "string",
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center gap-2">
          {params.value ? (
            <>
              <Avatar className="bg-primary/80" alt={params.value} src={params.row.assigneeAvatar}>
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
    { field: "assigneeAvatar", headerName: "Assignee Avatar", width: 200, type: "string", filterable: false },
    {
      field: "category",
      headerName: "Category",
      align: "left",
      headerAlign: "left",
      width: 180,
      type: "singleSelect",
      valueOptions: ["Performance", "Security", "Interface", "Functional", "Compatibility", "Database"],
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const value = params.value;
        if (value === "Performance") {
          return (
            <Box className="flex h-full flex-row items-center gap-1.5">
              <NiDashboard className="text-primary" />
              <Typography>{value}</Typography>
            </Box>
          );
        } else if (value === "Security") {
          return (
            <Box className="flex h-full flex-row items-center gap-1.5">
              <NiShield className="text-secondary" />
              <Typography>{value}</Typography>
            </Box>
          );
        } else if (value === "Interface") {
          return (
            <Box className="flex h-full flex-row items-center gap-1.5">
              <NiScreen className="text-accent-1" />
              <Typography>{value}</Typography>
            </Box>
          );
        } else if (value === "Functional") {
          return (
            <Box className="flex h-full flex-row items-center gap-1.5">
              <NiShuffle className="text-accent-2" />
              <Typography>{value}</Typography>
            </Box>
          );
        } else if (value === "Compatibility") {
          return (
            <Box className="flex h-full flex-row items-center gap-1.5">
              <NiDevops className="text-accent-3" />
              <Typography>{value}</Typography>
            </Box>
          );
        } else {
          return (
            <Box className="flex h-full flex-row items-center gap-1.5">
              <NiServer className="text-accent-4" />
              <Typography>{value}</Typography>
            </Box>
          );
        }
      },
    },
    {
      field: "date",
      headerName: "Date",
      align: "left",
      headerAlign: "left",
      width: 160,
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
      field: "status",
      headerName: "Status",
      align: "left",
      headerAlign: "left",
      width: 120,
      type: "singleSelect",
      valueOptions: ["Open", "In Progress", "Closed"],
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const value = params.value;
        if (value === "Open") {
          return (
            <Button
              className="pointer-events-none self-center"
              size="tiny"
              color="error"
              variant="pastel"
              startIcon={<NiExclamationSquare size={"tiny"} />}
            >
              {value}
            </Button>
          );
        } else if (value === "In Progress") {
          return (
            <Button
              className="pointer-events-none self-center"
              size="tiny"
              color="warning"
              variant="pastel"
              startIcon={<NiClock size={"tiny"} />}
            >
              {value}
            </Button>
          );
        } else {
          return (
            <Button
              className="pointer-events-none self-center"
              size="tiny"
              color="success"
              variant="pastel"
              startIcon={<NiCheckSquare size={"tiny"} />}
            >
              {value}
            </Button>
          );
        }
      },
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
        <GridActionsCellItem key={1} icon={<NiExpand size="medium" />} label="View" showInMenu />,
        <GridActionsCellItem key={2} icon={<NiDuplicate size="medium" />} label="Duplicate" showInMenu />,
        <GridActionsCellItem key={0} icon={<NiCrossSquare size="medium" />} label="Delete" showInMenu />,
      ],
    },
  ];

  function CustomToolbar() {
    const [anchorElExport, setAnchorElExport] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(
      null,
    );
    const openExport = Boolean(anchorElExport);
    const handleClickExport = (event: Event | React.SyntheticEvent) => {
      setAnchorElExport(event.currentTarget);
    };
    const handleCloseExport = () => {
      setAnchorElExport(null);
    };

    const [anchorElSelection, setAnchorElSelection] = React.useState<
      EventTarget | Element | PopoverVirtualElement | null
    >(null);
    const openSelection = Boolean(anchorElSelection);
    const handleClickSelection = (event: Event | React.SyntheticEvent) => {
      setAnchorElSelection(event.currentTarget);
    };
    const handleCloseSelection = () => {
      setAnchorElSelection(null);
    };

    return (
      <Toolbar className="min-h-auto border-none">
        <Grid container spacing={5} className="mb-4 w-full">
          <Grid container spacing={2.5} className="w-full" size={12}>
            <Grid size={{ md: "grow", xs: 12 }}>
              <Typography variant="h1" component="h1" className="mb-0">
                Issues
              </Typography>
              <Breadcrumbs>
                <Link color="inherit" href="/dashboards/default">
                  Home
                </Link>
                <Link color="inherit" href="/pages">
                  Pages
                </Link>
                <Link color="inherit" href="/pages/support">
                  Support
                </Link>
                <Typography variant="body2">Issues</Typography>
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
                            "transition-transform rtl:rotate-180",
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

              <Tooltip title="Add Item">
                <Button
                  className="surface-standard"
                  size="medium"
                  color="grey"
                  variant="surface"
                  startIcon={<NiPlus size={"medium"} />}
                >
                  Add Issue
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid container spacing={5} className="w-full" size={12}>
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
          rows={rows}
          columns={columns}
          initialState={{
            columns: { columnVisibilityModel: { id: false, assigneeAvatar: false } },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          getRowSpacing={getRowSpacing}
          rowHeight={68}
          columnHeaderHeight={40}
          checkboxSelection
          disableRowSelectionOnClick
          className="full-page border-none"
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
      </Grid>
    </Grid>
  );
}
