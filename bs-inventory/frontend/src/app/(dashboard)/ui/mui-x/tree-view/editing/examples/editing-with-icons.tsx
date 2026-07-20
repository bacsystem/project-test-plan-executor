import { forwardRef, Ref, SyntheticEvent } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {
  TreeItem,
  TreeItemLabel,
  TreeItemLabelInput,
  TreeItemProps,
  UseTreeItemLabelInputSlotOwnProps,
  UseTreeItemLabelSlotOwnProps,
  useTreeItemUtils,
} from "@mui/x-tree-view";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

import NiCheck from "@/icons/nexture/ni-check";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiPen from "@/icons/nexture/ni-pen";

type ExtendedTreeItemProps = {
  editable?: boolean;
  id: string;
  label: string;
  children?: ExtendedTreeItemProps[];
};

const MUI_X_PRODUCTS: ExtendedTreeItemProps[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      { id: "grid-premium", label: "@mui/x-data-grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
];

interface CustomLabelProps extends UseTreeItemLabelSlotOwnProps {
  editable: boolean;
  editing: boolean;
  toggleItemEditing: () => void;
}

function CustomLabel({ editable, children, toggleItemEditing, ...other }: CustomLabelProps) {
  return (
    <TreeItemLabel
      {...other}
      editable={editable}
      className="font-body flex items-center justify-between gap-2 text-base"
    >
      {children}
      {editable && (
        <IconButton size="tiny" onClick={toggleItemEditing} className="text-text-secondary">
          <NiPen size="small" />
        </IconButton>
      )}
    </TreeItemLabel>
  );
}

interface CustomLabelInputProps extends UseTreeItemLabelInputSlotOwnProps {
  handleCancelItemLabelEditing: (event: SyntheticEvent) => void;
  handleSaveItemLabel: (event: SyntheticEvent, label: string) => void;
  value: string;
}

function CustomLabelInput(props: Omit<CustomLabelInputProps, "ref">) {
  const { handleCancelItemLabelEditing, handleSaveItemLabel, value, ...other } = props;

  return (
    <>
      <TreeItemLabelInput {...other} value={value} className="font-body rounded-[0.5rem] px-1 text-base" />
      <IconButton
        className="text-success"
        size="tiny"
        onClick={(event: React.MouseEvent) => {
          handleSaveItemLabel(event, value);
        }}
      >
        <NiCheck size="small" />
      </IconButton>
      <IconButton className="text-error" size="tiny" onClick={handleCancelItemLabelEditing}>
        <NiCross size="small" />
      </IconButton>
    </>
  );
}

const CustomTreeItem2 = forwardRef(function CustomTreeItem2(props: TreeItemProps, ref: Ref<HTMLLIElement>) {
  const { interactions, status } = useTreeItemUtils({
    itemId: props.itemId,
    children: props.children,
  });

  const handleContentDoubleClick: UseTreeItemLabelSlotOwnProps["onDoubleClick"] = (event) => {
    event.defaultMuiPrevented = true;
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement> & { defaultMuiPrevented?: boolean }) => {
    event.defaultMuiPrevented = true;
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement> & { defaultMuiPrevented?: boolean }) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <TreeItem
      {...props}
      ref={ref}
      slots={{ label: CustomLabel, labelInput: CustomLabelInput }}
      slotProps={{
        content: {
          className: "py-1",
        },
        label: {
          onDoubleClick: handleContentDoubleClick,
          editable: status.editable,
          editing: status.editing,
          toggleItemEditing: interactions.toggleItemEditing,
        } as CustomLabelProps,
        labelInput: {
          onBlur: handleInputBlur,
          onKeyDown: handleInputKeyDown,
          handleCancelItemLabelEditing: interactions.handleCancelItemLabelEditing,
          handleSaveItemLabel: interactions.handleSaveItemLabel,
        } as any,
      }}
    />
  );
});

export default function EditingWithIcons() {
  return (
    <Box className="min-w-72">
      <RichTreeView
        items={MUI_X_PRODUCTS}
        isItemEditable
        defaultExpandedItems={["grid", "pickers"]}
        expansionTrigger="iconContainer"
        slots={{
          item: CustomTreeItem2,
          collapseIcon: () => {
            return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
          },
          expandIcon: () => {
            return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
          },
        }}
      />
    </Box>
  );
}
