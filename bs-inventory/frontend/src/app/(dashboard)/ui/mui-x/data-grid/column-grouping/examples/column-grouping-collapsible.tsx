import * as React from "react";

import { Box, Button, FormControl, IconButton, InputLabel, Select, SelectProps, styled } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupHeaderParams,
  GridColumnGroupingModel,
  gridColumnVisibilityModelSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import DataGridPagination from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiSearch from "@/icons/nexture/ni-search";

const COLLAPSIBLE_COLUMN_GROUPS: Record<string, string[]> = {
  character: ["lastName", "age"],
  naming: ["lastName"],
};

const ColumnGroupRoot = styled("div")({
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
});

const ColumnGroupTitle = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function CollapsibleHeaderGroup({ groupId, headerName }: GridColumnGroupHeaderParams) {
  const apiRef = useGridApiContext();
  const columnVisibilityModel = gridColumnVisibilityModelSelector(apiRef);

  if (!groupId) {
    return null;
  }

  const isCollapsible = Boolean(COLLAPSIBLE_COLUMN_GROUPS[groupId]);
  const isGroupCollapsed = COLLAPSIBLE_COLUMN_GROUPS[groupId].every((field) => columnVisibilityModel[field] === false);

  return (
    <ColumnGroupRoot>
      <ColumnGroupTitle>{headerName ?? groupId}</ColumnGroupTitle>{" "}
      {isCollapsible && (
        <IconButton
          className="ms-0.5"
          onClick={() => {
            const newModel = { ...columnVisibilityModel };
            COLLAPSIBLE_COLUMN_GROUPS[groupId].forEach((field) => {
              newModel[field] = !!isGroupCollapsed;
            });
            apiRef.current.setColumnVisibilityModel(newModel);
          }}
        >
          {isGroupCollapsed ? <NiChevronRightSmall size={"small"} /> : <NiChevronDownSmall size={"small"} />}
        </IconButton>
      )}
    </ColumnGroupRoot>
  );
}

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "Internal",
    description: "",
    children: [{ field: "id" }],
  },
  {
    groupId: "character",
    description: "Information about the character",
    headerName: "Basic info",
    renderHeaderGroup: (params) => {
      return <CollapsibleHeaderGroup {...params} />;
    },
    children: [
      {
        groupId: "naming",
        headerName: "Names",
        renderHeaderGroup: (params) => <CollapsibleHeaderGroup {...params} />,
        children: [{ field: "lastName" }, { field: "firstName" }],
      },
      { field: "age" },
    ],
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function ColumnGroupingCollapsible() {
  return (
    <Box className="h-112 w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DataGrid
          className="border-none"
          rows={rows}
          columns={columns}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          columnGroupingModel={columnGroupingModel}
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
            filterPanelDeleteIcon: NiCross,
            filterPanelRemoveAllIcon: NiBinEmpty,
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
