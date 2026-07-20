import * as React from "react";

import { Box, Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import {
  randomCity,
  randomEmail,
  randomId,
  randomInt,
  randomTraderName,
  randomUserName,
} from "@mui/x-data-grid-generator";
import { DataGridPro, GridColDef, GridPinnedRowsProp } from "@mui/x-data-grid-pro";

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
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "city", headerName: "City", width: 150 },
  { field: "username", headerName: "Username" },
  { field: "email", headerName: "Email", width: 200 },
  { field: "age", type: "number", headerName: "Age" },
];

const rows: object[] = [];

function getRow() {
  return {
    id: randomId(),
    name: randomTraderName(),
    city: randomCity(),
    username: randomUserName(),
    email: randomEmail(),
    age: randomInt(10, 80),
  };
}

for (let i = 0; i < 10; i += 1) {
  rows.push(getRow());
}

const pinnedRows: GridPinnedRowsProp = {
  top: [getRow(), getRow()],
  bottom: [getRow()],
};

export default function RowPinningBasic() {
  return (
    <Box className="h-125 w-full">
      <DataGridPro
        columns={columns}
        rows={rows}
        pinnedRows={pinnedRows}
        className="border-none"
        disableRowSelectionOnClick
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
    </Box>
  );
}
