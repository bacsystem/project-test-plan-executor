"use client";
import Link from "next/link";
import React from "react";

import {
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
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowId,
  GridRowSelectionModel,
  GridRowSpacingParams,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  Toolbar,
} from "@mui/x-data-grid";

import DataGridInput from "@/components/data-grid/data-grid-input";
import { DataGridPaginationFullPage } from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
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
import NiPlus from "@/icons/nexture/ni-plus";
import NiPrinter from "@/icons/nexture/ni-printer";
import NiSearch from "@/icons/nexture/ni-search";
import NiShield from "@/icons/nexture/ni-shield";
import { cn } from "@/lib/utils";

const initialRows = [
  { id: 1, image: "/images/avatars/avatar-1.jpg", first: "Emily", last: "Johnson", age: 14, isAdmin: true },
  { id: 2, image: "/images/avatars/avatar-2.jpg", first: "Nathan", last: "Patel", age: 31, isAdmin: true },
  { id: 3, image: "/images/avatars/avatar-3.jpg", first: "Sophia", last: "Garcia", age: 31, isAdmin: true },
  { id: 4, image: "/images/avatars/avatar-4.jpg", first: "Jack", last: "Müller", age: 11, isAdmin: false },
  { id: 5, image: "/images/avatars/avatar-5.jpg", first: "Chloe", last: "Nakamura", age: 28, isAdmin: false },
  { id: 6, image: "/images/avatars/avatar-6.jpg", first: "Ethan", last: "Smith", age: 48, isAdmin: true },
  { id: 7, image: "/images/avatars/avatar-7.jpg", first: "Mia", last: "Dupont", age: 44, isAdmin: true },
  { id: 8, image: "/images/avatars/avatar-8.jpg", first: "Oliver", last: "Silva", age: 31, isAdmin: true },
  { id: 9, image: "/images/avatars/avatar-1.jpg", first: "Isabella", last: "Kim", age: 64, isAdmin: true },
  { id: 10, image: "/images/avatars/avatar-2.jpg", first: "Liam", last: "Brown", age: 45, isAdmin: false },
  { id: 11, image: "/images/avatars/avatar-3.jpg", first: "Lotte", last: "Schmidt", age: 23, isAdmin: true },
  { id: 12, image: "/images/avatars/avatar-4.jpg", first: "Aiden", last: "Lopez", age: 27, isAdmin: false },
  { id: 13, image: "/images/avatars/avatar-5.jpg", first: "Amelia", last: "Nguyen", age: 43, isAdmin: false },
  { id: 14, image: "/images/avatars/avatar-6.jpg", first: "Noah", last: "Evans", age: 25, isAdmin: true },
  { id: 15, image: "/images/avatars/avatar-7.jpg", first: "Zoe", last: "Jack", age: 32, isAdmin: false },
  { id: 16, image: "/images/avatars/avatar-8.jpg", first: "Henry", last: "King", age: 31, isAdmin: true },
  { id: 17, image: "/images/avatars/avatar-1.jpg", first: "Alexander", last: "Bennett", age: 64, isAdmin: true },
  { id: 18, image: "/images/avatars/avatar-2.jpg", first: "Grace", last: "Carter", age: 45, isAdmin: false },
  { id: 19, image: "/images/avatars/avatar-3.jpg", first: "Benjamin", last: "Davidson", age: 23, isAdmin: true },
  { id: 20, image: "/images/avatars/avatar-4.jpg", first: "Olivia", last: "Edwards", age: 27, isAdmin: false },
  { id: 21, image: "/images/avatars/avatar-5.jpg", first: "Lily", last: "Foster", age: 43, isAdmin: false },
  { id: 22, image: "/images/avatars/avatar-6.jpg", first: "Ava", last: "Green", age: 25, isAdmin: true },
  { id: 23, image: "/images/avatars/avatar-7.jpg", first: "Lucas", last: "Harrison", age: 32, isAdmin: false },
  { id: 24, image: "/images/avatars/avatar-8.jpg", first: "William", last: "Owens", age: 31, isAdmin: true },
  { id: 25, image: "/images/avatars/avatar-1.jpg", first: "Levi", last: "Jefferson", age: 28, isAdmin: true },
  { id: 26, image: "/images/avatars/avatar-2.jpg", first: "Violet", last: "Kennedy", age: 22, isAdmin: true },
  { id: 27, image: "/images/avatars/avatar-3.jpg", first: "Aaron", last: "Larson", age: 26, isAdmin: true },
  { id: 28, image: "/images/avatars/avatar-4.jpg", first: "Madeline", last: "Morris", age: 32, isAdmin: false },
  { id: 29, image: "/images/avatars/avatar-5.jpg", first: "Eleanor", last: "Palmer", age: 34, isAdmin: false },
  { id: 30, image: "/images/avatars/avatar-6.jpg", first: "Felix", last: "West", age: 19, isAdmin: true },
];

type Row = (typeof initialRows)[number];

export default function FullPage() {
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

  const [rows, setRows] = React.useState<Row[]>(initialRows);

  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  const deleteUsers = () => {
    rowSelectionModel.ids.forEach((gridRowId: GridRowId) => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== gridRowId));
      });
    });
  };

  const toggleAdmin = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, isAdmin: !row.isAdmin } : row)));
    },
    [],
  );

  const toggleAdmins = () => {
    rowSelectionModel.ids.forEach((gridRowId: GridRowId) => {
      setRows((prevRows) => prevRows.map((row) => (row.id === gridRowId ? { ...row, isAdmin: !row.isAdmin } : row)));
    });
  };

  const duplicateUser = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id)!;
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    [],
  );

  const duplicateUsers = () => {
    rowSelectionModel.ids.forEach((gridRowId: GridRowId) => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === gridRowId)!;
        return [...prevRows, { ...rowToDuplicate, id: (gridRowId as number) + Date.now() }];
      });
    });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90, filterable: false },
    {
      field: "image",
      headerName: "Image",
      width: 80,
      editable: true,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center">
          <img src={params.value as string} alt="grid image" className="h-9 w-9 rounded-sm object-cover" />
        </Box>
      ),
    },
    {
      field: "first",
      headerName: "First Name",
      width: 200,
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
    },
    {
      field: "last",
      headerName: "Last Name",
      width: 200,
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
    },
    {
      field: "age",
      headerName: "Age",
      width: 160,
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 240,
      valueGetter: (value, row) => `${row.first || ""} ${row.last || ""}`,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      align: "left",
      headerAlign: "left",
      type: "boolean",
      width: 120,
      editable: true,
      renderCell: (params: GridRenderCellParams<any, boolean>) => {
        const value = params.value;
        if (typeof value !== "undefined") {
          return value ? <NiCheckSquare className="text-success" /> : <NiCrossSquare className="text-error" />;
        } else {
          return <Box></Box>;
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
      getActions: (params) => [
        <GridActionsCellItem
          key={1}
          icon={<NiShield size="medium" />}
          label="Toggle Admin"
          onClick={toggleAdmin(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          icon={<NiDuplicate size="medium" />}
          label="Duplicate"
          onClick={duplicateUser(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key={0}
          icon={<NiCrossSquare size="medium" />}
          label="Delete"
          onClick={deleteUser(params.id)}
          showInMenu
        />,
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
                Full Page
              </Typography>
              <Breadcrumbs>
                <Link color="inherit" href="/dashboards/default">
                  Home
                </Link>
                <Link color="inherit" href="/ui">
                  UI Elements
                </Link>
                <Link color="inherit" href="/ui/mui-x">
                  MUI X
                </Link>
                <Link color="inherit" href="/ui/mui-x/data-grid">
                  Data Grid
                </Link>
                <Typography variant="body2">Full Page</Typography>
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
                        toggleAdmins();
                        handleCloseSelection();
                      }}
                    >
                      <ListItemIcon>
                        <NiShield size="medium" />
                      </ListItemIcon>
                      <ListItemText>Toggle Admin</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        duplicateUsers();
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
                        deleteUsers();
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
                      className="icon-only surface-standard flex-none"
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
                      className="icon-only surface-standard flex-none"
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
                  className="icon-only surface-standard flex-none"
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
                  Add Item
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
            columns: { columnVisibilityModel: { id: false } },
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
