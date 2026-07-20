import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { GridActionsCellItem, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiExpand from "@/icons/nexture/ni-expand";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiSearch from "@/icons/nexture/ni-search";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function DashboardVisualRecentTickets() {
  function GridCustomToolbar() {
    return (
      <Toolbar className="flex flex-row items-start">
        <Typography variant="h6" component="h6" className="card-title flex-1">
          Recent Tickets
        </Typography>
        <Button
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
        >
          View All
        </Button>
      </Toolbar>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box className="h-90">
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columnHeaderHeight={40}
            disableRowSelectionOnClick
            className="border-none"
            showToolbar
            slots={{
              toolbar: GridCustomToolbar,
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
              filterPanelAddIcon: NiPlus,
              filterPanelRemoveAllIcon: NiBinEmpty,
              columnSelectorIcon: NiCols,
              exportIcon: NiArrowInDown,
              openFilterButtonIcon: NiFilter,
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
              moreActionsIcon: () => {
                return <NiEllipsisVertical size={"medium"} />;
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "image",
    headerName: "Image",
    width: 60,
    editable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <Link className="flex h-full items-center" href="/pages/support/issue-detail">
        <img src={params.value as string} alt="grid image" className="h-9 w-9 rounded-sm object-cover" />
      </Link>
    ),
  },
  {
    field: "id",
    headerName: "ID",
    width: 60,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <Link
        href="/pages/support/issue-detail"
        className="text-text-primary link-primary link-underline-none hover:text-primary py-2 transition-colors"
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "title",
    headerName: "Title",
    width: 220,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <Link
        href="/pages/support/issue-detail"
        className="text-text-primary link-primary link-underline-none hover:text-primary py-2 font-semibold transition-colors"
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    align: "right",
    headerAlign: "right",
    minWidth: 100,
    flex: 1,
    type: "singleSelect",
    valueOptions: ["Active", "Done", "Pending"],
    renderCell: (params: GridRenderCellParams<any, string>) => {
      const value = params.value;
      if (value === "Active") {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="success"
            variant="pastel"
            startIcon={<NiPlusSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      } else if (value === "Done") {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="info"
            variant="pastel"
            startIcon={<NiCheckSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      } else {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="warning"
            variant="pastel"
            startIcon={<NiExclamationSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      }
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    minWidth: 80,
    flex: 1,
    align: "right",
    headerAlign: "right",
    getActions: () => [
      <GridActionsCellItem key={1} icon={<NiExpand size="medium" />} label="View" showInMenu />,
      <GridActionsCellItem key={2} icon={<NiDuplicate size="medium" />} label="Duplicate" showInMenu />,
      <GridActionsCellItem key={0} icon={<NiCrossSquare size="medium" />} label="Delete" showInMenu />,
    ],
  },
];

const rows = [
  {
    id: 472,
    image: "/images/avatars/avatar-1.jpg",
    title: "Billing page returns error",
    status: "Active",
  },
  {
    id: 473,
    image: "/images/avatars/avatar-2.jpg",
    title: "Book availability/restocking",
    status: "Active",
  },
  {
    id: 474,
    image: "/images/avatars/avatar-3.jpg",
    title: "Placing bulk book orders for our school",
    status: "Active",
  },
  {
    id: 475,
    image: "/images/avatars/avatar-4.jpg",
    title: "Need help with membership benefits",
    status: "Done",
  },
  {
    id: 476,
    image: "/images/avatars/avatar-5.jpg",
    title: "Pre-ordering special edition releases",
    status: "Done",
  },
  {
    id: 477,
    image: "/images/avatars/avatar-6.jpg",
    title: "Issue with a recent order payment",
    status: "Pending",
  },
  {
    id: 478,
    image: "/images/avatars/avatar-7.jpg",
    title: "I am receiving a 404 error",
    status: "Pending",
  },
  {
    id: 479,
    image: "/images/avatars/avatar-8.jpg",
    title: "The writer name spelling error",
    status: "Pending",
  },
];
