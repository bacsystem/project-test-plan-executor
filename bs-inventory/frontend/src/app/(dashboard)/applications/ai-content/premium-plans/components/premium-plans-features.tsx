import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useCallback, useState } from "react";

import { Box, Button, FormControl, InputLabel, Select, SelectProps, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridRenderCellParams, GridRowSelectionModel, GridRowSpacingParams } from "@mui/x-data-grid";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiSearch from "@/icons/nexture/ni-search";

const initialRows = [
  {
    id: crypto.randomUUID(),
    feature: "Library",
    starterSpark: true,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Fast output",
    starterSpark: true,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Style presets",
    starterSpark: true,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Prompt improvement",
    starterSpark: true,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Watermark-free images",
    starterSpark: false,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Advanced prompt support",
    starterSpark: false,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Custom aspect ratios",
    starterSpark: false,
    creatorPulse: true,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Batch generation",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Access to multiple models",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Custom model training",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Prompt history & reuse",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Print-ready export formats",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: true,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Custom onboarding / workspace setup",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: false,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Prompt chaining / multi-pass rendering",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: false,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Brand kit upload",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: false,
    designNexus: true,
  },
  {
    id: crypto.randomUUID(),
    feature: "Role based access control",
    starterSpark: false,
    creatorPulse: false,
    visionArchitect: false,
    designNexus: true,
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function PremiumPlansFeatures() {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set(),
  });

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: 5,
    };
  }, []);

  const [rows] = useState<Row[]>(initialRows);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 240,
      type: "string",
    },
    {
      field: "feature",
      headerName: "Feature",
      align: "left",
      headerAlign: "left",
      type: "string",
      minWidth: 200,
      flex: 1,
      editable: false,
    },
    {
      field: "starterSpark",
      headerName: "Starter Spark",
      align: "left",
      headerAlign: "left",
      type: "boolean",
      width: 160,
      editable: false,
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
      field: "creatorPulse",
      headerName: "Creator Pulse",
      align: "left",
      headerAlign: "left",
      type: "boolean",
      width: 160,
      editable: false,
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
      field: "visionArchitect",
      headerName: "Vision Architect",
      align: "left",
      headerAlign: "left",
      type: "boolean",
      width: 160,
      editable: false,
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
      field: "designNexus",
      headerName: "Design Nexus",
      align: "left",
      headerAlign: "left",
      type: "boolean",
      width: 160,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, boolean>) => {
        const value = params.value;
        if (typeof value !== "undefined") {
          return value ? <NiCheckSquare className="text-success" /> : <NiCrossSquare className="text-error" />;
        } else {
          return <Box></Box>;
        }
      },
    },
  ];

  return (
    <Box className="flex w-full flex-col">
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Compare All Features
      </Typography>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
        }}
        hideFooter
        getRowSpacing={getRowSpacing}
        rowHeight={68}
        columnHeaderHeight={40}
        disableRowSelectionOnClick
        className="full-page border-none"
        slotProps={{
          panel: {
            className: "mt-1!",
          },
          main: {
            className: "overflow-visible",
          },
        }}
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
          baseSelect: (props: any) => {
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
          moreActionsIcon: () => {
            return <NiEllipsisVertical size={"medium"} />;
          },
        }}
        rowSelectionModel={rowSelectionModel}
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionExcludeModel
        onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => {
          setRowSelectionModel(rowSelectionModel);
        }}
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
