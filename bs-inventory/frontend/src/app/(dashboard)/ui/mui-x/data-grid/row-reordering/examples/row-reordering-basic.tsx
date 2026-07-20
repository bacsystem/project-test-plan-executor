import { useState } from "react";

import { Box, Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGridPro, GridRowModel, GridRowOrderChangeParams } from "@mui/x-data-grid-pro";

import DataGridPagination from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiDragVertical from "@/icons/nexture/ni-drag-vertical";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";

function updateRowPosition(initialIndex: number, newIndex: number, rows: GridRowModel[]): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const rowsClone = [...rows];
        const row = rowsClone.splice(initialIndex, 1)[0];
        rowsClone.splice(newIndex, 0, row);
        resolve(rowsClone);
      },
      Math.random() * 500 + 100,
    ); // simulate network latency
  });
}

export default function RowReorderingBasic() {
  const { data, loading: initialLoadingState } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 6,
  });

  const [rowsState, setRowsState] = useState<GridRowModel[] | null>(null);
  const [loadingState, setLoadingState] = useState<boolean | null>(null);

  const rows = rowsState ?? data.rows;
  const loading = loadingState ?? initialLoadingState;

  const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
    setLoadingState(true);
    const newRows = await updateRowPosition(params.oldIndex, params.targetIndex, rows);

    setRowsState(newRows);
    setLoadingState(false);
  };

  return (
    <Box className="w-full">
      <DataGridPro
        {...data}
        loading={loading}
        rows={rows}
        rowReordering
        onRowOrderChange={handleRowOrderChange}
        className="border-none"
        disableRowSelectionOnClick
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
          exportIcon: NiArrowInDown,
          columnSelectorIcon: NiCols,
          columnMenuPinLeftIcon: NiPushPinLeft,
          columnMenuPinRightIcon: NiPushPinRight,
          rowReorderIcon: NiDragVertical,
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
