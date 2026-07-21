"use client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";

import {
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
  Rating,
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
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationHexagon from "@/icons/nexture/ni-exclamation-hexagon";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiMinusSquare from "@/icons/nexture/ni-minus-square";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPrinter from "@/icons/nexture/ni-printer";
import NiSearch from "@/icons/nexture/ni-search";
import NiStar from "@/icons/nexture/ni-star";
import { cn, currencyFormatter } from "@/lib/utils";

const initialRows = [
  {
    id: 1,
    image: "/images/products/product-1.jpg",
    name: "Woolworth",
    price: 17.84,
    stock: 14,
    rating: 5,
    ratingCount: 25,
    updatedAt: dayjs("2025-05-15 14:20").toDate(),
    lastSale: dayjs().subtract(2, "hours").toDate(),
    status: "Active",
  },
  {
    id: 2,
    image: "/images/products/product-2.jpg",
    name: "Subwoofer",
    price: 17.84,
    stock: 31,
    rating: 5,
    ratingCount: 132,
    updatedAt: dayjs("2025-05-16 14:20").toDate(),
    lastSale: dayjs().subtract(5, "hours").toDate(),
    status: "Active",
  },
  {
    id: 3,
    image: "/images/products/product-3.jpg",
    name: "Dodo",
    price: 17.84,
    stock: 0,
    rating: 5,
    ratingCount: 78,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(25, "minutes").toDate(),
    status: "No Stock",
  },
  {
    id: 4,
    image: "/images/products/product-4.jpg",
    name: "Stretchy",
    price: 17.84,
    stock: 11,
    rating: 4.5,
    ratingCount: 54,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(20, "minutes").toDate(),
    status: "Active",
  },
  {
    id: 5,
    image: "/images/products/product-5.jpg",
    name: "Pony Soprano",
    price: 17.84,
    stock: 28,
    rating: 5,
    ratingCount: 168,
    updatedAt: dayjs("2025-05-20 14:20").toDate(),
    lastSale: dayjs().subtract(20, "minutes").toDate(),
    status: "Active",
  },
  {
    id: 6,
    image: "/images/products/product-6.jpg",
    name: "Buck Rogers",
    price: 17.84,
    stock: 48,
    rating: 5,
    ratingCount: 4587,
    updatedAt: dayjs("2025-05-17 14:20").toDate(),
    lastSale: dayjs().subtract(5, "minutes").toDate(),
    status: "Active",
  },
  {
    id: 7,
    image: "/images/products/product-7.jpg",
    name: "Cinnabun",
    price: 17.84,
    stock: 44,
    rating: 5,
    ratingCount: 455,
    updatedAt: dayjs("2025-05-12 14:20").toDate(),
    lastSale: dayjs().subtract(40, "minutes").toDate(),
    status: "Active",
  },
  {
    id: 8,
    image: "/images/products/product-8.jpg",
    name: "Paperwork",
    price: 17.84,
    stock: 6,
    rating: 5,
    ratingCount: 5,
    updatedAt: dayjs("2025-05-13 14:20").toDate(),
    lastSale: dayjs().subtract(30, "minutes").toDate(),
    status: "Inactive",
  },
  {
    id: 9,
    image: "/images/products/product-1.jpg",
    name: "Woolworth",
    price: 17.84,
    stock: 64,
    rating: 4,
    ratingCount: 47,
    updatedAt: dayjs("2025-05-22 14:20").toDate(),
    lastSale: dayjs().subtract(35, "minutes").toDate(),
    status: "Active",
  },
  {
    id: 10,
    image: "/images/products/product-2.jpg",
    name: "Birb",
    price: 17.84,
    stock: 45,
    rating: 5,
    ratingCount: 2,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 11,
    image: "/images/products/product-3.jpg",
    name: "Bubbles",
    price: 17.84,
    stock: 23,
    rating: 1,
    ratingCount: 1,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 12,
    image: "/images/products/product-4.jpg",
    name: "Donatello",
    price: 17.84,
    stock: 27,
    rating: 5,
    ratingCount: 84,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 13,
    image: "/images/products/product-5.jpg",
    name: "Woolworth",
    price: 17.84,
    stock: 43,
    rating: 5,
    ratingCount: 68,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
  },
  {
    id: 14,
    image: "/images/products/product-6.jpg",
    name: "Subwoofer",
    price: 17.84,
    stock: 25,
    rating: 5,
    ratingCount: 232,
    updatedAt: dayjs("2025-05-28 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
  },
  {
    id: 15,
    image: "/images/products/product-7.jpg",
    name: "Dodo",
    price: 17.84,
    stock: 32,
    rating: 5,
    ratingCount: 16,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
  },
  {
    id: 16,
    image: "/images/products/product-8.jpg",
    name: "Stretchy",
    price: 17.84,
    stock: 31,
    rating: 4.5,
    ratingCount: 4,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
  },
  {
    id: 17,
    image: "/images/products/product-1.jpg",
    name: "Pony Soprano",
    price: 17.84,
    stock: 64,
    rating: 5,
    ratingCount: 3,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
  },
  {
    id: 18,
    image: "/images/products/product-2.jpg",
    name: "Buck Rogers",
    price: 17.84,
    stock: 45,
    rating: 5,
    ratingCount: 58,
    updatedAt: dayjs("2025-05-14 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 19,
    image: "/images/products/product-3.jpg",
    name: "Cinnabun",
    price: 17.84,
    stock: 23,
    rating: 5,
    ratingCount: 23,
    updatedAt: dayjs("2025-05-04 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 20,
    image: "/images/products/product-4.jpg",
    name: "Paperwork",
    price: 17.84,
    stock: 27,
    rating: 5,
    ratingCount: 136,
    updatedAt: dayjs("2025-05-02 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 21,
    image: "/images/products/product-5.jpg",
    name: "Birb",
    price: 17.84,
    stock: 43,
    rating: 5,
    ratingCount: 66,
    updatedAt: dayjs("2025-05-05 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 22,
    image: "/images/products/product-6.jpg",
    name: "Bubbles",
    price: 17.84,
    stock: 25,
    rating: 5,
    ratingCount: 45,
    updatedAt: dayjs("2025-05-07 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 23,
    image: "/images/products/product-7.jpg",
    name: "Donatello",
    price: 17.84,
    stock: 32,
    rating: 5,
    ratingCount: 48,
    updatedAt: dayjs("2025-05-02 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 24,
    image: "/images/products/product-8.jpg",
    name: "Woolworth",
    price: 17.84,
    stock: 31,
    rating: 5,
    ratingCount: 168,
    updatedAt: dayjs("2025-05-06 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
  },
  {
    id: 25,
    image: "/images/products/product-1.jpg",
    name: "Subwoofer",
    price: 17.84,
    stock: 28,
    rating: 5,
    ratingCount: 110,
    updatedAt: dayjs("2025-05-04 14:20").toDate(),
    lastSale: dayjs().subtract(6, "hours").toDate(),
    status: "Active",
  },
  {
    id: 26,
    image: "/images/products/product-2.jpg",
    name: "Dodo",
    price: 17.84,
    stock: 22,
    rating: 5,
    ratingCount: 94,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(6, "hours").toDate(),
    status: "Active",
  },
  {
    id: 27,
    image: "/images/products/product-3.jpg",
    name: "Stretchy",
    price: 17.84,
    stock: 26,
    rating: 5,
    ratingCount: 16,
    updatedAt: dayjs("2025-05-17 14:20").toDate(),
    lastSale: dayjs().subtract(6, "hours").toDate(),
    status: "Active",
  },
  {
    id: 28,
    image: "/images/products/product-4.jpg",
    name: "Pony Soprano",
    price: 17.84,
    stock: 32,
    rating: 5,
    ratingCount: 36,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(6, "hours").toDate(),
    status: "Active",
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
    { field: "id", headerName: "ID", width: 90, filterable: false },
    {
      field: "image",
      headerName: "Image",
      width: 90,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center">
          <img src={params.value as string} alt="grid image" className="h-9 w-12 rounded-sm object-cover" />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="/pages/ecommerce/product-detail"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) => {
        if (!value) {
          return value;
        }
        return currencyFormatter.format(value);
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 90,
      editable: false,
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params: GridRenderCellParams<any, number>) => {
        const value = params.value || 0;
        if (value === 0) {
          return (
            <Box className="flex flex-row items-center gap-2">
              {value} <NiExclamationSquare size={"small"} className="text-error mb-0.5" />
            </Box>
          );
        } else if (value <= 10) {
          return (
            <Box className="flex flex-row items-center gap-2">
              {value} <NiExclamationHexagon size={"small"} className="text-warning mb-0.5" />
            </Box>
          );
        } else {
          return <Box className="flex flex-row items-center gap-2">{value}</Box>;
        }
      },
    },
    {
      field: "ratingCount",
      headerName: "RatingCount",
      width: 0,
      type: "number",
      editable: false,
      filterable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 150,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Box className="flex h-full flex-1 flex-row items-center gap-2">
          <Rating
            readOnly
            size="small"
            precision={0.5}
            defaultValue={params.value}
            max={5}
            icon={<NiStar variant="contained" size="small" className="contained" />}
            emptyIcon={<NiStar size="small" className="outlined" />}
          />
          <Typography variant="body2" component="span" className="text-text-secondary">
            ({params.row.ratingCount || 0})
          </Typography>
        </Box>
      ),
    },
    {
      field: "lastSale",
      headerName: "Last Sale",
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
      field: "updatedAt",
      headerName: "Updated At",
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
      minWidth: 120,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive", "No Stock"],
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const value = params.value;
        if (value === "Active") {
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
        } else if (value === "Inactive") {
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
                Products
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
                <Typography variant="body2">Products</Typography>
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
            columns: { columnVisibilityModel: { id: false, ratingCount: false } },
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
