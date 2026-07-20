import { forwardRef, HTMLAttributes, Ref } from "react";

import Avatar from "@mui/material/Avatar";
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
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

const ITEMS: TreeViewDefaultItemModelProperties[] = [
  {
    id: "1",
    label: "Amelia Hart",
    children: [{ id: "2", label: "Jane Fisher" }],
  },
  {
    id: "3",
    label: "Bailey Monroe",
    children: [
      { id: "4", label: "Freddie Reed" },
      {
        id: "5",
        label: "Georgia Johnson",
        children: [{ id: "6", label: "Samantha Malone" }],
      },
    ],
  },
];

interface CustomTreeItemProps
  extends Omit<UseTreeItemParameters, "rootRef">,
    Omit<HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = forwardRef(function CustomTreeItem(props: CustomTreeItemProps, ref: Ref<HTMLLIElement>) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItemProvider id={id} itemId={itemId}>
      <TreeItemRoot {...getRootProps(other)}>
        <TreeItemContent {...getContentProps()} className="rounded-2xs MuiTreeItem2-content">
          <TreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <TreeItemCheckbox {...getCheckboxProps()} />
          <Box className="flex flex-1 items-center gap-1">
            <Avatar className="bg-primary rounded-2xs me-1 h-6 w-6 text-xs">{(label as string)[0]}</Avatar>
            <TreeItemLabel {...getLabelProps()} className="font-body text-base" />
          </Box>
          <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </TreeItemContent>
        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

export default function CustomTreeItemRich() {
  return (
    <Box className="min-w-72">
      <RichTreeView
        slots={{
          collapseIcon: () => {
            return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
          },
          expandIcon: () => {
            return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
          },
          item: CustomTreeItem,
        }}
        defaultExpandedItems={["3"]}
        items={ITEMS}
      />
    </Box>
  );
}
