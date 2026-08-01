import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useCallback, useState } from "react";

import {
  Box,
  Button,
  capitalize,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  getGridDateOperators,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  useGridApiRef,
} from "@mui/x-data-grid";

import DataGridDateTimeFilter from "@/components/data-grid/data-grid-date-time-filter";
import { DataGridPaginationFullPage } from "@/components/data-grid/data-grid-pagination";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiSearch from "@/icons/nexture/ni-search";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

const initialRows = [
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-primary-light/10",
    iconColor: "text-primary",
    icon: "NiFlask",
    name: "Complete-Blood-Count.pdf",
    testedAt: dayjs().subtract(6, "hours").toDate(),
    type: "Lab",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-primary-light/10",
    iconColor: "text-primary",
    icon: "NiFlask",
    name: "Blood-Chemistry-Panel.pdf",
    testedAt: dayjs().subtract(6, "hours").toDate(),
    type: "Lab",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-primary-light/10",
    iconColor: "text-primary",
    icon: "NiFlask",
    name: "Urine-Culture.pdf",
    testedAt: dayjs().subtract(8, "hours").toDate(),
    type: "Lab",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-primary-light/10",
    iconColor: "text-primary",
    icon: "NiFlask",
    name: "Stool-Test.pdf",
    testedAt: dayjs().subtract(2, "days").toDate(),
    type: "Lab",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-secondary-light/10",
    iconColor: "text-secondary",
    icon: "NiScreen",
    name: "X-ray.pdf",
    testedAt: dayjs().subtract(2, "days").toDate(),
    type: "Imaging",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-secondary-light/10",
    iconColor: "text-secondary",
    icon: "NiScreen",
    name: "Tomography.pdf",
    testedAt: dayjs().subtract(2, "days").toDate(),
    type: "Imaging",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-secondary-light/10",
    iconColor: "text-secondary",
    icon: "NiScreen",
    name: "MRI.pdf",
    testedAt: dayjs().subtract(6, "days").toDate(),
    type: "Imaging",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiHeart",
    name: "ECG.pdf",
    testedAt: dayjs().subtract(6, "days").toDate(),
    type: "Cardiac",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiHeart",
    name: "Echocardiogram.pdf",
    testedAt: dayjs().subtract(6, "days").toDate(),
    type: "Cardiac",
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiHeart",
    name: "Stress-Test.pdf",
    testedAt: dayjs().subtract(6, "days").toDate(),
    type: "Cardiac",
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function DashboardHealthResults() {
  const apiRef = useGridApiRef();

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set(),
  });

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 3,
      bottom: 3,
    };
  }, []);

  const [rows] = useState<Row[]>(initialRows);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90, filterable: false },
    { field: "iconBackground", headerName: "", width: 0, filterable: false, editable: false },
    { field: "iconColor", headerName: "", width: 0, filterable: false, editable: false },
    {
      field: "icon",
      headerName: "",
      width: 50,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box
          className={cn(
            "mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-sm",
            params.row.iconBackground,
          )}
        >
          <NextureIcons icon={params.value as IconName} className={params.row.iconColor} size={"large"} />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 280,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="#"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 font-semibold transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      align: "left",
      headerAlign: "left",
      minWidth: 120,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Lab", "Imaging", "Cardiac"],
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const value = params.value;
        if (value === "Lab") {
          return <Chip size="small" label="Lab" variant="outlined" className="text-primary outline-primary" />;
        } else if (value === "Imaging") {
          return <Chip size="small" label="Imaging" variant="outlined" className="text-secondary outline-secondary" />;
        } else {
          return <Chip size="small" label="Cardiac" variant="outlined" className="text-accent-1 outline-accent-1" />;
        }
      },
    },
    {
      field: "testedAt",
      headerName: "Tested At",
      align: "left",
      headerAlign: "left",
      width: 120,
      type: "dateTime",
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        const value = params.value;
        if (value) {
          const diff = dayjs(value).diff(dayjs());
          return capitalize(dayjs.duration(diff, "milliseconds").humanize(true));
        } else {
          <Box></Box>;
        }
      },
      filterOperators: getGridDateOperators(false).map((item) => ({
        ...item,
        InputComponent: DataGridDateTimeFilter,
      })),
      filterable: false,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 80,
      flex: 1,
      align: "right",
      headerAlign: "right",
      filterable: false,
      editable: false,
      getActions: () => [
        <GridActionsCellItem key={1} icon={<NiPenSquare size="medium" />} label="Edit" showInMenu />,
        <GridActionsCellItem key={2} icon={<NiDuplicate size="medium" />} label="Duplicate" showInMenu />,
        <GridActionsCellItem key={0} icon={<NiCrossSquare size="medium" />} label="Delete" showInMenu />,
      ],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Box className="flex flex-row items-center justify-between">
          <Typography variant="h6" component="h6" className="card-title">
            Recent Test Results
          </Typography>
          <Button
            component={Link}
            href="#"
            size="tiny"
            color="grey"
            variant="text"
            startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
          >
            View All
          </Button>
        </Box>
        <DataGrid
          autoHeight
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: { id: false, iconBackground: false, iconColor: false, ownerAvatar: false },
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          getRowSpacing={getRowSpacing}
          rowHeight={48}
          columnHeaderHeight={0}
          className="dense border-none"
          pagination
          slotProps={{
            panel: {
              className: "mt-1!",
            },
            main: {
              className: "overflow-visible",
            },
            columnHeaders: {
              className: "opacity-0",
            },
            footer: {
              className: "hidden",
            },
          }}
          slots={{
            columnHeaders: () => null,
            basePagination: DataGridPaginationFullPage,
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
      </CardContent>
    </Card>
  );
}
