import * as React from "react";

import { Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridRenderEditCellParams } from "@mui/x-data-grid-pro";

import DataGridInput from "@/components/data-grid/data-grid-input";
import DataGridPagination from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiSearch from "@/icons/nexture/ni-search";

export default function DataGridCommunityVersion() {
  return (
    <Box className="h-97 w-full">
      <DataGrid
        rows={rows}
        columns={columns}
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
    </Box>
  );
}

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    field: "lastName",
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
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Johnson", firstName: "Emily", age: 14 },
  { id: 2, lastName: "Patel", firstName: "Nathan", age: 31 },
  { id: 3, lastName: "Garcia", firstName: "Sophia", age: 31 },
  { id: 4, lastName: "Müller", firstName: "Jack", age: 11 },
  { id: 5, lastName: "Nakamura", firstName: "Chloe", age: 28 },
  { id: 6, lastName: "Smith", firstName: "Ethan", age: 150 },
  { id: 7, lastName: "Dupont", firstName: "Mia", age: 44 },
  { id: 8, lastName: "Silva", firstName: "Oliver", age: 31 },
  { id: 9, lastName: "Kim", firstName: "Isabella", age: 64 },
  { id: 10, lastName: "Brown", firstName: "Liam", age: 45 },
  { id: 11, lastName: "Schmidt", firstName: "Charlotte", age: 23 },
  { id: 12, lastName: "Lopez", firstName: "Aiden", age: 27 },
  { id: 13, lastName: "Nguyen", firstName: "Amelia", age: 43 },
  { id: 14, lastName: "Evans", firstName: "Noah", age: 25 },
  { id: 15, lastName: "Jack", firstName: "Müller", age: 32 },
];
