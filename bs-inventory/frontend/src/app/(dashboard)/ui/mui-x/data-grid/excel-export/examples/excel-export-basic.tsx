import * as React from "react";

import { Box, Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { DataGridPremium, GridColDef, GridRowsProp } from "@mui/x-data-grid-premium";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheck from "@/icons/nexture/ni-check";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
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

const rows: GridRowsProp = [
  {
    jobTitle: "Head of Human Resources",
    recruitmentDate: new Date(2020, 8, 12),
    contract: "full time",
    id: 0,
  },
  {
    jobTitle: "Head of Sales",
    recruitmentDate: new Date(2017, 3, 4),
    contract: "full time",
    id: 1,
  },
  {
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 11, 20),
    contract: "full time",
    id: 2,
  },
  {
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 10, 14),
    contract: "part time",
    id: 3,
  },
  {
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2017, 10, 29),
    contract: "part time",
    id: 4,
  },
  {
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 7, 21),
    contract: "full time",
    id: 5,
  },
  {
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 7, 20),
    contract: "intern",
    id: 6,
  },
  {
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2019, 6, 28),
    contract: "full time",
    id: 7,
  },
  {
    jobTitle: "Head of Engineering",
    recruitmentDate: new Date(2016, 3, 14),
    contract: "full time",
    id: 8,
  },
  {
    jobTitle: "Tech lead front",
    recruitmentDate: new Date(2016, 5, 17),
    contract: "full time",
    id: 9,
  },
  {
    jobTitle: "Front-end developer",
    recruitmentDate: new Date(2019, 11, 7),
    contract: "full time",
    id: 10,
  },
  {
    jobTitle: "Tech lead devops",
    recruitmentDate: new Date(2021, 7, 1),
    contract: "full time",
    id: 11,
  },
  {
    jobTitle: "Tech lead back",
    recruitmentDate: new Date(2017, 0, 12),
    contract: "full time",
    id: 12,
  },
  {
    jobTitle: "Back-end developer",
    recruitmentDate: new Date(2019, 2, 22),
    contract: "intern",
    id: 13,
  },
  {
    jobTitle: "Back-end developer",
    recruitmentDate: new Date(2018, 4, 19),
    contract: "part time",
    id: 14,
  },
];

const columns: GridColDef[] = [
  { field: "jobTitle", headerName: "Job Title", width: 200 },
  {
    field: "recruitmentDate",
    headerName: "Recruitment Date",
    type: "date",
    width: 150,
  },
  {
    field: "contract",
    headerName: "Contract Type",
    type: "singleSelect",
    valueOptions: ["full time", "part time", "intern"],
    width: 150,
  },
];

export default function ExcelExport() {
  return (
    <Box className="h-106 w-full">
      <DataGridPremium
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        showToolbar
        label="Basic"
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
    </Box>
  );
}
