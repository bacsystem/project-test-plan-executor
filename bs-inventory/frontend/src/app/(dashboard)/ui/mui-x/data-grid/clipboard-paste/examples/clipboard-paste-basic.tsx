import * as React from "react";

import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DataGridPremium,
  DataGridPremiumProps,
  GridAiAssistantPanel,
  GridColDef,
  GridRenderEditCellParams,
} from "@mui/x-data-grid-premium";

import DataGridInput from "@/components/data-grid/data-grid-input";
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
import NiPivot from "@/icons/nexture/ni-pivot";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import NiSum from "@/icons/nexture/ni-sum";
import NiUngroup from "@/icons/nexture/ni-ungroup";

export default function ClipboardPasteBasic() {
  const [loading, setLoading] = React.useState(false);

  const processRowUpdate = React.useCallback<NonNullable<DataGridPremiumProps["processRowUpdate"]>>(async (newRow) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    return newRow;
  }, []);

  const confirm = useConfirm();
  const confirmPaste = React.useCallback<() => Promise<void>>(() => {
    return new Promise((resolve, reject) => {
      confirm.open((confirmed) => {
        if (confirmed) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }, [confirm]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <DataGridPremium
        className="border-none"
        columns={columns}
        rows={rows}
        loading={loading}
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
        }}
        cellSelection
        processRowUpdate={processRowUpdate}
        onBeforeClipboardPasteStart={confirmPaste}
        onClipboardPasteStart={() => setLoading(true)}
        onClipboardPasteEnd={() => setLoading(false)}
        ignoreValueFormatterDuringExport
        disableRowSelectionOnClick
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

      <Dialog
        open={confirm.isOpen}
        onClose={confirm.cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            className: "md:min-w-lg",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to paste?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">This will overwrite the selected cells.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm.cancel}>Cancel</Button>
          <Button onClick={confirm.confirm} autoFocus variant="pastel">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useConfirm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const callbackRef = React.useRef<((confirmed: boolean) => void) | null>(null);

  const open = React.useCallback((callback: (confirmed: boolean) => void) => {
    setIsOpen(true);
    callbackRef.current = callback;
  }, []);

  const cancel = React.useCallback(() => {
    setIsOpen(false);
    callbackRef.current?.(false);
    callbackRef.current = null;
  }, []);

  const confirm = React.useCallback(() => {
    setIsOpen(false);
    callbackRef.current?.(true);
    callbackRef.current = null;
  }, []);

  return {
    open,
    isOpen,
    cancel,
    confirm,
  };
};

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    field: "age",
    headerName: "Age",
    width: 160,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => <DataGridInput {...params} />,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Johnson", firstName: "Emily", age: 14 },
  { id: 2, lastName: "Patel", firstName: "Nathan", age: 31 },
  { id: 3, lastName: "Garcia", firstName: "Sophia", age: 31 },
  { id: 4, lastName: "Müller", firstName: "Jack", age: 11 },
  { id: 5, lastName: "Nakamura", firstName: "Chloe", age: 28 },
  { id: 6, lastName: "Smith", firstName: "Ethan", age: 150 },
  { id: 7, lastName: "Dupont", firstName: "Mia", age: 44 },
  { id: 8, lastName: "Silva", firstName: "Oliver", age: 31 },
  { id: 9, lastName: "Kim", firstName: "Isabella", age: 64 },
  { id: 10, lastName: "Brown", firstName: "Liam", age: 45 },
  { id: 11, lastName: "Schmidt", firstName: "Charlotte", age: 23 },
  { id: 12, lastName: "Lopez", firstName: "Aiden", age: 27 },
  { id: 13, lastName: "Nguyen", firstName: "Amelia", age: 43 },
  { id: 14, lastName: "Evans", firstName: "Noah", age: 25 },
  { id: 15, lastName: "Jack", firstName: "Müller", age: 32 },
];
