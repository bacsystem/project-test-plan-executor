import * as React from "react";

import {
  Badge,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  Select,
  SelectProps,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  ColumnsPanelTrigger,
  DataGrid,
  FilterPanelTrigger,
  GridInitialState,
  GridSlotProps,
  Toolbar,
  useGridApiContext,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

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
import NiPlus from "@/icons/nexture/ni-plus";
import NiSearch from "@/icons/nexture/ni-search";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    syncState: (stateToSave: GridInitialState) => void;
  }
}

function GridCustomToolbar({ syncState }: GridSlotProps["toolbar"]) {
  const apiRef = useGridApiContext();

  return (
    <Toolbar className="flex flex-row items-start">
      <Typography variant="h6" component="h6" className="card-title flex-1">
        Source Data Grid
      </Typography>
      <Grid size={"auto"} className="flex flex-row items-start gap-2">
        <Tooltip title="Columns">
          <ColumnsPanelTrigger
            render={(props) => (
              <Button {...props} className="icon-only" size="medium" color="grey" variant="text">
                <NiCols size={"medium"} />
              </Button>
            )}
          />
        </Tooltip>
        <Tooltip title="Filters">
          <FilterPanelTrigger
            render={(props, state) => (
              <Button {...props} className="icon-only" size="medium" color="grey" variant="text">
                <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                  <NiFilter size={"medium"} />
                </Badge>
              </Button>
            )}
          />
        </Tooltip>
        <Tooltip title="Recreate Second Grid">
          <Button
            onClick={() => syncState(apiRef.current.exportState())}
            size="medium"
            color="grey"
            variant="text"
            startIcon={<NiPlus size={"medium"} />}
          >
            Recreate Second Grid
          </Button>
        </Tooltip>
      </Grid>
    </Toolbar>
  );
}

export default function SaveAndRestoreStateBasic() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  const [savedState, setSavedState] = React.useState<{
    count: number;
    initialState: GridInitialState;
  }>({ count: 0, initialState: data.initialState! });

  const syncState = React.useCallback((newInitialState: GridInitialState) => {
    setSavedState((prev) => ({
      count: prev.count + 1,
      initialState: newInitialState,
    }));
  }, []);

  return (
    <>
      <Grid size={12}>
        <Card>
          <CardContent>
            <Box className="h-107.5 w-full">
              <DataGrid
                {...data}
                loading={loading}
                slots={{
                  toolbar: GridCustomToolbar,
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
                        <Select
                          {...propsCasted}
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        />
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
                slotProps={{ toolbar: { syncState } }}
                showToolbar
                className="border-none"
                checkboxSelection
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                disableRowSelectionOnClick
                pageSizeOptions={[5]}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Box className="h-107.5 w-full">
              <DataGrid
                {...data}
                loading={loading}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                  ...savedState.initialState,
                }}
                pageSizeOptions={[5]}
                key={savedState.count}
                className="border-none"
                checkboxSelection
                showToolbar
                slots={{
                  toolbar: () => {
                    return (
                      <Toolbar className="flex flex-row items-start">
                        <Typography variant="h6" component="h6" className="card-title flex-1">
                          Target Data Grid
                        </Typography>
                      </Toolbar>
                    );
                  },
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
                        <Select
                          {...propsCasted}
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        />
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
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
