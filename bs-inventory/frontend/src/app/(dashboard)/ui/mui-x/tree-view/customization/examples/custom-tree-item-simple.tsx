import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {
  TreeItemCheckbox,
  TreeItemContent,
  TreeItemGroupTransition,
  TreeItemIcon,
  TreeItemIconContainer,
  TreeItemLabel,
  TreeItemProvider,
  TreeItemRoot,
  useTreeItem,
  UseTreeItemParameters,
} from "@mui/x-tree-view";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

interface CustomTreeItemProps
  extends Omit<UseTreeItemParameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
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
        </TreeItemContent>
        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

export default function CustomTreeItemSimple() {
  return (
    <Box className="min-w-72">
      <SimpleTreeView
        defaultExpandedItems={["3"]}
        slots={{
          collapseIcon: () => {
            return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
          },
          expandIcon: () => {
            return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
          },
        }}
      >
        <CustomTreeItem itemId="1" label="Amelia Hart">
          <CustomTreeItem itemId="2" label="Jane Fisher" />
        </CustomTreeItem>
        <CustomTreeItem itemId="3" label="Bailey Monroe">
          <CustomTreeItem itemId="4" label="Freddie Reed" />
          <CustomTreeItem itemId="5" label="Georgia Johnson">
            <CustomTreeItem itemId="6" label="Samantha Malone" />
          </CustomTreeItem>
        </CustomTreeItem>
      </SimpleTreeView>
    </Box>
  );
}
