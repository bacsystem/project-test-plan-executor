import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  SelectProps,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { GridRenderCellParams, QuickFilter, QuickFilterClear, QuickFilterControl } from "@mui/x-data-grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiSearch from "@/icons/nexture/ni-search";
import { currencyFormatter } from "@/lib/utils";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function DashboardAnalyticsOrders() {
  function GridCustomToolbar() {
    return (
      <Toolbar className="flex flex-row items-center">
        <Typography variant="h6" component="h6" className="card-title flex-1">
          Recent Orders
        </Typography>
        <QuickFilter expanded>
          <QuickFilterControl
            render={({ ref, ...other }) => (
              <TextField
                {...other}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                variant="standard"
                className="outlined me-0.25 max-w-80"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <NiSearch className="text-text-secondary" />
                      </InputAdornment>
                    ),
                    endAdornment: other.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear edge="end" size="small">
                          <NiCross className="text-text-secondary" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...other.slotProps?.input,
                  },
                  ...other.slotProps,
                }}
              />
            )}
          />
        </QuickFilter>
      </Toolbar>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box className="h-120">
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columnHeaderHeight={40}
            disableRowSelectionOnClick
            className="border-none"
            showToolbar
            slots={{
              toolbar: GridCustomToolbar,
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
              filterPanelAddIcon: NiPlus,
              filterPanelRemoveAllIcon: NiBinEmpty,
              columnSelectorIcon: NiCols,
              exportIcon: NiArrowInDown,
              openFilterButtonIcon: NiFilter,
              baseSelect: (props) => {
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
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "image",
    headerName: "Image",
    width: 70,
    editable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <Link className="flex h-full items-center" href="/pages/ecommerce/product-detail">
        <img src={params.value as string} alt="grid image" className="h-9 w-12 rounded-sm object-cover" />
      </Link>
    ),
  },
  {
    field: "id",
    headerName: "ID",
    width: 60,
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
    field: "name",
    headerName: "Name",
    width: 140,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <Link
        href="/pages/ecommerce/product-detail"
        className="text-text-primary link-primary link-underline-none hover:text-primary py-2 font-semibold transition-colors"
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 80,
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
    field: "status",
    headerName: "Status",
    align: "right",
    headerAlign: "right",
    minWidth: 110,
    flex: 1,
    type: "singleSelect",
    valueOptions: ["Active", "Done", "Pending"],
    renderCell: (params: GridRenderCellParams<any, string>) => {
      const value = params.value;
      if (value === "Active") {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="success"
            variant="pastel"
            startIcon={<NiPlusSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      } else if (value === "Done") {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="info"
            variant="pastel"
            startIcon={<NiCheckSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      } else {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="warning"
            variant="pastel"
            startIcon={<NiExclamationSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      }
    },
  },
];

const rows = [
  {
    id: 472,
    image: "/images/products/product-1.jpg",
    name: "Woolworth",
    price: 17.84,
    status: "Active",
  },
  {
    id: 473,
    image: "/images/products/product-2.jpg",
    name: "Subwoofer",
    price: 5.22,
    status: "Active",
  },
  {
    id: 474,
    image: "/images/products/product-3.jpg",
    name: "Dodo",
    price: 6.48,
    status: "Active",
  },
  {
    id: 475,
    image: "/images/products/product-4.jpg",
    name: "Stretchy",
    price: 14.26,
    status: "Done",
  },
  {
    id: 476,
    image: "/images/products/product-5.jpg",
    name: "Pony Soprano",
    price: 8.64,
    status: "Done",
  },
  {
    id: 477,
    image: "/images/products/product-6.jpg",
    name: "Buck Rogers",
    price: 8.84,
    status: "Pending",
  },
  {
    id: 478,
    image: "/images/products/product-7.jpg",
    name: "Cinnabun",
    price: 14.42,
    status: "Pending",
  },
  {
    id: 479,
    image: "/images/products/product-8.jpg",
    name: "Paperwork",
    price: 12.06,
    status: "Pending",
  },
  {
    id: 480,
    image: "/images/products/product-9.jpg",
    name: "Woolworth",
    price: 26.42,
    status: "Pending",
  },
  {
    id: 481,
    image: "/images/products/product-10.jpg",
    name: "Birb",
    price: 14.26,
    status: "Done",
  },
  {
    id: 482,
    image: "/images/products/product-11.jpg",
    name: "Bubbles",
    price: 16.42,
    status: "Done",
  },
  {
    id: 483,
    image: "/images/products/product-12.jpg",
    name: "Donatello",
    price: 12.62,
    status: "Done",
  },
  {
    id: 484,
    image: "/images/products/product-1.jpg",
    name: "Subwoofer",
    price: 6.54,
    status: "Done",
  },
  {
    id: 485,
    image: "/images/products/product-2.jpg",
    name: "Dodo",
    price: 12.24,
    status: "Done",
  },
  {
    id: 486,
    image: "/images/products/product-3.jpg",
    name: "Stretchy",
    price: 8.37,
    status: "Done",
  },
];
