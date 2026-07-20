import * as React from "react";

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  SelectProps,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, QuickFilter, QuickFilterClear, QuickFilterControl, Toolbar } from "@mui/x-data-grid";
import { useMovieData } from "@mui/x-data-grid-generator";

import DataGridPagination from "@/components/data-grid/data-grid-pagination";
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
import NiSearch from "@/icons/nexture/ni-search";

const VISIBLE_FIELDS = ["title", "company", "director", "year", "cinematicUniverse"];

export default function QuickFilterBasic() {
  const data = useMovieData();

  const columns = React.useMemo(
    () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns],
  );

  function GridCustomToolbar() {
    return (
      <Toolbar className="flex flex-row items-center">
        <Typography variant="h6" component="h6" className="card-title flex-1">
          Basic
        </Typography>
        <QuickFilter expanded>
          <QuickFilterControl
            render={({ ref, ...other }) => (
              <TextField
                {...other}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                variant="standard"
                className="outlined me-0.25 max-w-80"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <NiSearch className="text-text-secondary" />
                      </InputAdornment>
                    ),
                    endAdornment: other.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear edge="end" size="small">
                          <NiCross className="text-text-secondary" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...other.slotProps?.input,
                  },
                  ...other.slotProps,
                }}
              />
            )}
          />
        </QuickFilter>
      </Toolbar>
    );
  }

  return (
    <Box className="h-172.5 w-full">
      <DataGrid
        {...data}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        className="border-none"
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        columns={columns}
        showToolbar
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
          exportIcon: NiArrowInDown,
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
