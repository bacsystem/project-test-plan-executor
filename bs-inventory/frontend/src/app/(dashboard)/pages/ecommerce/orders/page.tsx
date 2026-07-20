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
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiMinusSquare from "@/icons/nexture/ni-minus-square";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiPrinter from "@/icons/nexture/ni-printer";
import NiSearch from "@/icons/nexture/ni-search";
import { cn, currencyFormatter } from "@/lib/utils";

const initialRows = [
  {
    id: 24560,
    customer: "Laura Ellis",
    customerAvatar: "/images/avatars/avatar-1.jpg",
    total: 17.84,
    itemCount: 4,
    date: dayjs().subtract(2, "hours").toDate(),
    status: "Pending",
  },
  {
    id: 24561,
    customer: "Daniel Fontaine",
    customerAvatar: "/images/avatars/avatar-2.jpg",
    total: 55.2,
    itemCount: 6,
    date: dayjs().subtract(4, "hours").toDate(),
    status: "Pending",
  },
  {
    id: 24562,
    customer: "Sofia Bennett",
    customerAvatar: "/images/avatars/avatar-3.jpg",
    total: 125.6,
    itemCount: 6,
    date: dayjs().subtract(4, "hours").toDate(),
    status: "Pending",
  },
  {
    id: 24563,
    customer: "Olivia Castillo",
    customerAvatar: "/images/avatars/avatar-4.jpg",
    total: 65.2,
    itemCount: 2,
    date: dayjs().subtract(7, "hours").toDate(),
    status: "Pending",
  },
  {
    id: 24564,
    customer: "Lucas Wright",
    customerAvatar: "/images/avatars/avatar-5.jpg",
    total: 45.5,
    itemCount: 2,
    date: dayjs().subtract(10, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24565,
    customer: "Henry Lawson",
    customerAvatar: "/images/avatars/avatar-6.jpg",
    total: 135.2,
    itemCount: 8,
    date: dayjs().subtract(10, "hours").toDate(),
    status: "In Progress",
  },
  {
    id: 24566,
    customer: "Emma Sullivan",
    customerAvatar: "/images/avatars/avatar-7.jpg",
    total: 240.8,
    itemCount: 4,
    date: dayjs().subtract(12, "hours").toDate(),
    status: "In Progress",
  },
  {
    id: 24567,
    customer: "Adrian Patel",
    customerAvatar: "/images/avatars/avatar-8.jpg",
    total: 68.0,
    itemCount: 3,
    date: dayjs().subtract(16, "hours").toDate(),
    status: "In Progress",
  },
  {
    id: 24568,
    customer: "Laura Ellis",
    customerAvatar: "/images/avatars/avatar-1.jpg",
    total: 24.5,
    itemCount: 1,
    date: dayjs().subtract(48, "hours").toDate(),
    status: "No Stock",
  },
  {
    id: 24569,
    customer: "Daniel Fontaine",
    customerAvatar: "/images/avatars/avatar-2.jpg",
    total: 488.2,
    itemCount: 8,
    date: dayjs().subtract(48, "hours").toDate(),
    status: "No Stock",
  },
  {
    id: 24570,
    customer: "Sofia Bennett",
    customerAvatar: "/images/avatars/avatar-3.jpg",
    total: 120.65,
    itemCount: 2,
    date: dayjs().subtract(48, "hours").toDate(),
    status: "Delivered",
  },

  {
    id: 24571,
    customer: "Olivia Castillo",
    customerAvatar: "/images/avatars/avatar-4.jpg",
    total: 35.7,
    itemCount: 6,
    date: dayjs().subtract(60, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24572,
    customer: "Lucas Wright",
    customerAvatar: "/images/avatars/avatar-5.jpg",
    total: 45.5,
    itemCount: 5,
    date: dayjs().subtract(62, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24573,
    customer: "Henry Lawson",
    customerAvatar: "/images/avatars/avatar-6.jpg",
    total: 120.65,
    itemCount: 3,
    date: dayjs().subtract(59, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24574,
    customer: "Emma Sullivan",
    customerAvatar: "/images/avatars/avatar-7.jpg",
    total: 85.25,
    itemCount: 1,
    date: dayjs().subtract(54, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24575,
    customer: "Adrian Patel",
    customerAvatar: "/images/avatars/avatar-8.jpg",
    total: 63.2,
    itemCount: 6,
    date: dayjs().subtract(80, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24576,
    customer: "Laura Ellis",
    customerAvatar: "/images/avatars/avatar-1.jpg",
    total: 74.45,
    itemCount: 3,
    date: dayjs().subtract(96, "hours").toDate(),
    status: "Delivered",
  },
  {
    id: 24577,
    customer: "Lucas Wright",
    customerAvatar: "/images/avatars/avatar-2.jpg",
    total: 69.2,
    itemCount: 4,
    date: dayjs().subtract(96, "hours").toDate(),
    status: "Delivered",
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
      width: 200,
      type: "string",
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="/pages/ecommerce/order-detail"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      type: "string",
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center gap-2">
          <Avatar className="bg-primary/80" alt={params.value} src={params.row.customerAvatar}>
            {params.value?.substring(0, 1)}
          </Avatar>
          <Typography variant="body1" component="div">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    { field: "customerAvatar", headerName: "Customer Avatar", width: 200, type: "string" },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 160,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueFormatter: (value) => {
        if (!value) {
          return value;
        }
        return currencyFormatter.format(value);
      },
    },
    {
      field: "itemCount",
      headerName: "Item Count",
      width: 160,
      editable: false,
      align: "left",
      headerAlign: "left",
      type: "number",
    },
    {
      field: "date",
      headerName: "Date",
      align: "left",
      headerAlign: "left",
      width: 200,
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
      minWidth: 140,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Pending", "No Stock", "Delivered", "In Progress"],
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const value = params.value;
        if (value === "Delivered") {
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
        } else if (value === "Pending") {
          return (
            <Button
              className="pointer-events-none self-center"
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiMinusSquare size={"tiny"} />}
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
              color="error"
              variant="pastel"
              startIcon={<NiExclamationSquare size={"tiny"} />}
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
        <GridActionsCellItem key={1} icon={<NiPenSquare size="medium" />} label="Edit" showInMenu />,
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
            <Grid size={{ xs: 12, md: "grow" }}>
              <Typography variant="h1" component="h1" className="mb-0">
                Orders
              </Typography>
              <Breadcrumbs>
                <Link color="inherit" href="/dashboards/default">
                  Home
                </Link>
                <Link color="inherit" href="/pages">
                  Pages
                </Link>
                <Link color="inherit" href="/pages/ecommerce">
                  Ecommerce
                </Link>
                <Typography variant="body2">Orders</Typography>
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
            columns: { columnVisibilityModel: { customerAvatar: false } },
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
