import { useLocale } from "next-intl";
import * as React from "react";

import { Box, Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { randomCreatedDate, randomEmail, randomTraderName, randomUpdatedDate } from "@mui/x-data-grid-generator";
import { DataGridPro, GridActionsCellItem, GridColDef, GridRowsProp } from "@mui/x-data-grid-pro";

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
import NiPen from "@/icons/nexture/ni-pen";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";

export default function ColumnPinningBasic() {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <Box className="h-100 w-full">
      <DataGridPro
        rows={rows}
        columns={columns}
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
        initialState={{
          pinnedColumns: {
            left: direction === "ltr" ? ["name"] : ["actions"],
            right: direction === "ltr" ? ["actions"] : ["name"],
          },
        }}
      />
    </Box>
  );
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 300, editable: true },
  { field: "email", headerName: "Email", width: 300, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 300,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 300,
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    align: "right",
    headerAlign: "right",
    type: "actions",
    width: 100,
    getActions: () => [
      <GridActionsCellItem key="edit" icon={<NiPen size={"small"} />} label="Edit" />,
      <GridActionsCellItem key="delete" icon={<NiBinEmpty size={"small"} />} label="Delete" />,
    ],
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    email: randomEmail(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    email: randomEmail(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    email: randomEmail(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    email: randomEmail(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    email: randomEmail(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 6,
    name: randomTraderName(),
    email: randomEmail(),
    age: 27,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 7,
    name: randomTraderName(),
    email: randomEmail(),
    age: 18,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 8,
    name: randomTraderName(),
    email: randomEmail(),
    age: 31,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 9,
    name: randomTraderName(),
    email: randomEmail(),
    age: 24,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 10,
    name: randomTraderName(),
    email: randomEmail(),
    age: 35,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
