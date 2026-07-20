import dayjs from "dayjs";
import * as React from "react";

import { Button, FormControl, InputLabel, Select, SelectProps, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGridPremium,
  FilterColumnsArgs,
  getGridDateOperators,
  GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import DataGridDate from "@/components/data-grid/data-grid-date";
import DataGridDateFilter from "@/components/data-grid/data-grid-date-filter";
import DataGridInput from "@/components/data-grid/data-grid-input";
import DataGridPagination from "@/components/data-grid/data-grid-pagination";
import DataGridSelect from "@/components/data-grid/data-grid-select";
import DataGridSlider from "@/components/data-grid/data-grid-slider";
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiArrowCircleRight from "@/icons/nexture/ni-arrow-circle-right";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheck from "@/icons/nexture/ni-check";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEndDownSmall from "@/icons/nexture/ni-end-down-small";
import NiEndUpSmall from "@/icons/nexture/ni-end-up-small";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiGroup from "@/icons/nexture/ni-group";
import NiPivot from "@/icons/nexture/ni-pivot";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";
import NiSum from "@/icons/nexture/ni-sum";
import NiUngroup from "@/icons/nexture/ni-ungroup";
import { cn } from "@/lib/utils";

const getTogglableColumns = (columns: GridColDef[]) => {
  return columns.filter((column) => column.type !== "custom").map((column) => column.field);
};

const getFilterableColumns = ({ columns }: FilterColumnsArgs) => {
  return columns.filter((column) => column.type !== "custom").map((column) => column.field);
};

export default function DataGridPremiumVersion() {
  const apiRef = useGridApiRef();

  return (
    <Box className="h-132 w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DataGridPremium
          rows={rowsPremium}
          columns={columnsPremium}
          initialState={{
            columns: { columnVisibilityModel: { id: false, commodity: false } },
            rowGrouping: {
              model: ["commodity"],
            },
            sorting: {
              sortModel: [{ field: GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, sort: "asc" }],
            },
            aggregation: {
              model: {
                quantity: "sum",
                filledQuantity: "avg",
              },
            },
          }}
          apiRef={apiRef}
          disableRowSelectionOnClick
          showToolbar
          checkboxSelection
          pageSizeOptions={[5, 10]}
          className="border-none"
          label="Premium Version"
          hideFooter
          slotProps={{
            filterPanel: {
              filterFormProps: {
                filterColumns: getFilterableColumns,
              },
            },
            columnsManagement: {
              getTogglableColumns,
            },
          }}
          slots={{
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
            columnMenuPinLeftIcon: NiPushPinLeft,
            columnMenuPinRightIcon: NiPushPinRight,
            columnMenuAggregationIcon: NiSum,
            columnMenuGroupIcon: NiGroup,
            columnMenuUngroupIcon: NiUngroup,
            filterPanelDeleteIcon: NiCross,
            filterPanelAddIcon: NiPlus,
            filterPanelRemoveAllIcon: NiBinEmpty,
            pivotIcon: NiPivot,
            columnSelectorIcon: NiCols,
            exportIcon: NiArrowInDown,
            openFilterButtonIcon: NiFilter,
            collapsibleIcon: NiChevronDownSmall,
            redoIcon: NiArrowCircleRight,
            undoIcon: NiArrowCircleLeft,
            pivotMenuAddIcon: () => {
              return <NiPlus size={"small"}></NiPlus>;
            },
            pivotMenuCheckIcon: () => {
              return <NiCheck size={"small"}></NiCheck>;
            },
            pivotMenuMoveDownIcon: () => {
              return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
            },
            pivotMenuMoveUpIcon: () => {
              return <NiChevronUpSmall size={"small"}></NiChevronUpSmall>;
            },
            pivotMenuMoveToBottomIcon: () => {
              return <NiEndDownSmall size={"small"}></NiEndDownSmall>;
            },
            pivotMenuMoveToTopIcon: () => {
              return <NiEndUpSmall size={"small"}></NiEndUpSmall>;
            },
            pivotMenuRemoveIcon: () => {
              return <NiCross size={"small"}></NiCross>;
            },
            pivotSearchIcon: () => {
              return <NiSearch size={"small"}></NiSearch>;
            },
            pivotSearchClearIcon: () => {
              return <NiCross size={"medium"} />;
            },
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

const rowsPremium = [
  {
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3532",
    commodity: "Cocoa",
    filledQuantity: 0.82,
    quantity: 21248,
    unitPrice: 24.4,
    tradeDate: dayjs("2025-06-16").toDate(),
    status: true,
    currency: "USD",
  },
  {
    id: "0e58e20a-f9b2-5a8b-a95f-ac29f09425a0",
    commodity: "Cocoa",
    filledQuantity: 0.96,
    quantity: 20048,
    unitPrice: 28.2,
    tradeDate: dayjs("2025-06-24").toDate(),
    status: true,
    currency: "USD",
  },
  {
    id: "6db5e241-e0e3-523e-9c10-ada885c353f8",
    commodity: "Cocoa",
    filledQuantity: 0.84,
    quantity: 62118,
    unitPrice: 55.8,
    tradeDate: dayjs("2025-06-20").toDate(),
    status: false,
    currency: "USD",
  },
  {
    id: "576b5a88-112b-5ce4-bcaa-28b8beaf705d",
    commodity: "Cocoa",
    filledQuantity: 0.76,
    quantity: 36168,
    unitPrice: 55.8,
    tradeDate: dayjs("2025-06-20").toDate(),
    status: true,
    currency: "USD",
  },
  {
    id: "60f6f8de-83c7-54f0-8cf1-d5eabb3d8748",
    commodity: "Cocoa",
    filledQuantity: 0.88,
    quantity: 20884,
    unitPrice: 62.4,
    tradeDate: dayjs("2025-06-28").toDate(),
    status: true,
    currency: "USD",
  },
  {
    id: "c2a4ee25-e64a-5073-9391-92a1129f77d4",
    commodity: "Soybeans",
    filledQuantity: 0.15,
    quantity: 38946,
    unitPrice: 36.8,
    tradeDate: dayjs("2025-06-14").toDate(),
    status: true,
    currency: "CAD",
  },
  {
    id: "db2c1320-a12e-5817-acc7-367d62aefe61",
    commodity: "Soybeans",
    filledQuantity: 0.24,
    quantity: 24602,
    unitPrice: 42.2,
    tradeDate: dayjs("2025-06-01").toDate(),
    status: true,
    currency: "CAD",
  },
  {
    id: "14aeffa7-2fbd-5609-a541-72b913cebcb1",
    commodity: "Rice",
    filledQuantity: 0.22,
    quantity: 40681,
    unitPrice: 62.8,
    tradeDate: dayjs("2025-06-20").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "60071e8c-7d4f-583f-b41c-7f54f730116a",
    commodity: "Rice",
    filledQuantity: 0.26,
    quantity: 36024,
    unitPrice: 22.6,
    tradeDate: dayjs("2025-06-06").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "6c1418fd-0ee2-5915-83e1-35d219019337",
    commodity: "Rice",
    filledQuantity: 0.32,
    quantity: 42846,
    unitPrice: 46.2,
    tradeDate: dayjs("2025-06-12").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "de76a70e-e6e6-5450-9a01-3dd8d16cc743",
    commodity: "Rice",
    filledQuantity: 0.16,
    quantity: 24520,
    unitPrice: 36.6,
    tradeDate: dayjs("2025-03-14").toDate(),
    status: true,
    currency: "USD",
  },
  {
    id: "1b61cebc-b7f2-5494-8e21-931ad4193c59",
    commodity: "Corn",
    filledQuantity: 0.86,
    quantity: 24781,
    unitPrice: 36.2,
    tradeDate: dayjs("2025-06-10").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "230d1256-a7a2-5fbd-9910-a1afd139c3aa",
    commodity: "Corn",
    filledQuantity: 0.86,
    quantity: 24781,
    unitPrice: 36.2,
    tradeDate: dayjs("2025-06-10").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "aafdfba2-26f9-54ce-9b71-30f2f8596ef8",
    commodity: "Corn",
    filledQuantity: 0.92,
    quantity: 36040,
    unitPrice: 82.6,
    tradeDate: dayjs("2025-06-16").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "23a026a8-9a1e-5157-a9cf-cca4d2905975",
    commodity: "Corn",
    filledQuantity: 0.84,
    quantity: 24460,
    unitPrice: 72.4,
    tradeDate: dayjs("2025-06-26").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "bbd3e951-6d49-5ae7-944c-e73d7b001774",
    commodity: "Sugar",
    filledQuantity: 0.16,
    quantity: 21680,
    unitPrice: 87.5,
    tradeDate: dayjs("2025-06-16").toDate(),
    status: true,
    currency: "CAD",
  },
  {
    id: "b0d29f68-3b74-5740-aeb1-92d39079ee36",
    commodity: "Sugar",
    filledQuantity: 0.32,
    quantity: 60720,
    unitPrice: 52.8,
    tradeDate: dayjs("2025-06-18").toDate(),
    status: true,
    currency: "CAD",
  },
  {
    id: "755b3384-dc67-5d4f-87b3-44a4c8a5aa18",
    commodity: "Sugar",
    filledQuantity: 0.58,
    quantity: 42610,
    unitPrice: 48.6,
    tradeDate: dayjs("2025-05-24").toDate(),
    status: true,
    currency: "CAD",
  },
  {
    id: "3ad7eb65-8744-5850-aafa-fa2dbdd563f9",
    commodity: "Sugar",
    filledQuantity: 0.26,
    quantity: 18502,
    unitPrice: 36.8,
    tradeDate: dayjs("2025-02-16").toDate(),
    status: true,
    currency: "CAD",
  },
  {
    id: "07f7678f-aef9-5122-839b-0470265ccda1",
    commodity: "Cotton",
    filledQuantity: 0.92,
    quantity: 12060,
    unitPrice: 15.2,
    tradeDate: dayjs("2025-04-08").toDate(),
    status: false,
    currency: "USD",
  },
  {
    id: "c1554098-f4b2-55c1-b9bd-2f23c63b5451",
    commodity: "Cotton",
    filledQuantity: 0.64,
    quantity: 34244,
    unitPrice: 42.6,
    tradeDate: dayjs("2025-02-26").toDate(),
    status: true,
    currency: "USD",
  },
  {
    id: "f8f40b26-1d1c-5a0f-a1ff-fa1870aa334e",
    commodity: "Silk",
    filledQuantity: 0.74,
    quantity: 38400,
    unitPrice: 52.6,
    tradeDate: dayjs("2025-06-10").toDate(),
    status: true,
    currency: "EUR",
  },
  {
    id: "374f6586-3495-5fc3-92f4-11c939df00aa",
    commodity: "Silk",
    filledQuantity: 0.62,
    quantity: 20580,
    unitPrice: 48.4,
    tradeDate: dayjs("2025-06-10").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "b52c5e42-47c0-5972-bf19-82e097e35f2a",
    commodity: "Silk",
    filledQuantity: 0.44,
    quantity: 36220,
    unitPrice: 34.6,
    tradeDate: dayjs("2025-06-18").toDate(),
    status: true,
    currency: "EUR",
  },
  {
    id: "fa9f416a-5d90-5209-bdfb-471bcfbd8dd8",
    commodity: "Silk",
    filledQuantity: 0.38,
    quantity: 44020,
    unitPrice: 42.2,
    tradeDate: dayjs("2025-06-26").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "676d2878-8d16-5ffb-8cb6-73976e591cc8",
    commodity: "Timber",
    filledQuantity: 0.27,
    quantity: 28442,
    unitPrice: 74.2,
    tradeDate: dayjs("2025-06-04").toDate(),
    status: true,
    currency: "EUR",
  },
  {
    id: "86dfbdeb-b6bb-56ef-ac31-5b9bf61c9089",
    commodity: "Timber",
    filledQuantity: 0.68,
    quantity: 36084,
    unitPrice: 64.8,
    tradeDate: dayjs("2025-06-16").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "ca0ad72f-0028-5c74-b8b9-f4d016776c51",
    commodity: "Salt",
    filledQuantity: 0.68,
    quantity: 40156,
    unitPrice: 62.4,
    tradeDate: dayjs("2025-06-26").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "ced8919f-65b4-5d62-9bba-05b737294847",
    commodity: "Salt",
    filledQuantity: 0.34,
    quantity: 28120,
    unitPrice: 46.8,
    tradeDate: dayjs("2025-06-20").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "7f06aa49-c237-5007-bd1e-07b41b99d649",
    commodity: "Salt",
    filledQuantity: 0.58,
    quantity: 32840,
    unitPrice: 36.2,
    tradeDate: dayjs("2025-06-24").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "14d0ec4f-cbb6-5a6a-9203-e1d01264c854",
    commodity: "Salt",
    filledQuantity: 0.42,
    quantity: 12840,
    unitPrice: 22.6,
    tradeDate: dayjs("2025-06-20").toDate(),
    status: false,
    currency: "EUR",
  },
  {
    id: "2e93c9bd-1c0b-55ab-b292-3686bd89f2de",
    commodity: "Leather",
    filledQuantity: 0.56,
    quantity: 10448,
    unitPrice: 50.8,
    tradeDate: dayjs("2025-06-14").toDate(),
    status: false,
    currency: "GBP",
  },
  {
    id: "6573ef24-c3be-5421-9547-ec95a42247c5",
    commodity: "Leather",
    filledQuantity: 0.24,
    quantity: 21541,
    unitPrice: 34.6,
    tradeDate: dayjs("2025-04-06").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "e5164e36-24b0-544a-869c-2381ea10583f",
    commodity: "Leather",
    filledQuantity: 0.24,
    quantity: 24040,
    unitPrice: 42.6,
    tradeDate: dayjs("2025-06-24").toDate(),
    status: false,
    currency: "GBP",
  },
  {
    id: "d320df93-cb35-5d62-842c-fc6e430ab14a",
    commodity: "Leather",
    filledQuantity: 0.86,
    quantity: 36268,
    unitPrice: 54.2,
    tradeDate: dayjs("2025-06-18").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "e9dc4048-b941-5d02-919a-a8dcf94fe0f3",
    commodity: "Leather",
    filledQuantity: 0.76,
    quantity: 14048,
    unitPrice: 20.8,
    tradeDate: dayjs("2025-06-10").toDate(),
    status: true,
    currency: "GBP",
  },
  {
    id: "1e78c2a1-8a69-5f8a-9275-37ee3633c221",
    commodity: "Leather",
    filledQuantity: 0.68,
    quantity: 12782,
    unitPrice: 38.2,
    tradeDate: dayjs("2025-06-14").toDate(),
    status: true,
    currency: "GBP",
  },
];

const columnsPremium: GridColDef<(typeof rowsPremium)[number]>[] = [
  {
    field: "id",
    filterable: false,
  },
  {
    editable: true,
    field: "commodity",
    width: 140,
    headerName: "Commodity",
    align: "left",
    headerAlign: "left",
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    editable: true,
    field: "quantity",
    width: 140,
    headerName: "Quantity",
    align: "left",
    headerAlign: "left",
    type: "number",
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    editable: true,
    field: "filledQuantity",
    width: 120,
    headerName: "Filled Quantity",
    align: "left",
    headerAlign: "left",
    type: "number",
    renderEditCell: (params: GridRenderEditCellParams) => (
      <DataGridSlider {...params} editorProps={{ min: 0, max: 1, step: 0.01 }} />
    ),
    availableAggregationFunctions: ["min", "max", "avg", "size"],
    renderCell: (params: GridRenderCellParams<any, number>) => {
      const value = params.value || 0;
      const percent = Math.round(value * 100) + "%";
      let background = "bg-success";
      if (value < 2 / 3) {
        background = "bg-warning";
      }
      if (value < 1 / 3) {
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
  },
  {
    field: "currency",
    headerName: "Currency",
    align: "left",
    headerAlign: "left",
    type: "singleSelect",
    width: 120,
    valueOptions: ["USD", "GBP", "JPY", "EUR", "BRL", "MXN", "AUD", "CAD", "NZD", "ARS", "TRY"],
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridSelect {...params} />,
  },
  {
    field: "tradeDate",
    headerName: "Trade Date",
    align: "left",
    headerAlign: "left",
    width: 140,
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
      InputComponent: DataGridDateFilter,
    })),
    editable: true,
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
    field: "unitPrice",
    headerName: "Unit Price",
    align: "left",
    headerAlign: "left",
    type: "number",
    width: 140,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    editable: true,
    field: "subTotal",
    width: 180,
    headerName: "Sub Total",
    align: "left",
    headerAlign: "left",
    type: "number",
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
    valueGetter: (value, row) => row.quantity * row.unitPrice,
  },
];
