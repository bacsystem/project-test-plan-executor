import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import {
  Box,
  Button,
  capitalize,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { getGridDateOperators, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import DataGridDateTimeFilter from "@/components/data-grid/data-grid-date-time-filter";
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

export default function DashboardDefaultProducts() {
  return (
    <Box>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Recent Products
        </Typography>
        <Button
          component={Link}
          href="/pages/ecommerce/products"
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
        >
          View All
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Box className="h-76.5">
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
              slots={{
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
                      <Select
                        {...propsCasted}
                        IconComponent={NiChevronDownSmall}
                        MenuProps={{ className: "outlined" }}
                      />
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
    </Box>
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
    editable: false,
    width: 160,
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
    width: 100,
    align: "left",
    editable: false,
    headerAlign: "left",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    align: "left",
    headerAlign: "left",
    width: 140,
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
    align: "right",
    headerAlign: "right",
    minWidth: 110,
    flex: 1,
    type: "singleSelect",
    editable: false,
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
    createdAt: dayjs("2025-05-11 14:20").toDate(),
    status: "Active",
  },
  {
    id: 473,
    image: "/images/products/product-2.jpg",
    name: "Subwoofer",
    price: 5.22,
    createdAt: dayjs("2025-05-16 14:20").toDate(),
    status: "Active",
  },
  {
    id: 474,
    image: "/images/products/product-3.jpg",
    name: "Dodo",
    price: 6.48,
    createdAt: dayjs("2025-05-12 14:20").toDate(),
    status: "Active",
  },
  {
    id: 475,
    image: "/images/products/product-4.jpg",
    name: "Stretchy",
    price: 14.26,
    createdAt: dayjs("2025-05-19 14:20").toDate(),
    status: "Done",
  },
  {
    id: 476,
    image: "/images/products/product-5.jpg",
    name: "Pony Soprano",
    price: 8.64,
    createdAt: dayjs("2025-05-24 14:20").toDate(),
    status: "Done",
  },
  {
    id: 477,
    image: "/images/products/product-6.jpg",
    name: "Buck Rogers",
    price: 8.84,
    createdAt: dayjs("2025-05-20 14:20").toDate(),
    status: "Pending",
  },
  {
    id: 478,
    image: "/images/products/product-7.jpg",
    name: "Cinnabun",
    price: 14.42,
    createdAt: dayjs("2025-05-27 14:20").toDate(),
    status: "Pending",
  },
  {
    id: 479,
    image: "/images/products/product-8.jpg",
    name: "Paperwork",
    price: 12.06,
    createdAt: dayjs("2025-05-27 08:45").toDate(),
    status: "Pending",
  },
  {
    id: 480,
    image: "/images/products/product-9.jpg",
    name: "Woolworth",
    price: 26.42,
    createdAt: dayjs("2025-05-16 16:45").toDate(),
    status: "Pending",
  },
  {
    id: 481,
    image: "/images/products/product-10.jpg",
    name: "Birb",
    price: 14.26,
    createdAt: dayjs("2025-05-24 14:20").toDate(),
    status: "Done",
  },
  {
    id: 482,
    image: "/images/products/product-11.jpg",
    name: "Bubbles",
    price: 16.42,
    createdAt: dayjs("2025-05-20 16:20").toDate(),
    status: "Done",
  },
  {
    id: 483,
    image: "/images/products/product-12.jpg",
    name: "Donatello",
    price: 12.62,
    createdAt: dayjs("2025-05-26 17:20").toDate(),
    status: "Done",
  },
  {
    id: 484,
    image: "/images/products/product-1.jpg",
    name: "Subwoofer",
    price: 6.54,
    createdAt: dayjs("2025-05-24 16:20").toDate(),
    status: "Done",
  },
  {
    id: 485,
    image: "/images/products/product-2.jpg",
    name: "Dodo",
    price: 12.24,
    createdAt: dayjs("2025-05-18 09:20").toDate(),
    status: "Done",
  },
  {
    id: 486,
    image: "/images/products/product-3.jpg",
    name: "Stretchy",
    price: 8.37,
    createdAt: dayjs("2025-05-12 06:30").toDate(),
    status: "Done",
  },
];
