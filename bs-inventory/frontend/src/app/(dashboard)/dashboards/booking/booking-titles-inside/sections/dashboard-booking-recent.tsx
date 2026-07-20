import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useCallback, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  getGridDateOperators,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  useGridApiRef,
} from "@mui/x-data-grid";

import DataGridDateTimeFilter from "@/components/data-grid/data-grid-date-time-filter";
import { DataGridPaginationFullPage } from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiSearch from "@/icons/nexture/ni-search";

const initialRows = [
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-1.jpg",
    location: "Positano",
    name: "Laura Ellis",
    dateStart: dayjs().add(30, "days").toDate(),
    dateEnd: dayjs().add(37, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-2.jpg",
    location: "Ericeira",
    name: "Sophia Martinez",
    dateStart: dayjs().add(40, "days").toDate(),
    dateEnd: dayjs().add(47, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-3.jpg",
    location: "Milos",
    name: "Olivia Peterson",
    dateStart: dayjs().add(50, "days").toDate(),
    dateEnd: dayjs().add(57, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-4.jpg",
    location: "Chacas",
    name: "Liam Carter",
    dateStart: dayjs().add(52, "days").toDate(),
    dateEnd: dayjs().add(62, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-5.jpg",
    location: "Zanzibar",
    name: "Mia Sullivan",
    dateStart: dayjs().add(60, "days").toDate(),
    dateEnd: dayjs().add(74, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-6.jpg",
    location: "Guanacaste",
    name: "Ethan Cooper",
    dateStart: dayjs().add(60, "days").toDate(),
    dateEnd: dayjs().add(74, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-7.jpg",
    location: "Cádiz",
    name: "Laura Ellis",
    dateStart: dayjs().add(68, "days").toDate(),
    dateEnd: dayjs().add(75, "days").toDate(),
    status: "Paid",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-8.jpg",
    location: "Montreal",
    name: "Ava Hamilton",
    dateStart: dayjs().add(70, "days").toDate(),
    dateEnd: dayjs().add(77, "days").toDate(),
    status: "Pending",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-9.jpg",
    location: "Maui",
    name: "Olivia Peterson",
    dateStart: dayjs().add(70, "days").toDate(),
    dateEnd: dayjs().add(77, "days").toDate(),
    status: "Pending",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/booking/booking-10.jpg",
    location: "Santorini",
    name: "Ethan Cooper",
    dateStart: dayjs().add(80, "days").toDate(),
    dateEnd: dayjs().add(90, "days").toDate(),
    status: "Cancelled",
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function DashboardBookingRecent() {
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
    {
      field: "image",
      headerName: "Image",
      width: 60,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link className="flex h-full items-center" href="/pages/ecommerce/product-detail">
          <img src={params.value as string} alt="grid image" className="h-10 w-12 rounded-sm object-cover" />
        </Link>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 120,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="#"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 font-semibold transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 140,
      editable: false,
      filterable: false,
    },
    {
      field: "dateStart",
      headerName: "Date",
      align: "left",
      headerAlign: "left",
      width: 220,
      type: "dateTime",
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        const value = params.value;
        if (value) {
          if (params.row.dateEnd) {
            return dayjs(value).format("MMM D, YYYY") + "-" + dayjs(params.row.dateEnd).format("MMM D, YYYY");
          }
          return dayjs(value).format("MMM D, YYYY");
        } else {
          <Box></Box>;
        }
      },
      filterOperators: getGridDateOperators(false).map((item) => ({
        ...item,
        InputComponent: DataGridDateTimeFilter,
      })),
      filterable: false,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      align: "left",
      headerAlign: "left",
      minWidth: 110,
      flex: 1,
      type: "singleSelect",
      editable: false,
      valueOptions: ["Paid", "Pending", "Cancelled"],
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const value = params.value;
        if (value === "Paid") {
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
        } else if (value === "Pending") {
          return (
            <Button
              className="pointer-events-none self-center"
              size="tiny"
              color="warning"
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
      filterable: false,
      editable: false,
      getActions: () => [
        <GridActionsCellItem key={1} icon={<NiPenSquare size="medium" />} label="Edit" showInMenu />,
        <GridActionsCellItem key={2} icon={<NiDuplicate size="medium" />} label="Duplicate" showInMenu />,
        <GridActionsCellItem key={0} icon={<NiCrossSquare size="medium" />} label="Delete" showInMenu />,
      ],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Box className="flex flex-row items-start justify-between">
          <Typography variant="h6" component="h6" className="card-title">
            Recent Bookings
          </Typography>
          <Button
            component={Link}
            href="#"
            size="tiny"
            color="grey"
            variant="text"
            startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
          >
            View All
          </Button>
        </Box>
        <DataGrid
          autoHeight
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: { id: false, dateEnd: false },
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          getRowSpacing={getRowSpacing}
          rowHeight={48}
          columnHeaderHeight={0}
          className="dense border-none"
          pagination
          slotProps={{
            panel: {
              className: "mt-1!",
            },
            main: {
              className: "overflow-visible",
            },
            columnHeaders: {
              className: "opacity-0",
            },
            footer: {
              className: "hidden",
            },
          }}
          slots={{
            columnHeaders: () => null,
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
          }}
          rowSelectionModel={rowSelectionModel}
          pageSizeOptions={[10, 20, 50, 100]}
          disableRowSelectionExcludeModel
          onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => {
            setRowSelectionModel(rowSelectionModel);
          }}
          hideFooterSelectedRowCount
        />
      </CardContent>
    </Card>
  );
}
