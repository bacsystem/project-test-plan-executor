import * as React from "react";

import { Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGridPro, DataGridProProps, GridColDef, GridRowsProp, GridSortModel } from "@mui/x-data-grid-pro";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
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

const rows: GridRowsProp = [
  {
    hierarchy: ["Sarah"],
    jobTitle: "Head of Human Resources",
    recruitmentDate: new Date(2020, 8, 12),
    id: 0,
  },
  {
    hierarchy: ["Thomas"],
    jobTitle: "Head of Sales",
    recruitmentDate: new Date(2017, 3, 4),
    id: 1,
  },
  {
    hierarchy: ["Thomas", "Robert"],
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 11, 20),
    id: 2,
  },
  {
    hierarchy: ["Thomas", "Karen"],
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 10, 14),
    id: 3,
  },
  {
    hierarchy: ["Thomas", "Nancy"],
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2017, 10, 29),
    id: 4,
  },
  {
    hierarchy: ["Thomas", "Daniel"],
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 7, 21),
    id: 5,
  },
  {
    hierarchy: ["Thomas", "Christopher"],
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2020, 7, 20),
    id: 6,
  },
  {
    hierarchy: ["Thomas", "Donald"],
    jobTitle: "Sales Person",
    recruitmentDate: new Date(2019, 6, 28),
    id: 7,
  },
  {
    hierarchy: ["Mary"],
    jobTitle: "Head of Engineering",
    recruitmentDate: new Date(2016, 3, 14),
    id: 8,
  },
  {
    hierarchy: ["Mary", "Jennifer"],
    jobTitle: "Tech lead front",
    recruitmentDate: new Date(2016, 5, 17),
    id: 9,
  },
  {
    hierarchy: ["Mary", "Jennifer", "Anna"],
    jobTitle: "Front-end developer",
    recruitmentDate: new Date(2019, 11, 7),
    id: 10,
  },
  {
    hierarchy: ["Mary", "Michael"],
    jobTitle: "Tech lead devops",
    recruitmentDate: new Date(2021, 7, 1),
    id: 11,
  },
  {
    hierarchy: ["Mary", "Linda"],
    jobTitle: "Tech lead back",
    recruitmentDate: new Date(2017, 0, 12),
    id: 12,
  },
  {
    hierarchy: ["Mary", "Linda", "Elizabeth"],
    jobTitle: "Back-end developer",
    recruitmentDate: new Date(2019, 2, 22),
    id: 13,
  },
  {
    hierarchy: ["Mary", "Linda", "William"],
    jobTitle: "Back-end developer",
    recruitmentDate: new Date(2018, 4, 19),
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
];

const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) => row.hierarchy;

export default function TreeDataBasic() {
  const [sortModel, setSortModel] = React.useState<GridSortModel>([{ field: "recruitmentDate", sort: "asc" }]);

  return (
    <Box className="h-100 w-full">
      <DataGridPro
        treeData
        rows={rows}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        defaultGroupingExpansionDepth={-1}
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
          filterPanelRemoveAllIcon: NiBinEmpty,
          exportIcon: NiArrowInDown,
          columnSelectorIcon: NiCols,
          detailPanelExpandIcon: NiChevronLeftRightSmall,
          detailPanelCollapseIcon: NiChevronDownSmall,
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
