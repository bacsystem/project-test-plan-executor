"use client";

import DriveLightbox from "../../components/drive-lightbox";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useCallback, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  capitalize,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  getGridDateOperators,
  GRID_STRING_COL_DEF,
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
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
import NiFolder from "@/icons/nexture/ni-folder";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiSearch from "@/icons/nexture/ni-search";
import NiSquircle from "@/icons/nexture/ni-squircle";
import NiStar from "@/icons/nexture/ni-star";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";
type LabelType = {
  id: string;
  color: string;
  value: string;
};

const labelColumnType: GridColTypeDef<LabelType[]> = {
  ...GRID_STRING_COL_DEF,
  type: "custom",
  resizable: false,
  filterable: false,
  sortable: false,
  editable: false,
  groupable: false,
  renderCell: (params: GridRenderCellParams<any, LabelType[]>) => (
    <Box className="flex h-full flex-row items-center gap-0.5">
      {params.value?.map((labelValue: LabelType) => {
        return <NiSquircle className={labelValue.color} variant="contained" key={labelValue.id} />;
      })}
    </Box>
  ),
};

type LocationType = {
  path: string;
  label: string;
};

const locationColumnType: GridColTypeDef<LocationType> = {
  ...GRID_STRING_COL_DEF,
  type: "custom",
  resizable: false,
  filterable: false,
  sortable: false,
  editable: false,
  groupable: false,
  renderCell: (params: GridRenderCellParams<any, LocationType>) =>
    params.value ? (
      <Link
        href={params.value?.path || "#"}
        className="hover:text-primary flex flex-row items-center gap-1.5"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <NiFolder></NiFolder>
        {params.value?.label}
      </Link>
    ) : (
      <Box>/</Box>
    ),
};

const initialRows = [
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-1-light/10",
    iconColor: "text-accent-1",
    icon: "NiDocumentImage",
    name: "Hero_Image_Homepage.png",
    owner: "Henry Lawson",
    ownerAvatar: "/images/avatars/avatar-6.jpg",
    modifiedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 560000,
    location: { path: "/applications/drive/folder", label: "Images" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-2-light/10",
    iconColor: "text-accent-2",
    icon: "NiDocumentNumber",
    name: "Email_Performance_Report.xlsx",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-4.jpg",
    modifiedAt: dayjs().subtract(6, "days").toDate(),
    starred: true,
    size: 420000,
    location: { path: "/applications/drive/folder", label: "Reports" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-2-light/10",
    iconColor: "text-accent-2",
    icon: "NiDocumentNumber",
    name: "Social_Engagement_Metrics.xlsx",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-4.jpg",
    modifiedAt: dayjs().subtract(8, "days").toDate(),
    starred: true,
    size: 380000,
    location: { path: "/applications/drive/folder", label: "Reports" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-2-light/10",
    iconColor: "text-accent-2",
    icon: "NiDocumentNumber",
    name: "Ad_Spend_Tracker_Q3.xlsx",
    owner: "Daniel Fontaine",
    ownerAvatar: "/images/avatars/avatar-4.jpg",
    modifiedAt: dayjs().subtract(11, "days").toDate(),
    starred: true,
    size: 320000,
    location: { path: "/applications/drive/folder", label: "Reports" },
    labels: [{ id: crypto.randomUUID(), color: "text-primary-light/40" }],
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Brand_Voice_Guidelines.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    modifiedAt: dayjs().subtract(10, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Social_Media_Calendar.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    modifiedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 420000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Email_Funnel.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    modifiedAt: dayjs().subtract(6, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Messaging_Framework.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    modifiedAt: dayjs().subtract(2, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Brand_Logo_Vertical_White.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    modifiedAt: dayjs().subtract(10, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
  {
    id: crypto.randomUUID(),
    iconBackground: "bg-accent-3-light/10",
    iconColor: "text-accent-3",
    icon: "NiDocumentFull",
    name: "Email_Performance.pdf",
    owner: "Lucas Wright",
    ownerAvatar: "/images/avatars/avatar-2.jpg",
    modifiedAt: dayjs().subtract(12, "days").toDate(),
    starred: false,
    size: 580000,
    location: { path: "/applications/drive/folder", label: "Documents" },
  },
];

type Row = (typeof initialRows)[number];
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function RecentFiles() {
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
      width: 260,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Link
          href="#"
          className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleClickDriveOpenDialog();
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 200,
      type: "string",
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Box className="flex h-full items-center gap-2">
          {params.value ? (
            <>
              <Avatar className="bg-primary/80 tiny" alt={params.value} src={params.row.ownerAvatar}>
                {params.value?.substring(0, 1)}
              </Avatar>
              <Typography variant="body1" component="div">
                {params.value}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" component="div">
              None
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "ownerAvatar",
      headerName: "Owner Avatar",
      width: 180,
      type: "string",
      filterable: false,
      editable: false,
    },
    {
      field: "modifiedAt",
      headerName: "Modified At",
      align: "left",
      headerAlign: "left",
      width: 150,
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
      field: "size",
      headerName: "Size",
      width: 120,
      type: "number",
      align: "left",
      headerAlign: "left",
      filterable: false,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => {
        const value = params.value;
        if (value) {
          return formatBytes(value);
        } else {
          return "-";
        }
      },
    },
    {
      field: "labels",
      headerName: "Labels",
      type: "custom",
      align: "left",
      headerAlign: "left",
      ...labelColumnType,
      width: 90,
    },
    {
      field: "location",
      headerName: "Location",
      type: "string",
      align: "left",
      headerAlign: "left",
      ...locationColumnType,
      width: 180,
    },
    {
      field: "starred",
      headerName: "",
      minWidth: 60,
      flex: 1,
      type: "boolean",
      align: "right",
      headerAlign: "right",
      filterable: false,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, boolean>) => {
        const starred = params.value;
        if (starred) {
          return (
            <Button
              onClick={(event) => {
                event.stopPropagation();
                apiRef.current?.updateRows([{ id: params.row.id, starred: false }]);
              }}
              className="icon-only text-warning hover:text-grey-200 focus:text-warning bg-transparent!"
              variant="text"
              size="small"
              startIcon={<NiStar size="small" variant="outlined" />}
            />
          );
        } else {
          return (
            <Button
              onClick={(event) => {
                event.stopPropagation();
                apiRef.current?.updateRows([{ id: params.row.id, starred: true }]);
              }}
              className="icon-only text-grey-200 hover:text-warning focus:text-grey-200 bg-transparent!"
              variant="text"
              size="small"
              startIcon={<NiStar size="small" variant="outlined" />}
            />
          );
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
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

  const [driveOpenDialog, setDriveOpenDialog] = useState(false);
  const handleClickDriveOpenDialog = () => {
    setDriveOpenDialog(true);
  };
  const handleDriveCloseDialog = () => {
    setDriveOpenDialog(false);
  };

  return (
    <Box>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Recent Files
        </Typography>
        <Button
          component={Link}
          href="/applications/drive/files"
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
        columnHeaderHeight={40}
        className="full-page dense border-none"
        pagination
        slotProps={{
          panel: {
            className: "mt-1!",
          },
          main: {
            className: "overflow-visible",
          },
        }}
        slots={{
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
        hideFooter
      />
      <DriveLightbox onClose={handleDriveCloseDialog} open={driveOpenDialog} />
    </Box>
  );
}

function formatBytes(bytes: number) {
  const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "unit",
    unit: units[i],
    unitDisplay: "narrow",
    maximumFractionDigits: 1,
  });

  return formatter.format(value);
}
