import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

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
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiClock from "@/icons/nexture/ni-clock";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDashboard from "@/icons/nexture/ni-dashboard";
import NiDevops from "@/icons/nexture/ni-devops";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiExpand from "@/icons/nexture/ni-expand";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPlus from "@/icons/nexture/ni-plus";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSearch from "@/icons/nexture/ni-search";
import NiServer from "@/icons/nexture/ni-server";
import NiShield from "@/icons/nexture/ni-shield";
import NiShuffle from "@/icons/nexture/ni-shuffle";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function SupportOverviewRecentIssues() {
  const router = useRouter();

  function GridCustomToolbar() {
    return (
      <Toolbar className="flex flex-row items-start">
        <Typography variant="h6" component="h6" className="card-title flex-1">
          Recent Issues
        </Typography>
        <Button
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
          onClick={() => router.push("/pages/support/issues")}
        >
          View All
        </Button>
      </Toolbar>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box className="h-152.5">
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
            initialState={{
              columns: { columnVisibilityModel: { id: false } },
            }}
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
  { field: "id", headerName: "ID", editable: false, filterable: false },
  {
    field: "issue",
    headerName: "Issue",
    width: 380,
    editable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <Link href="/pages/support/issue-detail" className="text-text-primary hover:text-primary transition-colors">
        {params.value}
      </Link>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    align: "left",
    headerAlign: "left",
    width: 140,
    type: "singleSelect",
    valueOptions: ["Performance", "Security", "Interface", "Functional", "Compatibility", "Database"],
    editable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => {
      const value = params.value;
      if (value === "Performance") {
        return (
          <Box className="flex h-full flex-row items-center gap-1.5">
            <NiDashboard className="text-primary" />
            <Typography>{value}</Typography>
          </Box>
        );
      } else if (value === "Security") {
        return (
          <Box className="flex h-full flex-row items-center gap-1.5">
            <NiShield className="text-secondary" />
            <Typography>{value}</Typography>
          </Box>
        );
      } else if (value === "Interface") {
        return (
          <Box className="flex h-full flex-row items-center gap-1.5">
            <NiScreen className="text-accent-1" />
            <Typography>{value}</Typography>
          </Box>
        );
      } else if (value === "Functional") {
        return (
          <Box className="flex h-full flex-row items-center gap-1.5">
            <NiShuffle className="text-accent-2" />
            <Typography>{value}</Typography>
          </Box>
        );
      } else if (value === "Compatibility") {
        return (
          <Box className="flex h-full flex-row items-center gap-1.5">
            <NiDevops className="text-accent-3" />
            <Typography>{value}</Typography>
          </Box>
        );
      } else {
        return (
          <Box className="flex h-full flex-row items-center gap-1.5">
            <NiServer className="text-accent-4" />
            <Typography>{value}</Typography>
          </Box>
        );
      }
    },
  },
  {
    field: "status",
    headerName: "Status",
    align: "left",
    headerAlign: "left",
    width: 120,
    type: "singleSelect",
    valueOptions: ["Open", "In Progress", "Closed"],
    editable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => {
      const value = params.value;
      if (value === "Open") {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="error"
            variant="pastel"
            startIcon={<NiExclamationSquare size={"tiny"} />}
          >
            {value}
          </Button>
        );
      } else if (value === "In Progress") {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="warning"
            variant="pastel"
            startIcon={<NiClock size={"tiny"} />}
          >
            {value}
          </Button>
        );
      } else {
        return (
          <Button
            className="pointer-events-none self-center"
            size="tiny"
            color="success"
            variant="pastel"
            startIcon={<NiCheckSquare size={"tiny"} />}
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
    id: crypto.randomUUID(),
    issue: "Slow page load times due to unoptimized assets",
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Security vulnerabilities from insufficient protection",
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Unresponsive design across devices",
    status: "Open",
    category: "Performance",
  },
  {
    id: crypto.randomUUID(),
    issue: "Broken authentication mechanisms",
    status: "Open",
    category: "Security",
  },
  {
    id: crypto.randomUUID(),
    issue: "API integration errors leading to feature failures",
    status: "Open",
    category: "Security",
  },
  {
    id: crypto.randomUUID(),
    issue: "Inconsistent data display and user confusion",
    status: "Open",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Browser compatibility issues",
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Ineffective search functionality",
    status: "In Progress",
    category: "Functional",
  },
  {
    id: crypto.randomUUID(),
    issue: "Session management problems and security risks",
    status: "In Progress",
    category: "Compatibility ",
  },
  {
    id: crypto.randomUUID(),
    issue: "High server downtime during peak usage",
    status: "In Progress",
    category: "Compatibility ",
  },
];
