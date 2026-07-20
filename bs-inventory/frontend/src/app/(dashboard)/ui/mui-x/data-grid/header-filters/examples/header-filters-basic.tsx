import dayjs from "dayjs";
import * as React from "react";

import { Button, FormControl, InputLabel, Select, SelectProps, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
  GridFilterInputValueProps,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import DataGridAutocomplete from "@/components/data-grid/data-grid-autocomplete";
import DataGridDate from "@/components/data-grid/data-grid-date";
import DataGridDateFilter from "@/components/data-grid/data-grid-date-filter";
import DataGridInput from "@/components/data-grid/data-grid-input";
import DataGridInputFilter from "@/components/data-grid/data-grid-input-filter";
import DataGridPagination from "@/components/data-grid/data-grid-pagination";
import DataGridSelect from "@/components/data-grid/data-grid-select";
import DataGridSlider from "@/components/data-grid/data-grid-slider";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";
import { cn } from "@/lib/utils";

export default function HeaderFiltersBasic() {
  return (
    <Box className="h-97 w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DataGridPro
          columns={columnsPro}
          rows={rowsPro}
          initialState={{
            columns: { columnVisibilityModel: { id: false } },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          className="border-none"
          pagination
          disableColumnFilter
          headerFilters
          slots={{
            headerFilterMenu: null,
            basePagination: DataGridPagination,
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
            columnMenuPinLeftIcon: NiPushPinLeft,
            columnMenuPinRightIcon: NiPushPinRight,
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
      </LocalizationProvider>
    </Box>
  );
}

const rowsPro = [
  {
    name: "Emily Johnson",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3532",
    age: "21",
    dateOfBirth: dayjs("2004-04-13").toDate(),
    progress: "30",
    gender: "Female",
    status: true,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Nathan Patel",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3533",
    age: "27",
    dateOfBirth: dayjs("2000-12-18").toDate(),
    progress: "68",
    gender: "Female",
    status: true,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Sophia Garcia",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3534",
    age: "24",
    dateOfBirth: dayjs("2000-01-24").toDate(),
    progress: "75",
    gender: "Male",
    status: true,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Jack Müller",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3535",
    age: "28",
    dateOfBirth: dayjs("1997-03-16").toDate(),
    progress: "75",
    gender: "Female",
    status: false,
    autocomplete: "DAP (Delivered at Place)",
  },
  {
    name: "Chloe Nakamura",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3536",
    age: "32",
    dateOfBirth: dayjs("1994-02-04").toDate(),
    progress: "10",
    gender: "Male",
    status: false,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Ethan Smith",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3537",
    age: "20",
    dateOfBirth: dayjs("2003-01-22").toDate(),
    progress: "10",
    gender: "Female",
    status: true,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Mia Dupont",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3538",
    age: "26",
    dateOfBirth: dayjs("1999-04-07").toDate(),
    progress: "65",
    gender: "Female",
    status: true,
    autocomplete: "DAP (Delivered at Place)",
  },
  {
    name: "Oliver Silva",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3539",
    age: "42",
    dateOfBirth: dayjs("1981-08-15").toDate(),
    progress: "65",
    gender: "Female",
    status: false,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Isabella Kim",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3540",
    age: "36",
    dateOfBirth: dayjs("1988-04-13").toDate(),
    progress: "20",
    gender: "Female",
    status: true,
    autocomplete: "CPT (Carriage Paid To)",
  },
  {
    name: "Liam Brown",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3541",
    age: "38",
    dateOfBirth: dayjs("1986-04-04").toDate(),
    progress: "88",
    gender: "Other",
    status: false,
    autocomplete: "FAS (Free Alongside Ship)",
  },
  {
    name: "Charlotte Schmidt",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3542",
    age: "34",
    dateOfBirth: dayjs("1989-08-27").toDate(),
    progress: "74",
    gender: "Male",
    status: false,
    autocomplete: "DAP (Delivered at Place)",
  },
  {
    name: "Aiden Lopez",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3543",
    age: "27",
    dateOfBirth: dayjs("1999-08-24").toDate(),
    progress: "60",
    gender: "Other",
    status: false,
    autocomplete: "CPT (Carriage Paid To)",
  },
  {
    name: "Amelia Nguyen",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3544",
    age: "35",
    dateOfBirth: dayjs("1989-04-23").toDate(),
    progress: "60",
    gender: "Female",
    status: true,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Noah Evans",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3545",
    age: "36",
    dateOfBirth: dayjs("1988-02-21").toDate(),
    progress: "95",
    gender: "Male",
    status: true,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Kim Chloe",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3541",
    age: "38",
    dateOfBirth: dayjs("1986-04-04").toDate(),
    progress: "88",
    gender: "Male",
    status: false,
    autocomplete: "FAS (Free Alongside Ship)",
  },
];

const columnsPro: GridColDef<(typeof rowsPro)[number]>[] = [
  {
    field: "id",
    filterable: false,
  },
  {
    field: "name",
    headerName: "Name",
    align: "left",
    headerAlign: "left",
    width: 120,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
    filterOperators: getGridStringOperators(false).map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridInputFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "age",
    headerName: "Age",
    align: "left",
    headerAlign: "left",
    type: "number",
    width: 120,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
    filterOperators: getGridNumericOperators().map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridInputFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    align: "left",
    headerAlign: "left",
    width: 220,
    type: "date",
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridDate {...params} />,
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      const value = params.value;
      if (value) {
        return dayjs(value).format("MM/DD/YYYY");
      } else {
        <Box></Box>;
      }
    },
    filterOperators: getGridDateOperators(false).map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridDateFilter isHeaderFilter={true} {...props} />,
    })),
    editable: true,
  },
  {
    field: "progress",
    headerName: "Progress",
    align: "left",
    headerAlign: "left",
    type: "number",
    width: 120,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => (
      <DataGridSlider {...params} editorProps={{ min: 0, max: 100, step: 1 }} />
    ),
    renderCell: (params: GridRenderCellParams<any, number>) => {
      const value = params.value || 0;
      const percent = value + "%";
      let background = "bg-success";
      if (value / 100 < 2 / 3) {
        background = "bg-warning";
      }
      if (value / 100 < 1 / 3) {
        background = "bg-error";
      }
      return (
        <Tooltip
          title={percent}
          arrow
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -24],
                  },
                },
              ],
            },
          }}
        >
          <Box className="flex h-full items-center justify-start">
            <Box className="bg-grey-50 h-0.5 w-full rounded-sm">
              <Box className={cn("h-0.5 w-1/3 rounded-xs", background)} style={{ width: percent }}></Box>
            </Box>
          </Box>
        </Tooltip>
      );
    },
    filterOperators: getGridNumericOperators().map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridInputFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "gender",
    headerName: "Gender",
    align: "left",
    headerAlign: "left",
    type: "singleSelect",
    width: 180,
    valueOptions: ["Female", "Male", "Other"],
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridSelect {...params} />,
  },
  {
    field: "status",
    headerName: "Status",
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
    field: "autocomplete",
    headerName: "Auto Complete",
    align: "left",
    headerAlign: "left",
    width: 200,
    type: "singleSelect",
    valueOptions: [
      "EXW (Ex Works)",
      "FAS (Free Alongside Ship)",
      "FCA (Free Carrier)",
      "CPT (Carriage Paid To)",
      "DAP (Delivered at Place)",
      "DPU (Delivered at Place Unloaded)",
      "DDP (Delivered Duty Paid)",
    ],
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridAutocomplete {...params} />,
    editable: true,
  },
];
