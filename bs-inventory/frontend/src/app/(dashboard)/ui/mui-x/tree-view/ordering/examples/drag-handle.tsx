import { forwardRef, Ref } from "react";

import Box from "@mui/material/Box";
import {
  TreeItemCheckbox,
  TreeItemContent,
  TreeItemDragAndDropOverlay,
  TreeItemGroupTransition,
  TreeItemIcon,
  TreeItemIconContainer,
  TreeItemLabel,
  TreeItemProvider,
  TreeItemRoot,
  useTreeItem,
  UseTreeItemParameters,
} from "@mui/x-tree-view";
import { TreeViewDefaultItemModelProperties } from "@mui/x-tree-view";
import { RichTreeViewPro } from "@mui/x-tree-view-pro/RichTreeViewPro";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiDragVertical from "@/icons/nexture/ni-drag-vertical";

const MUI_X_PRODUCTS: TreeViewDefaultItemModelProperties[] = [
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

interface CustomTreeItemProps
  extends Omit<UseTreeItemParameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = forwardRef(function CustomTreeItem(props: CustomTreeItemProps, ref: Ref<HTMLLIElement>) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const { draggable, onDragStart, ...otherRootProps } = getRootProps(other);

  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
    if (!onDragStart) {
      return;
    }

    onDragStart(event as React.DragEvent<HTMLLIElement>);
    event.dataTransfer.setDragImage((event.target as HTMLElement).parentElement!, 0, 0);
  };

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...otherRootProps} className="MuiTreeItem-root">
        <TreeItemContent {...getContentProps()} className="MuiTreeItem-content">
          <TreeItemIconContainer {...getIconContainerProps()} className="MuiTreeItem-iconContainer">
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <TreeItemIconContainer
            className="MuiTreeItem-iconContainer"
            draggable={draggable}
            onDragStart={handleDragStart}
          >
            <NiDragVertical size="small" oneTone />
          </TreeItemIconContainer>
          <TreeItemCheckbox {...getCheckboxProps()} />
          <TreeItemLabel {...getLabelProps()} className="MuiTreeItem-label" />
          <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </TreeItemContent>
        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

export default function DragHandle() {
  return (
    <Box className="min-w-72">
      <RichTreeViewPro
        items={MUI_X_PRODUCTS}
        defaultExpandedItems={["grid", "pickers"]}
        itemsReordering
        slots={{
          item: CustomTreeItem,
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
