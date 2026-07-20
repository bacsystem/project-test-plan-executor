import dayjs from "dayjs";

import { Box, Button, FormControl, InputLabel, Select, SelectProps, Tooltip } from "@mui/material";
import {
  DataGridPremium,
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
  GridAiAssistantPanel,
  GridColDef,
  GridFilterInputValueProps,
  GridRenderCellParams,
  unstable_gridDefaultPromptResolver as promptResolver,
} from "@mui/x-data-grid-premium";

import DataGridDateFilter from "@/components/data-grid/data-grid-date-filter";
import DataGridInputFilter from "@/components/data-grid/data-grid-input-filter";
import NiAI from "@/icons/nexture/ni-ai";
import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCheck from "@/icons/nexture/ni-check";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import NiClock from "@/icons/nexture/ni-clock";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEndDownSmall from "@/icons/nexture/ni-end-down-small";
import NiEndUpSmall from "@/icons/nexture/ni-end-up-small";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiGroup from "@/icons/nexture/ni-group";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiMicrophoneInactive from "@/icons/nexture/ni-microphone-inactive";
import NiPivot from "@/icons/nexture/ni-pivot";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import NiSum from "@/icons/nexture/ni-sum";
import NiUngroup from "@/icons/nexture/ni-ungroup";
import { cn } from "@/lib/utils";

function processPrompt(prompt: string, context: string, conversationId?: string) {
  return promptResolver("https://backend.mui.com/api/datagrid/prompt", prompt, context, conversationId);
}

export default function AIAssistantBasic() {
  return (
    <Box className="h-125 w-full">
      <DataGridPremium
        label="Basic"
        columns={columnsPro}
        rows={rowsPro}
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
        }}
        aiAssistantSuggestions={[{ value: "Sort by name" }, { value: "Show female people" }]}
        aiAssistant
        onPrompt={processPrompt}
        showToolbar
        className="border-none"
        slots={{
          aiAssistantPanel: GridAiAssistantPanel,
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
          aiAssistantIcon: NiAI,
          aiAssistantPanelCloseIcon: NiCross,
          aiAssistantPanelHistoryIcon: NiClock,
          aiAssistantPanelNewConversationIcon: NiPlus,
          promptSendIcon: NiSendUpRight,
          promptSpeechRecognitionIcon: NiMicrophone,
          promptSpeechRecognitionOffIcon: NiMicrophoneInactive,
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

const rowsPro = [
  {
    name: "Emily Johnson",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3532",
    age: "21",
    dateOfBirth: dayjs("2004-04-13").toDate(),
    progress: "30",
    gender: "Female",
    status: true,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Nathan Patel",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3533",
    age: "27",
    dateOfBirth: dayjs("2000-12-18").toDate(),
    progress: "68",
    gender: "Female",
    status: true,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Sophia Garcia",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3534",
    age: "24",
    dateOfBirth: dayjs("2000-01-24").toDate(),
    progress: "75",
    gender: "Male",
    status: true,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Jack Müller",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3535",
    age: "28",
    dateOfBirth: dayjs("1997-03-16").toDate(),
    progress: "75",
    gender: "Female",
    status: false,
    autocomplete: "DAP (Delivered at Place)",
  },
  {
    name: "Chloe Nakamura",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3536",
    age: "32",
    dateOfBirth: dayjs("1994-02-04").toDate(),
    progress: "10",
    gender: "Male",
    status: false,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Ethan Smith",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3537",
    age: "20",
    dateOfBirth: dayjs("2003-01-22").toDate(),
    progress: "10",
    gender: "Female",
    status: true,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Mia Dupont",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3538",
    age: "26",
    dateOfBirth: dayjs("1999-04-07").toDate(),
    progress: "65",
    gender: "Female",
    status: true,
    autocomplete: "DAP (Delivered at Place)",
  },
  {
    name: "Oliver Silva",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3539",
    age: "42",
    dateOfBirth: dayjs("1981-08-15").toDate(),
    progress: "65",
    gender: "Female",
    status: false,
    autocomplete: "EXW (Ex Works)",
  },
  {
    name: "Isabella Kim",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3540",
    age: "36",
    dateOfBirth: dayjs("1988-04-13").toDate(),
    progress: "20",
    gender: "Female",
    status: true,
    autocomplete: "CPT (Carriage Paid To)",
  },
  {
    name: "Liam Brown",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3541",
    age: "38",
    dateOfBirth: dayjs("1986-04-04").toDate(),
    progress: "88",
    gender: "Other",
    status: false,
    autocomplete: "FAS (Free Alongside Ship)",
  },
  {
    name: "Charlotte Schmidt",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3542",
    age: "34",
    dateOfBirth: dayjs("1989-08-27").toDate(),
    progress: "74",
    gender: "Male",
    status: false,
    autocomplete: "DAP (Delivered at Place)",
  },
  {
    name: "Aiden Lopez",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3543",
    age: "27",
    dateOfBirth: dayjs("1999-08-24").toDate(),
    progress: "60",
    gender: "Other",
    status: false,
    autocomplete: "CPT (Carriage Paid To)",
  },
  {
    name: "Amelia Nguyen",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3544",
    age: "35",
    dateOfBirth: dayjs("1989-04-23").toDate(),
    progress: "60",
    gender: "Female",
    status: true,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Noah Evans",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3545",
    age: "36",
    dateOfBirth: dayjs("1988-02-21").toDate(),
    progress: "95",
    gender: "Male",
    status: true,
    autocomplete: "FCA (Free Carrier)",
  },
  {
    name: "Kim Chloe",
    id: "3ab3e3ad-fdf7-5fa2-93d9-13496e-bb3541",
    age: "38",
    dateOfBirth: dayjs("1986-04-04").toDate(),
    progress: "88",
    gender: "Male",
    status: false,
    autocomplete: "FAS (Free Alongside Ship)",
  },
];

const columnsPro: GridColDef<(typeof rowsPro)[number]>[] = [
  {
    field: "id",
    filterable: false,
  },
  {
    field: "name",
    headerName: "Name",
    align: "left",
    headerAlign: "left",
    width: 120,
    filterOperators: getGridStringOperators(false).map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridInputFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "age",
    headerName: "Age",
    align: "left",
    headerAlign: "left",
    type: "number",
    width: 120,
    filterOperators: getGridNumericOperators().map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridInputFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    align: "left",
    headerAlign: "left",
    width: 220,
    type: "date",
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      const value = params.value;
      if (value) {
        return dayjs(value).format("MM/DD/YYYY");
      } else {
        <Box></Box>;
      }
    },
    filterOperators: getGridDateOperators(false).map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridDateFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "progress",
    headerName: "Progress",
    align: "left",
    headerAlign: "left",
    type: "number",
    width: 120,
    renderCell: (params: GridRenderCellParams<any, number>) => {
      const value = params.value || 0;
      const percent = value + "%";
      let background = "bg-success";
      if (value / 100 < 2 / 3) {
        background = "bg-warning";
      }
      if (value / 100 < 1 / 3) {
        background = "bg-error";
      }
      return (
        <Tooltip
          title={percent}
          arrow
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -24],
                  },
                },
              ],
            },
          }}
        >
          <Box className="flex h-full items-center justify-start">
            <Box className="bg-grey-50 h-0.5 w-full rounded-sm">
              <Box className={cn("h-0.5 w-1/3 rounded-xs", background)} style={{ width: percent }}></Box>
            </Box>
          </Box>
        </Tooltip>
      );
    },
    filterOperators: getGridNumericOperators().map((item) => ({
      ...item,
      InputComponent: (props: GridFilterInputValueProps) => <DataGridInputFilter isHeaderFilter={true} {...props} />,
    })),
  },
  {
    field: "gender",
    headerName: "Gender",
    align: "left",
    headerAlign: "left",
    type: "singleSelect",
    width: 180,
    valueOptions: ["Female", "Male", "Other"],
  },
  {
    field: "status",
    headerName: "Status",
    align: "left",
    headerAlign: "left",
    type: "boolean",
    width: 120,
  },
  {
    field: "autocomplete",
    headerName: "Auto Complete",
    align: "left",
    headerAlign: "left",
    width: 200,
    type: "singleSelect",
    valueOptions: [
      "EXW (Ex Works)",
      "FAS (Free Alongside Ship)",
      "FCA (Free Carrier)",
      "CPT (Carriage Paid To)",
      "DAP (Delivered at Place)",
      "DPU (Delivered at Place Unloaded)",
      "DDP (Delivered Duty Paid)",
    ],
  },
];
