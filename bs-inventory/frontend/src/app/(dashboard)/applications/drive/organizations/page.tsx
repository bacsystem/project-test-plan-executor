"use client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { SyntheticEvent, useCallback, useState } from "react";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
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
  SelectProps,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ColumnsPanelTrigger,
  DataGrid,
  ExportCsv,
  ExportPrint,
  FilterPanelTrigger,
  GRID_STRING_COL_DEF,
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  Toolbar,
  useGridApiRef,
} from "@mui/x-data-grid";

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

type AvatarType = {
  id: string;
  name: string;
  path: string;
};

const usersColumnType: GridColTypeDef<AvatarType[]> = {
  ...GRID_STRING_COL_DEF,
  type: "custom",
  resizable: false,
  filterable: false,
  sortable: false,
  editable: false,
  groupable: false,
  renderCell: (params: GridRenderCellParams<any, AvatarType[]>) => (
    <AvatarGroup spacing="medium" className="tiny h-full items-center justify-end">
      {params.value?.map((avatar: AvatarType) => {
        return <Avatar key={avatar.id} alt={avatar.name} src={avatar.path} />;
      })}
    </AvatarGroup>
  ),
};

const initialRows = [
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-success-light/10",
    iconColor: "text-success",
    icon: "NiAirBalloon",
    name: "Management",
    owner: "Laura Ellis",
    ownerAvatar: "/images/avatars/avatar-1.jpg",
    users: [
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-4.jpg", name: "Remy Sharp" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-5.jpg", name: "Laura Ellis" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-6.jpg", name: "Lucas Wright" },
    ],
    plan: "Premium",
    usage: 15,
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-info-light/10",
    iconColor: "text-info",
    icon: "NiScreen",
    name: "Engineering",
    owner: "Sofia Bennett",
    ownerAvatar: "/images/avatars/avatar-3.jpg",
    users: [
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-5.jpg", name: "Laura Ellis" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-6.jpg", name: "Lucas Wright" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-7.jpg", name: "Remy Sharp" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-8.jpg", name: "Daniel Fontaine" },
    ],
    plan: "Premium",
    usage: 8,
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-warning-light/10",
    iconColor: "text-warning",
    icon: "NiPalette",
    name: "Design",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-5.jpg",
    users: [
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-5.jpg", name: "Laura Ellis" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-6.jpg", name: "Lucas Wright" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-7.jpg", name: "Remy Sharp" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-8.jpg", name: "Adrian Patel" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-2.jpg", name: "Daniel Fontaine" },
      { id: crypto.randomUUID(), path: "/images/avatars/avatar-3.jpg", name: "Emma Sullivan" },
    ],
    plan: "Premium",
    usage: 8,
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function Page() {
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
      width: 260,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="#"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 260,
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
      field: "plan",
      headerName: "Plan",
      width: 180,
      editable: false,
    },
    {
      field: "users",
      headerName: "Users",
      type: "custom",
      align: "left",
      headerAlign: "left",
      ...usersColumnType,
      width: 220,
    },
    {
      field: "usage",
      headerName: "Usage",
      minWidth: 60,
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: (params: GridRenderCellParams<any, number>) => {
        const value = params.value || 0;
        return (
          <Box className="flex h-full flex-row items-center gap-0.5">
            <Box
              className={cn("bg-primary-light/10 border-primary h-2 rounded-lg border-2")}
              style={{ width: `${value}%` }}
            ></Box>
            <Box
              className={cn("bg-grey-100/10 border-grey-100 h-2 rounded-lg border-2")}
              style={{ width: `${100 - value}%` }}
            ></Box>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
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

    return (
      <Toolbar className="min-h-auto border-none">
        <Grid container spacing={5} className="mb-4 w-full">
          <Grid container spacing={2.5} className="w-full" size={12}>
            <Grid size={{ xs: 12, md: "grow" }}>
              <Typography variant="h1" component="h1" className="mb-0">
                Organizations
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
                <Typography variant="body2">Organizations</Typography>
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
              columnVisibilityModel: { id: false, iconBackground: false, iconColor: false, ownerAvatar: false },
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
      </Grid>
    </Grid>
  );
}
